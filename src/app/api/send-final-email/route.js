// src/app/api/send-final-reservation/route.js
import Stripe from "stripe";
import { Resend } from "resend";
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

// Définir les packs et options
const packs = [
  { id: "pack1", name: "Pack Standard", price: 8000 },
  { id: "pack2", name: "Pack Essentiel", price: 10500 },
  { id: "pack3", name: "Pack Confort", price: 12500 },
  { id: "pack4", name: "Pack Premium", price: 13500 },
  { id: "pack5", name: "Pack Prestige", price: 17500 },
  { id: "pack6", name: "Pack Grand Événement", price: 19500 },
  { id: "pack7", name: "Pack Vidéo", price: 5000 },
  { id: "pack8", name: "Photobooth", price: 49900 },
];

const options = [
  { id: "technician-installation", name: "Technicien installation", price: 8000 },
  { id: "technician-management", name: "Technicien gestion", price: 5000, hourly: true },
  { id: "delivery-paris", name: "Livraison Paris intra-muros", price: 4000 },
  { id: "delivery-idf", name: "Livraison Île-de-France", price: 8000 },
  { id: "micro-wired", name: "Micro filaire", price: 1000, quantity: true },
  { id: "micro-wireless", name: "Micro sans fil", price: 2000, quantity: true },
];

export async function POST(req) {
  try {
    const {
      fullName,
      email,
      eventAddress,
      startDate,
      startTime,
      endDate,
      endTime,
      participants,
      selectedPacks,
      selectedOptions,
      packQuantities,
      optionQuantities,
      technicianHours,
    } = await req.json();

    const paymentLinks = {
      pack1: "https://buy.stripe.com/aEU7vB31df0JbbG002",
      pack2: "https://buy.stripe.com/fZe0399pBbOx0x25kl",
      pack3: "https://book.stripe.com/6oE8zFbxJdWF0x28ww",
      pack4: "https://buy.stripe.com/pack4", // Lien pour le pack4
    };

    // Calcul du montant total
    let totalAmount = selectedPacks.reduce((acc, packId) => {
      const pack = packs.find((p) => p.id === packId);
      const quantity = packQuantities[packId] || 1;
      return acc + (pack?.price || 0) * quantity;
    }, 0);

    totalAmount += selectedOptions.reduce((acc, optionId) => {
      const option = options.find((o) => o.id === optionId);
      let optionTotal = 0;

      if (optionId === "technician-management") {
        optionTotal = (option?.price || 0) * technicianHours;
      } else if (option?.quantity) {
        const qty = optionQuantities[optionId] || 1;
        optionTotal = (option?.price || 0) * qty;
      } else {
        optionTotal = option?.price || 0;
      }

      return acc + optionTotal;
    }, 0);

    const finalPaymentLink = paymentLinks[selectedPacks[0]] || paymentLinks.pack1;

    // Insertion dans la table 'final_reservations'
    const { data: reservationData, error: reservationError } = await supabase
      .from("final_reservations")
      .insert({
        fullName,
        email,
        eventAddress,
        startDate,
        startTime,
        endDate,
        endTime,
        participants,
        totalAmount: totalAmount / 100,
        paymentLink: finalPaymentLink,
      })
      .select();

    if (reservationError) {
      console.error("❌ Erreur Supabase (final_reservations):", reservationError.message);
      return NextResponse.json({ success: false, message: "Erreur lors de l'insertion dans Supabase" }, { status: 500 });
    }

    const reservationId = reservationData[0].id;

    // Insertion dans la table 'reservation_packs'
    if (selectedPacks.length > 0) {
      const packInsertions = selectedPacks.map((packId) => ({
        reservation_id: reservationId,
        pack_id: packId,
        pack_name: packs.find((p) => p.id === packId)?.name || packId,
        pack_quantity: packQuantities[packId] || 1,
        pack_price: packs.find((p) => p.id === packId)?.price || 0,
      }));

      const { error: packsError } = await supabase.from("reservation_packs").insert(packInsertions);

      if (packsError) {
        console.error("❌ Erreur Supabase (reservation_packs):", packsError.message);
        return NextResponse.json({ success: false, message: "Erreur lors de l'insertion des packs" }, { status: 500 });
      }
    }

    // Insertion dans la table 'reservation_options'
    if (selectedOptions.length > 0) {
      const optionInsertions = selectedOptions.map((optionId) => ({
        reservation_id: reservationId,
        option_id: optionId,
        option_name: options.find((o) => o.id === optionId)?.name || optionId,
        option_quantity: optionQuantities[optionId] || 1,
        option_price: options.find((o) => o.id === optionId)?.price || 0,
      }));

      const { error: optionsError } = await supabase.from("reservation_options").insert(optionInsertions);

      if (optionsError) {
        console.error("❌ Erreur Supabase (reservation_options):", optionsError.message);
        return NextResponse.json({ success: false, message: "Erreur lors de l'insertion des options" }, { status: 500 });
      }
    }

    // Envoi de l'email avec Resend
    const emailContent = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif; background-color: #1c1c1e; padding: 2rem; color: #ffffff;">
  <!-- Logo au-dessus du conteneur -->
  <div style="text-align: center; margin-bottom: 1rem;">
    <img 
      src="https://guylocationevents.com/images/logolocguy.png" 
      alt="Logo Guy Location Events" 
      style="width: 250px; height: auto; display: block; margin: 0 auto;" 
    />
  </div>

  <!-- Conteneur principal -->
  <div style="max-width: 600px; margin: 0 auto; background-color: #2c2c2e; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);">
    <!-- En-tête -->
    <div style="background-color: #e27431; padding: 2rem; text-align: center; color: #ffffff;">
      <h1 style="font-size: 24px; font-weight: 600; margin: 0;">Confirmation de réservation</h1>
    </div>

    <!-- Corps du message -->
    <div style="padding: 2rem;">
      <p style="font-size: 16px; color: #ffffff; margin: 0 0 1.5rem;">
        Bonjour <strong>${fullName}</strong>,<br>
        Votre réservation a été enregistrée avec succès. Voici les détails :
      </p>

      <!-- Section Détails de l'événement -->
      <div style="background-color: #3a3a3c; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <h2 style="font-size: 18px; font-weight: 600; color: #ffffff; margin: 0 0 1rem;">Détails de l'événement</h2>
        <div style="display: grid; gap: 0.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; color: #a0a0a0;">Adresse</span>
            <span style="font-size: 14px; color: #ffffff; font-weight: 500;">${eventAddress}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; color: #a0a0a0;">Date de début</span>
            <span style="font-size: 14px; color: #ffffff; font-weight: 500;">${new Date(startDate).toLocaleDateString('fr-FR')} à ${startTime}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; color: #a0a0a0;">Date de fin</span>
            <span style="font-size: 14px; color: #ffffff; font-weight: 500;">${new Date(endDate).toLocaleDateString('fr-FR')} à ${endTime}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; color: #a0a0a0;">Participants</span>
            <span style="font-size: 14px; color: #ffffff; font-weight: 500;">${participants}</span>
          </div>
        </div>
      </div>

      <!-- Section Packs et options -->
      <div style="background-color: #3a3a3c; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <h2 style="font-size: 18px; font-weight: 600; color: #ffffff; margin: 0 0 1rem;">Packs et options</h2>
        <div style="display: grid; gap: 0.75rem;">
          ${selectedPacks.map((packId) => {
            const pack = packs.find((p) => p.id === packId);
            const quantity = packQuantities[packId] || 1;
            const totalPrice = (pack?.price || 0) * quantity;
            return `
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 14px; color: #a0a0a0;">${pack?.name || packId} (x${quantity})</span>
                <span style="font-size: 14px; color: #ffffff; font-weight: 500;">${(totalPrice / 100).toFixed(2)} €</span>
              </div>
            `;
          }).join('')}
          ${selectedOptions.map((optionId) => {
            const option = options.find((o) => o.id === optionId);
            let totalPrice = 0;
            let label = option?.name || optionId;

            if (optionId === "technician-management") {
              totalPrice = (option?.price || 0) * technicianHours;
              label += ` (${technicianHours} heures)`;
            } else if (option?.quantity) {
              const qty = optionQuantities[optionId] || 1;
              totalPrice = (option?.price || 0) * qty;
              label += ` (x${qty})`;
            } else {
              totalPrice = option?.price || 0;
            }

            return `
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 14px; color: #a0a0a0;">${label}</span>
                <span style="font-size: 14px; color: #ffffff; font-weight: 500;">${(totalPrice / 100).toFixed(2)} €</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Section Paiement -->
      <div style="background-color: #3a3a3c; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <h2 style="font-size: 18px; font-weight: 600; color: #ffffff; margin: 0 0 1rem;">Paiement</h2>
        <div style="display: grid; gap: 0.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; color: #a0a0a0;">Total</span>
            <span style="font-size: 14px; color: #ffffff; font-weight: 500;">${(totalAmount / 100).toFixed(2)} €</span>
          </div>
        </div>
        <a href="${finalPaymentLink}" style="display: inline-block; background-color: #e27431; color: #ffffff; font-size: 14px; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; margin-top: 1rem; text-align: center;">
          Finaliser le paiement
        </a>
      </div>

      <!-- Message de fin -->
      <p style="font-size: 14px; color: #ffffff; margin: 1.5rem 0 0;">
        Merci de faire confiance à <strong>Guy Location Events</strong> pour votre événement. Pour toute question, contactez-nous à <a href="mailto:contact@guylocationevents.com" style="color: #e27431; text-decoration: none;">contact@guylocationevents.com</a>.
      </p>
    </div>
  </div>
</div>
`;

    await resend.emails.send({
      from: "Guy Location Events <contact@guylocationevents.com>",
      to: email,
      subject: "Confirmation de votre réservation - Guy Location Events",
      html: emailContent,
    });

    return NextResponse.json({ success: true, message: "Réservation finale enregistrée et e-mail envoyé !" });
  } catch (error) {
    console.error("❌ Erreur :", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}