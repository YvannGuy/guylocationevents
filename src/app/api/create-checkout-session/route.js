import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { mainPaymentAmount, deposit } = body; // mainPaymentAmount et deposit en centimes

    // Ici, on ne traite que le paiement principal
    const totalAmount = mainPaymentAmount; // On exclut la caution du montant à capturer

    // Création de la session Checkout pour le paiement principal uniquement
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: 'Total de la commande (paiement principal)' },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_intent_data: {
        capture_method: 'manual', // Autorisation manuelle (capture ultérieure)
        metadata: {
          mainPaymentAmount: mainPaymentAmount.toString(), // Montant à capturer immédiatement
          depositAmount: deposit.toString(), // Montant de caution à autoriser séparément
        },
      },
      // Redirige vers /create-deposit-session après le paiement principal, en transmettant customer_id et deposit
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/create-deposit-session?session_id={CHECKOUT_SESSION_ID}&customer_id=${encodeURIComponent(customer.id)}&deposit=${deposit}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json(
      { sessionId: session.id, url: session.url },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
