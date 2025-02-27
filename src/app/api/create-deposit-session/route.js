import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { deposit, customerId } = await request.json(); // deposit en centimes et l'ID du client Stripe
    const depositSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Autorisation de caution: €${(deposit / 100).toFixed(2)}`,
            },
            unit_amount: deposit,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_intent_data: {
        capture_method: 'manual', // Autorisation sans débit immédiat
      },
      // Redirection vers /success après la réussite de la session de caution
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });
    return NextResponse.json({ url: depositSession.url });
  } catch (error) {
    console.error("Erreur création session caution:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
