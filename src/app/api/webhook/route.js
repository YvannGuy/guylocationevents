// src/app/api/webhook/route.js
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
  // Récupère le body en tant que texte (nécessaire pour la vérification de signature)
  const buf = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error(`Erreur de vérification de la signature du webhook: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Traitement du webhook : lorsque la session Checkout est complétée
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const paymentIntentId = session.payment_intent;
    // Récupère le PaymentIntent pour accéder aux métadonnées
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const mainPaymentAmount = parseInt(paymentIntent.metadata.mainPaymentAmount, 10);

    try {
      // Capture partielle du PaymentIntent pour le paiement principal
      await stripe.paymentIntents.capture(paymentIntentId, {
        amount_to_capture: mainPaymentAmount,
      });
      console.log(`Capture partielle effectuée pour ${mainPaymentAmount} centimes.`);
    } catch (captureError) {
      console.error('Erreur lors de la capture partielle:', captureError.message);
    }
  }

  return NextResponse.json({ received: true });
}
