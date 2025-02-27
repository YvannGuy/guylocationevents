import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  // Récupère le body en tant que texte pour la vérification de signature
  const buf = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error(`Erreur de vérification de la signature du webhook: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Quand la session Checkout est complétée
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const paymentIntentId = session.payment_intent;
    const mainPaymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Récupération des montants depuis les métadonnées
    const mainPaymentAmount = parseInt(mainPaymentIntent.metadata.mainPaymentAmount, 10);
    const depositAmount = parseInt(mainPaymentIntent.metadata.depositAmount, 10);

    // 1. Capture partielle du PaymentIntent principal (pour le paiement immédiat)
    try {
      await stripe.paymentIntents.capture(paymentIntentId, {
        amount_to_capture: mainPaymentAmount,
      });
      console.log(`Capture partielle effectuée pour ${mainPaymentAmount} centimes.`);
    } catch (captureError) {
      console.error('Erreur lors de la capture partielle:', captureError.message);
    }

    // 2. Créer et confirmer le PaymentIntent de caution en réutilisant le même PaymentMethod
    if (depositAmount > 0) {
      try {
        const depositIntent = await stripe.paymentIntents.create({
          amount: depositAmount,
          currency: 'eur',
          capture_method: 'manual', // Autorisation (les fonds seront bloqués)
          customer: mainPaymentIntent.customer,
          payment_method: mainPaymentIntent.payment_method, // Réutilisation du moyen de paiement utilisé pour le Checkout
          confirm: true, // Confirme immédiatement pour autoriser le montant sur la carte
        });
        console.log("PaymentIntent de caution créé:", depositIntent.id);
      } catch (depositError) {
        console.error('Erreur lors de la création du PaymentIntent de caution:', depositError.message);
      }
    }
  }

  return NextResponse.json({ received: true });
}
