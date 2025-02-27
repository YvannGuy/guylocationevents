import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { mainPaymentAmount, deposit, paymentMethodId } = body;
    const totalAmount = mainPaymentAmount + deposit;

    // Création de la session Checkout pour le paiement principal
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: 'Total de la commande' },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
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

    let depositPaymentIntentId = null;
    if (deposit > 0) {
      // En mode live, on ne doit pas utiliser de PaymentMethodId de test.
      // Si paymentMethodId est fourni depuis le front-end, on confirme le PaymentIntent.
      const confirm = paymentMethodId ? true : false;
      const depositIntent = await stripe.paymentIntents.create({
        amount: deposit,
        currency: 'eur',
        capture_method: 'manual',
        payment_method_types: ['card'],
        confirm,
        ...(paymentMethodId && { payment_method: paymentMethodId }),
      });
      depositPaymentIntentId = depositIntent.id;
    }

    return NextResponse.json(
      { sessionId: session.id, url: session.url, depositPaymentIntentId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
