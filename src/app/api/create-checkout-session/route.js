// pages/api/create-checkout-session.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  try {
    // On suppose que vous recevez ces valeurs depuis le front-end (en centimes)
    const { mainPaymentAmount, deposit } = req.body;
    const totalAmount = mainPaymentAmount + deposit;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: { name: 'Total de la commande' },
          unit_amount: totalAmount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      // Création d'un PaymentIntent en mode manuel avec des métadonnées
      payment_intent_data: {
        capture_method: 'manual',
        metadata: {
          mainPaymentAmount: mainPaymentAmount.toString(),
          depositAmount: deposit.toString(),
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error.message);
    res.status(500).json({ error: error.message });
  }
}
