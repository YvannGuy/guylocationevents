import Stripe from "stripe";
import { Resend } from "resend";
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const packs = [
  { id: "pack1", name: "Pack Standard", price: 8000, stripePriceId: "price_1QwVRfGKCVzDExz8KO4ujxPa" },
  { id: "pack2", name: "Pack Essentiel", price: 10500, stripePriceId: "price_1QwVT4GKCVzDExz87s7E1Mei" },
  { id: "pack3", name: "Pack Confort", price: 12500, stripePriceId: "price_1QwVU1GKCVzDExz8tfhjhIeX" },
  { id: "pack4", name: "Pack Premium", price: 13500, stripePriceId: "price_1QwVUxGKCVzDExz8WsQ3j9wu" },
  { id: "pack5", name: "Pack Prestige", price: 17500, stripePriceId: "price_1QwVWOGKCVzDExz8I4Gd3P5F" },
  { id: "pack6", name: "Pack Grand Événement", price: 19500, stripePriceId: "price_1QwVXKGKCVzDExz8SNRzMiE9" },
  { id: "pack7", name: "Pack Vidéo", price: 5000, stripePriceId: "price_1QwVYCGKCVzDExz8wlZ4GIlE" },
];

const options = [
  { id: "technician-installation", name: "Technicien installation", price: 8000, stripePriceId: "price_1QwVatGKCVzDExz8XH5xNbvL" },
  { id: "technician-management", name: "Technicien gestion", price: 5000, hourly: true, stripePriceId: "price_1QwVcVGKCVzDExz8VxxLgCt8" },
  { id: "delivery-paris", name: "Livraison Paris intra-muros", price: 4000, stripePriceId: "price_1QwVdCGKCVzDExz8Va97K0IV" },
  { id: "delivery-idf", name: "Livraison Île-de-France", price: 8000, stripePriceId: "price_1QwVdeGKCVzDExz85oQIiWSw" },
  { id: "micro-wired", name: "Micro filaire", price: 1000, quantity: true, stripePriceId: "price_1QwVe2GKCVzDExz876SePe0h" },
  { id: "micro-wireless", name: "Micro sans fil", price: 2000, quantity: true, stripePriceId: "price_1QwVeHGKCVzDExz8GN7Hwn9s" },
];

export async function POST(req) {
  try {
    const {
      deposit,           // caution en centimes
      fullName,
      email,
      eventAddress,
      startDate,
      startTime,
      endDate,
      endTime,
      participants,
      technicianHours,   // nombre d'heures pour le technicien
      selectedPacks,
      selectedOptions,
      packQuantities,
      optionQuantities,
    } = await req.json();

    // 1. Calcul du montant principal à payer (issu des packs et options)
    const mainPaymentAmount =
      selectedPacks.reduce((acc, packId) => {
        const pack = packs.find((p) => p.id === packId);
        return acc + (pack?.price || 0) * (packQuantities[packId] || 1);
      }, 0) +
      selectedOptions.reduce((acc, optionId) => {
        const option = options.find((o) => o.id === optionId);
        let qty = 1;
        if (optionId === "technician-management") {
          qty = technicianHours;
        } else if (option?.quantity) {
          qty = optionQuantities[optionId] || 1;
        }
        return acc + (option?.price || 0) * qty;
      }, 0);

    // Total pour la session Checkout (mainPayment + caution)
    const totalForCheckout = mainPaymentAmount + deposit;

    // 2. Création du client Stripe
    const customer = await stripe.customers.create({
      email,
      name: fullName,
    });

    // 3. Création de la session Checkout (en mode capture manuelle)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customer.id,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: 'Total de la commande' },
            unit_amount: totalForCheckout,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_intent_data: {
        capture_method: 'manual', // Permet la capture partielle via le webhook
        metadata: {
          mainPaymentAmount: mainPaymentAmount.toString(), // Montant à capturer immédiatement
          depositAmount: deposit.toString(),                 // Montant de caution à autoriser
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    // 4. Insertion de la réservation dans Supabase (seulement les champs définis dans votre schéma)
    const reservationPayload = {
      fullName,
      email,
      eventAddress,
      startDate,
      startTime,
      endDate,
      endTime,
      participants,
      technicianHours,
      totalAmount: mainPaymentAmount / 100, // Montant principal en euros
      paymentLink: session.url,
    };

    const { data: reservationData, error: reservationError } = await supabase
      .from("final_reservations")
      .insert(reservationPayload)
      .select();

    if (reservationError) {
      console.error("Erreur Supabase:", reservationError.message);
      return NextResponse.json({ success: false, message: "Erreur base de données" }, { status: 500 });
    }

    const reservationId = reservationData[0].id;

    // 5. Insertion des packs sélectionnés dans "reservation_packs"
    if (selectedPacks.length > 0) {
      const packInsertions = selectedPacks.map(packId => ({
        reservation_id: reservationId,
        pack_id: packId,
        pack_name: packs.find(p => p.id === packId)?.name,
        pack_quantity: packQuantities[packId] || 1,
        pack_price: packs.find(p => p.id === packId)?.price,
      }));
      const { error: packsError } = await supabase.from("reservation_packs").insert(packInsertions);
      if (packsError) throw new Error(packsError.message);
    }

    // 6. Insertion des options sélectionnées dans "reservation_options"
    if (selectedOptions.length > 0) {
      const optionInsertions = selectedOptions.map(optionId => ({
        reservation_id: reservationId,
        option_id: optionId,
        option_name: options.find(o => o.id === optionId)?.name,
        option_quantity: optionId === "technician-management"
          ? technicianHours
          : options.find(o => o.id === optionId)?.quantity
            ? optionQuantities[optionId] || 1
            : 1,
        option_price: options.find(o => o.id === optionId)?.price,
      }));
      const { error: optionsError } = await supabase.from("reservation_options").insert(optionInsertions);
      if (optionsError) throw new Error(optionsError.message);
    }

    // 7. Envoi de l'e-mail de confirmation
    const emailContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #1c1c1e; padding: 2rem; color: #ffffff;">
        <!-- Logo -->
        <div style="text-align: center; margin-bottom: 1rem;">
          <img src="https://guylocationevents.com/images/logolocguy.png" alt="Logo Guy Location Events" style="width: 250px; height: auto; display: block; margin: 0 auto;" />
        </div>
        <!-- Contenu principal -->
        <div style="max-width: 600px; margin: 0 auto; background-color: #2c2c2e; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
          <div style="background-color: #e27431; padding: 2rem; text-align: center; color: #ffffff;">
            <h1 style="font-size: 24px; font-weight: 600; margin: 0;">Confirmation de réservation</h1>
          </div>
          <div style="padding: 2rem;">
            <p style="font-size: 16px; margin-bottom: 1.5rem;">
              Bonjour <strong>${fullName}</strong>,<br>
              Votre réservation a été enregistrée avec succès. Voici les détails :
            </p>
            <!-- Vous pouvez ajouter ici d'autres détails récapitulatifs -->
            <p>Pour finaliser votre réservation, veuillez procéder au paiement en cliquant sur le lien suivant :</p>
            <p><a href="${session.url}" style="color: #e27431; text-decoration: none;">Finaliser le paiement principal</a></p>
          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "Guy Location Events <contact@guylocationevents.com>",
      to: email,
      subject: "Confirmation de réservation - Guy Location Events",
      html: emailContent,
    });

    return NextResponse.json({
      success: true,
      mainPaymentUrl: session.url,
    });
  } catch (error) {
    console.error("Erreur:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
