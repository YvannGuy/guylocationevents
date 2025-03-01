import Stripe from "stripe";
import { Resend } from "resend";
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const packs = [
  { id: "test-product", name: "Produit Test", price: 100, stripePriceId: "price_1Qx9qNGKCVzDExz8SqSZSMeX" },
  { id: "pack1", name: "Pack Standard", price: 8000, stripePriceId: "price_1QwVRfGKCVzDExz8KO4ujxPa" },
  { id: "pack2", name: "Pack Essentiel", price: 10500, stripePriceId: "price_1QwVT4GKCVzDExz87s7E1Mei" },
  { id: "pack3", name: "Pack Confort", price: 12500, stripePriceId: "price_1QwVU1GKCVzDExz8tfhjhIeX" },
  { id: "pack4", name: "Pack Premium", price: 13500, stripePriceId: "price_1QwVUxGKCVzDExz8WsQ3j9wu" },
  { id: "pack5", name: "Pack Prestige", price: 17500, stripePriceId: "price_1QwVWOGKCVzDExz8I4Gd3P5F" },
  { id: "pack6", name: "Pack Grand Événement", price: 19500, stripePriceId: "price_1QwVXKGKCVzDExz8SNRzMiE9" },
  { id: "pack7", name: "Pack Vidéo", price: 5000, stripePriceId: "price_1QwVYCGKCVzDExz8wlZ4GIlE" },
];

const options = [
  { id: "test-product", name: "Produit Test", price: 100, stripePriceId: "price_1Qx9qNGKCVzDExz8SqSZSMeX" },
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
      deposit,           // caution en centimes (ex: 10000 pour 100€)
      fullName,
      email,
      eventAddress,
      startDate,
      startTime,
      endDate,
      endTime,
      participants,
      technicianHours,
      selectedPacks,
      selectedOptions,
      packQuantities,
      optionQuantities,
      mainPaymentAmount, // montant principal en centimes (ex: 1000 pour 10€)
    } = await req.json();

    // Vérification et conversion du montant principal
    let mainAmount = parseInt(mainPaymentAmount, 10);
    if (isNaN(mainAmount)) {
      mainAmount = 0;
    }

    // Création du client Stripe
    const customer = await stripe.customers.create({
      email,
      name: fullName,
    });

    // Création des line items pour le paiement principal (sans la caution)
    const mainLineItems = selectedPacks.map(packId => {
      const pack = packs.find(p => p.id === packId);
      return {
        price: pack.stripePriceId,
        quantity: packQuantities[packId] || 1,
      };
    }).concat(selectedOptions.map(optionId => {
      const option = options.find(o => o.id === optionId);
      let quantity = 1;
      if (optionId === "technician-management") {
        quantity = technicianHours;
      } else if (option?.quantity) {
        quantity = optionQuantities[optionId] || 1;
      }
      return { price: option.stripePriceId, quantity };
    }));

    // Création de la session Checkout pour le paiement principal uniquement
    const mainSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customer.id,
      line_items: mainLineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success-payment?session_id={CHECKOUT_SESSION_ID}&customer_id=${customer.id}&deposit=${deposit}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    // Création d'un PaymentIntent pour la caution (non confirmé ici)
    let depositPaymentLink = null;
    if (deposit > 0) {
      const depositIntent = await stripe.paymentIntents.create({
        amount: deposit,
        currency: 'eur',
        capture_method: 'manual',
        customer: customer.id,
        payment_method_types: ['card'],
      });
      depositPaymentLink = depositIntent.id;
    }

    // Calcul du montant total des produits (pour l'affichage dans l'e-mail)
    const totalProductsAmount = selectedPacks.reduce((acc, packId) => {
      const pack = packs.find(p => p.id === packId);
      return acc + (pack?.price || 0) * (packQuantities[packId] || 1);
    }, 0);
    const totalFromOptions = selectedOptions.reduce((acc, optionId) => {
      const option = options.find(o => o.id === optionId);
      let qty = optionId === "technician-management" ? technicianHours : 
                option?.quantity ? optionQuantities[optionId] || 1 : 1;
      return acc + (option?.price || 0) * qty;
    }, 0);
    const totalProductsDisplay = totalProductsAmount + totalFromOptions;

    // Préparation du payload pour l'insertion dans la table "final_reservations"
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
      totalAmount: mainAmount / 100, // en euros (paiement principal)
      paymentLink: mainSession.url,
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

    // Insertion des packs sélectionnés
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

    // Insertion des options sélectionnées
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

    // Génération du contenu de l'e-mail de confirmation (inchangé)
    const emailContent = `
   <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#fff;margin:0;padding:0;color:#000;">
<div style="max-width:600px;margin:10px auto;background:#fff;">
<div style="text-align:center;padding:10px 0;">
<img src="http://localhost:3000/images/logoN.png" alt="Logo" style="width:250px;height:auto;">
</div>
<div style="background:#ff6600;padding:40px 0;text-align:center;">
<h1 style="margin:0;font-size:24px;color:#fff;text-transform:uppercase;">MERCI POUR VOTRE RÉSERVATION !</h1>
<h2 style="margin:20px 0 10px;font-size:20px;color:#fff;">Prochaines étapes</h2>
<table align="center" role="presentation" style="width:80%;max-width:500px;margin:0 auto;text-align:center;">
<tr>
<td width="25%" style="padding:10px 0;"><span style="font-size:14px;font-weight:bold;color:#fff;white-space:nowrap;">1.&nbsp;Paiement</span></td>
<td width="25%" style="padding:10px 0;"><span style="font-size:14px;font-weight:bold;color:#fff;white-space:nowrap;">2.&nbsp;Caution</span></td>
<td width="25%" style="padding:10px 0;"><span style="font-size:14px;font-weight:bold;color:#fff;white-space:nowrap;">3.&nbsp;Docs</span></td>
<td width="25%" style="padding:10px 0;"><span style="font-size:14px;font-weight:bold;color:#fff;white-space:nowrap;">4.&nbsp;Contrat</span></td>
</tr>
</table>
</div>
<div style="padding:20px;">
<p style="font-size:16px;line-height:1.5;margin:0 0 20px;">Bonjour <strong>${fullName}</strong>,<br>Votre réservation est enregistrée. Voici les détails :</p>
<h2 style="font-size:18px;font-weight:bold;margin:0 0 10px;">Détails de l'événement</h2>
<table width="100%" style="border-collapse:collapse;">
<tr><td style="padding:5px 0;font-size:14px;">Adresse</td><td style="padding:5px 0;font-size:14px;text-align:right;">${eventAddress}</td></tr>
<tr><td style="padding:5px 0;font-size:14px;">Début</td><td style="padding:5px 0;font-size:14px;text-align:right;">${new Date(startDate).toLocaleDateString('fr-FR')} à ${startTime}</td></tr>
<tr><td style="padding:5px 0;font-size:14px;">Fin</td><td style="padding:5px 0;font-size:14px;text-align:right;">${new Date(endDate).toLocaleDateString('fr-FR')} à ${endTime}</td></tr>
<tr><td style="padding:5px 0;font-size:14px;">Participants</td><td style="padding:5px 0;font-size:14px;text-align:right;">${participants}</td></tr>
</table>
<h2 style="font-size:18px;font-weight:bold;margin:20px 0 10px;">Packs et options</h2>
<table width="100%" style="border-collapse:collapse;font-size:14px;">
${selectedPacks.map((id)=>{const p=packs.find((x)=>x.id===id);const q=packQuantities[id]||1;const t=(p?.price||0)*q;return`<tr><td style="padding:5px 0;">${p?.name||id} (x${q})</td><td style="padding:5px 0;text-align:right;font-weight:500;">${(t/100).toFixed(2)} €</td></tr>`}).join('')}
${selectedOptions.map((id)=>{const o=options.find((x)=>x.id===id);let t=0;let label=o?.name||id;if(id==="technician-management"){t=(o?.price||0)*technicianHours;label+=" ("+technicianHours+"h)"}else if(o?.quantity){const qty=optionQuantities[id]||1;t=(o?.price||0)*qty;label+=" (x"+qty+")"}else{t=o?.price||0}return`<tr><td style="padding:5px 0;">${label}</td><td style="padding:5px 0;text-align:right;font-weight:500;">${(t/100).toFixed(2)} €</td></tr>`}).join('')}
</table>
<h2 style="font-size:18px;font-weight:bold;margin:20px 0 10px;">Paiement</h2>
<table width="100%" style="border-collapse:collapse;font-size:14px;">
${deposit>0?`<tr><td style="padding:5px 0;">Caution</td><td style="padding:5px 0;text-align:right;font-weight:500;">${(deposit/100).toFixed(2)} €</td></tr>`:''}
<tr><td style="padding:5px 0;">Total</td><td style="padding:5px 0;text-align:right;font-weight:500;">${(totalProductsDisplay/100).toFixed(2)} €</td></tr>
</table>
<div style="text-align:center;margin:20px 0;">
<a href="${mainSession.url}" style="display:inline-block;background:#ff6600;color:#000;font-size:14px;font-weight:bold;padding:12px 24px;border-radius:8px;text-decoration:none;">Valider ma réservation</a>
</div>
<p style="font-size:12px;color:#888;text-align:center;margin:0 0 20px;">Pour garantir une expérience de réservation optimale, nous vous recommandons de vérifier que votre connexion internet est stable, que vous disposez de la somme requise pour la caution, et que tous vos documents essentiels sont préalablement rassemblés pour un téléchargement rapide.</p>
<p style="font-size:14px;line-height:1.5;text-align:center;margin:0;">Merci de faire confiance à <strong>Guy Location Events pour votre événement.<br>Questions : <a href="mailto:contact@guylocationevents.com" style="color:#ff6600;text-decoration:none;">contact@guylocationevents.com</a>.</p>
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
      mainPaymentUrl: mainSession.url, 
      depositPaymentIntent: depositPaymentLink 
    });
  } catch (error) {
    console.error("Erreur:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
