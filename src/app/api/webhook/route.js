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
  const buf = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error(`Erreur de vérification de la signature du webhook: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const paymentIntentId = session.payment_intent;
    const mainPaymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Montants dans les métadonnées
    const mainPaymentAmount = parseInt(mainPaymentIntent.metadata.mainPaymentAmount, 10);
    const depositAmount = parseInt(mainPaymentIntent.metadata.depositAmount, 10);

    // 1) Capture partielle du PaymentIntent (pour le paiement principal)
    try {
      await stripe.paymentIntents.capture(paymentIntentId, {
        amount_to_capture: mainPaymentAmount,
      });
      console.log(`Capture partielle effectuée pour ${mainPaymentAmount} centimes.`);
    } catch (error) {
      console.error('Erreur lors de la capture partielle:', error.message);
    }

    // 2) Créer le PaymentIntent de caution et le confirmer avec la même carte
    if (depositAmount > 0) {
      try {
        const depositIntent = await stripe.paymentIntents.create({
          amount: depositAmount,
          currency: 'eur',
          capture_method: 'manual',
          customer: mainPaymentIntent.customer,
          payment_method: mainPaymentIntent.payment_method,
          confirm: true,
        });
        console.log(`Caution autorisée (PaymentIntent ID: ${depositIntent.id}).`);
      } catch (error) {
        console.error('Erreur lors de la création du PaymentIntent de caution:', error.message);
      }
    }
  }

  return NextResponse.json({ received: true });
}
