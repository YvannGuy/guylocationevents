import Stripe from "stripe";
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const { fullName, email, selectedPacks, selectedOptions, participants } = await req.json();

        const paymentLinks = {
            pack1: "https://buy.stripe.com/aEU7vB31df0JbbG002",
            pack2: "https://buy.stripe.com/fZe0399pBbOx0x25kl",
            pack3: "https://book.stripe.com/6oE8zFbxJdWF0x28ww",
        };

        const optionLinks = {
            technician: "https://buy.stripe.com/test_6oE8zFbxJdWF0x28ww",
            delivery: "https://buy.stripe.com/test_6oE8zFbxJdWF0x28ww",
        };

        let totalAmount = 0;
        selectedPacks.forEach((packId) => {
            if (paymentLinks[packId]) totalAmount += 10000;
        });

        selectedOptions.forEach((optionId) => {
            if (optionLinks[optionId]) totalAmount += 5000;
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: "eur",
            payment_method_types: ["card"],
            capture_method: "manual",
        });

        let finalPaymentLink = paymentLinks[selectedPacks[0]] || paymentLinks.pack1;

        // NOUVEAU DESIGN DU MAIL
        const emailContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif; background-color: #f5f5f7; padding: 40px 0;">
  <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 18px; box-shadow: 0 4px 28px rgba(0,0,0,0.06); overflow: hidden;">
    <header style="padding: 40px 40px 20px; text-align: center; border-bottom: 1px solid #f1f1f1;">
      <img src="https://votre-domaine.com/chemin/logo.png" alt="Guy Location Events" style="height: 48px; margin-bottom: 32px;"/>
      <h1 style="font-size: 28px; font-weight: 600; color: #1d1d1f; margin: 0 0 16px;">Réservation confirmée</h1>
      <p style="font-size: 17px; color: #86868b; margin: 0;">Prêt à finaliser votre événement</p>
    </header>

    <div style="padding: 40px;">
      <div style="display: flex; flex-direction: column; gap: 24px; margin-bottom: 40px;">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
          <div>
            <p style="font-size: 13px; color: #86868b; margin: 0 0 6px;">Client</p>
            <p style="font-size: 17px; color: #1d1d1f; margin: 0;">${fullName}</p>
          </div>
          <div>
            <p style="font-size: 13px; color: #86868b; margin: 0 0 6px;">Type d'événement</p>
            <p style="font-size: 17px; color: #1d1d1f; margin: 0;">${selectedPacks.join(", ")}</p>
          </div>
          <div>
            <p style="font-size: 13px; color: #86868b; margin: 0 0 6px;">Participants</p>
            <p style="font-size: 17px; color: #1d1d1f; margin: 0;">${participants}</p>
          </div>
          <div>
            <p style="font-size: 13px; color: #86868b; margin: 0 0 6px;">Montant total</p>
            <p style="font-size: 17px; color: #1d1d1f; margin: 0;">${(totalAmount / 100).toFixed(2)} €</p>
          </div>
        </div>

        <div style="background: #f5f5f7; border-radius: 12px; padding: 16px;">
          <p style="font-size: 13px; color: #86868b; margin: 0 0 8px;">Options sélectionnées</p>
          <p style="font-size: 17px; color: #1d1d1f; margin: 0;">
            ${selectedOptions.includes("technician") ? '✔︎ Technicien' : ''}
            ${selectedOptions.includes("delivery") ? '✔︎ Livraison' : ''}
          </p>
        </div>
      </div>

      <a href="${finalPaymentLink}" 
         style="display: block; text-align: center; background: #0071e3; color: #ffffff; 
                padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 500;
                font-size: 17px; transition: opacity 0.3s; line-height: 1;">
        Finaliser le paiement
        <span style="font-size: 13px; display: block; opacity: 0.8; margin-top: 4px;">Paiement sécurisé Stripe</span>
      </a>
    </div>

    <footer style="padding: 32px 40px; background: #f5f5f7; text-align: center;">
      <p style="font-size: 12px; color: #86868b; margin: 0;">
        © ${new Date().getFullYear()} Guy Location Events · Tous droits réservés
      </p>
    </footer>
  </div>
</div>
`;

        await resend.emails.send({
            from: "Guy Location Events <contact@guylocationevents.com>",
            to: email,
            subject: "Réservation confirmée - Guy Location Events",
            html: emailContent,
        });

        return new Response(
            JSON.stringify({ success: true, message: "E-mail de confirmation envoyé avec succès" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Erreur lors de l’envoi de l’e-mail final :", error);
        return new Response(
            JSON.stringify({ success: false, message: error.message }),
            { status: 500 }
        );
    }
}