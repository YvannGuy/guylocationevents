import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Récupération des données envoyées via FormData
    const formData = await req.formData();
    const fullName = formData.get("fullName");
    const email = formData.get("email");

    // Récupération des fichiers uploadés
    const contractFile = formData.get("contractFile");
    const invoiceFile = formData.get("invoiceFile");

    // Préparation des attachements pour Resend
    const attachments = [];

    if (contractFile && contractFile.name) {
      const contractBuffer = Buffer.from(await contractFile.arrayBuffer());
      const base64Contract = contractBuffer.toString("base64");
      attachments.push({
        filename: contractFile.name,
        content: base64Contract,
        type: contractFile.type,
      });
    }

    if (invoiceFile && invoiceFile.name) {
      const invoiceBuffer = Buffer.from(await invoiceFile.arrayBuffer());
      const base64Invoice = invoiceBuffer.toString("base64");
      attachments.push({
        filename: invoiceFile.name,
        content: base64Invoice,
        type: invoiceFile.type,
      });
    }

    // Contenu HTML préconfiguré de l'e-mail
    const emailContent = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#fff;margin:0;padding:0;color:#000;">
  <div style="max-width:600px;margin:10px auto;background:#fff;">
  <div style="text-align:center;padding:10px 0;">
      <img src="https://guylocationevents.com/images/logoN.png" alt="Logo" style="width:250px;height:auto;">
    </div>
    <!-- Bandeau orange -->
    <div style="background:#ff6600;padding:40px 0;text-align:center;">
      <h1 style="margin:0;font-size:24px;color:#fff;text-transform:uppercase;">Confirmation de votre réservation</h1>
    </div>

    <div style="padding:20px;">
      <p style="font-size:16px;line-height:1.5;margin:0 0 20px;">
        Bonjour <strong>${fullName}</strong>,
      </p>
      <p style="font-size:16px;line-height:1.5;margin:0 0 20px;">
        Nous vous remercions de la confiance que vous nous accordez.<br /><br />
  Nous vous confirmons avoir bien reçu votre paiement ainsi que votre caution.<br /><br />
  Veuillez trouver en pièce jointe votre contrat dûment signé ainsi que la facture correspondante.<br /><br />
  En fonction de votre choix entre livraison et retrait, notre équipe vous contactera prochainement afin de vous communiquer les instructions relatives à la suite de votre réservation.
      </p>
      <p style="font-size:16px;line-height:1.5;margin:0 0 20px;">
      </p>
      <p style="font-size:16px;line-height:1.5;margin:20px 0 0;">
        Pour toute question ou information complémentaire, n'hésitez pas à nous contacter à l'adresse 
        <a href="mailto:contact@sndrush.com" style="color:#ff6600;text-decoration:none;">contact@sndrush.com</a>.
      </p>
      <p style="font-size:16px;line-height:1.5;margin:20px 0 0;">
        Cordialement,<br>
        <strong>Snd rush</strong><br /><br />
        Votre évènement, Notre passion
      </p>
    </div>
  </div>
</div>
    `;

    // Initialisation de Resend avec la clé API (assurez-vous de définir RESEND_API_KEY dans vos variables d'environnement)
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Envoi de l'e-mail via Resend avec attachements
    await resend.emails.send({
      from: "Snd rush <contact@sndrush.com>",
      to: email,
      subject: "Votre contrat et votre facture",
      html: emailContent,
      attachments,
    });

    return NextResponse.json({
      success: true,
      message: "E-mail envoyé avec succès.",
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
