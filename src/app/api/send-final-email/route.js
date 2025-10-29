import Stripe from "stripe";
import { Resend } from "resend";
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import { packs, options } from "@/data/packsAndOptions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

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
      customProducts,    // produits personnalisés
      mainPaymentAmount, // montant principal en centimes (ex: 1000 pour 10€)
    } = await req.json();

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ 
        success: false, 
        message: "Format d'email invalide" 
      }, { status: 400 });
    }

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
    })).concat((customProducts || []).map(product => {
      // Pour les produits personnalisés, on utilise price_data au lieu de price
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price, // déjà en centimes
        },
        quantity: product.quantity,
      };
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
    const totalFromCustomProducts = (customProducts || []).reduce((acc, product) => {
      return acc + (product.price * product.quantity);
    }, 0);
    const totalProductsDisplay = totalProductsAmount + totalFromOptions + totalFromCustomProducts;

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
<img src="https://guylocationevents.com/images/logoN.png" alt="Logo" style="width:250px;height:auto;">
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
${(customProducts || []).map((product)=>{const t=product.price*product.quantity;return`<tr><td style="padding:5px 0;">${product.name} (x${product.quantity})</td><td style="padding:5px 0;text-align:right;font-weight:500;">${(t/100).toFixed(2)} €</td></tr>`}).join('')}
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
<p style="font-size:14px;line-height:1.5;text-align:center;margin:0;">Merci de faire confiance à <strong>Snd rush pour votre événement.<br>Questions : <a href="mailto:contact@sndrush.com" style="color:#ff6600;text-decoration:none;">contact@sndrush.com</a>.</p>
</div>
</div>
</div>




 `;

    await resend.emails.send({
      from: "Snd rush <contact@sndrush.com>",
      to: email,
      subject: "Confirmation de réservation - Snd rush",
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
