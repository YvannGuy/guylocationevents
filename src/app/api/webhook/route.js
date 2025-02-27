// pages/api/webhook.js
import Stripe from 'stripe';
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error(`Erreur de vérification de la signature du webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Lorsque la session Checkout est complétée
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Récupère l'ID du PaymentIntent depuis la session
    const paymentIntentId = session.payment_intent;
    // Récupère le PaymentIntent pour accéder aux métadonnées
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const mainPaymentAmount = parseInt(paymentIntent.metadata.mainPaymentAmount, 10);

    try {
      // Capture partiellement le PaymentIntent pour le paiement principal
      await stripe.paymentIntents.capture(paymentIntentId, {
        amount_to_capture: mainPaymentAmount,
      });
      console.log(`Capture partielle effectuée pour ${mainPaymentAmount} centimes.`);
    } catch (captureError) {
      console.error('Erreur lors de la capture partielle:', captureError.message);
    }
  }

  res.status(200).json({ received: true });
}
