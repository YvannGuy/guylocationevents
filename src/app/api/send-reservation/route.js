import { Resend } from 'resend';

export async function POST(req) {
    try {
        const {
            fullName, email, telephone, subject, message,
            eventStartDate, eventEndDate, eventStartTime, eventEndTime,
            participants, eventType, technician, deliveryOption
        } = await req.json();

        const resend = new Resend(process.env.RESEND_API_KEY);

        const response = await resend.emails.send({
            from: "Guy Location Events <contact@guylocationevents.com>", // ✅ Email d'expéditeur validé
            to: ["devisclients@guylocationevents.com"], // ✅ Adresse de réception des réservations
            subject: "🚀 Nouvelle réservation - Guy Location Events",
            html: `
        <h2>🚨 Nouvelle demande de réservation</h2>
        <p><strong>Nom & Prénom :</strong> ${fullName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${telephone}</p>
        <p><strong>Objet :</strong> ${subject}</p>
        <p><strong>Message :</strong> ${message}</p>
        <hr />
        <p><strong>📅 Début :</strong> ${eventStartDate || "Non spécifié"} à ${eventStartTime || "Non spécifié"}</p>
        <p><strong>📅 Fin :</strong> ${eventEndDate || "Non spécifié"} à ${eventEndTime || "Non spécifié"}</p>
        <p><strong>👥 Participants :</strong> ${participants || "Non spécifié"}</p>
        <p><strong>🎉 Type d'événement :</strong> ${eventType || "Non spécifié"}</p>
        <hr />
        <p><strong>🛠️ Besoin d'un technicien :</strong> ${technician === "oui" ? "✅ Oui" : "❌ Non"}</p>
        <p><strong>🚚 Mode de récupération :</strong> ${deliveryOption === "livraison" ? "🚛 Livraison" : "📦 Retrait"}</p>
        <hr />
        <p>📩 <strong>Réservations :</strong> reservation@guy-location-events.com</p>
      `,
        });

        console.log("✅ Email de réservation envoyé avec succès :", response);
        return Response.json({ success: true, message: "Email de réservation envoyé !" });
    } catch (error) {
        console.error("❌ Erreur lors de l’envoi de l’email de réservation :", error);
        return Response.json({ success: false, message: error.message }, { status: 500 });
    }
}
