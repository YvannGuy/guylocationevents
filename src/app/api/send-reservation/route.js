// app/api/send-reservation/route.js
import { supabase } from "@/lib/supabaseClient";
import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const {
            fullName, email, telephone, subject, message,
            eventStartDate, eventEndDate, eventStartTime, eventEndTime,
            participants, eventType, technician, deliveryOption
        } = await req.json();

        // Insertion dans Supabase
        const { error: supabaseError } = await supabase.from("reservations").insert({
            fullName, email, telephone, subject, message,
            eventStartDate, eventEndDate, eventStartTime, eventEndTime,
            participants, eventType, technician, deliveryOption,
            created_at: new Date().toISOString()
        });

        if (supabaseError) {
            console.error("❌ Erreur Supabase :", supabaseError.message);
            return NextResponse.json({ success: false, message: "Erreur lors de l'insertion dans Supabase" }, { status: 500 });
        }

        // Envoi du mail avec le nouveau design
        const resend = new Resend(process.env.RESEND_API_KEY);

        const response = await resend.emails.send({
            from: "Snd rush <contact@sndrush.com>",
            to: ["devisclients@guylocationevents.com"],
            subject: "🎉 Nouvelle réservation - Snd rush",
            html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fb; padding: 40px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden;">
          <!-- Header -->
          <tr style="background-color: #ffffff;">
            <td style="padding: 20px; text-align: center;">
              <!-- Icône / Image -->
              <img src="https://guylocationevents.com/images/logolocguy.png" alt="Scooter Icon" width="80" style="display: block; margin: 0 auto 10px;" />
              <!-- Titre principal -->
              <h1 style="margin: 0; font-size: 24px; color: #333333;">Vous avez une nouvelle réservation !</h1>
              <p style="margin: 8px 0 0; color: #888888; font-size: 14px;">
                Retrouvez ici tous les détails.
              </p>
            </td>
          </tr>

          <!-- Info commande -->
          <tr>
            <td style="padding: 20px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="color: #555555; font-size: 14px; padding-bottom: 6px;">
                    <strong>Réservation # :</strong> ${Math.floor(Math.random() * 1000000)}<br />
                    <strong>Date :</strong> ${new Date().toLocaleDateString()}
                  </td>
                  <td style="text-align: right; color: #555555; font-size: 14px; padding-bottom: 6px;">
                    <strong>Client :</strong> ${fullName}<br />
                    <strong>Email :</strong> ${email}<br />
                    <strong>Telephone :</strong> ${telephone}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Résumé de la réservation -->
          <tr>
            <td style="padding: 20px;">
              <h2 style="margin: 0 0 10px; font-size: 18px; color: #333;">Résumé de la réservation</h2>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                <tr style="background-color: #f5f5f5; color: #333;">
                  <th align="left" style="padding: 10px; font-size: 14px;">Élément</th>
                  <th align="center" style="padding: 10px; font-size: 14px;">Détails</th>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">Date & Heure (Début)</td>
                  <td align="center" style="padding: 10px; border-bottom: 1px solid #eee;">
                    ${eventStartDate || "—"} à ${eventStartTime || "—"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">Date & Heure (Fin)</td>
                  <td align="center" style="padding: 10px; border-bottom: 1px solid #eee;">
                    ${eventEndDate || "—"} à ${eventEndTime || "—"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">Participants</td>
                  <td align="center" style="padding: 10px; border-bottom: 1px solid #eee;">
                    ${participants || "—"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">Type d'événement</td>
                  <td align="center" style="padding: 10px; border-bottom: 1px solid #eee;">
                    ${eventType || "—"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">Technicien</td>
                  <td align="center" style="padding: 10px; border-bottom: 1px solid #eee;">
                    ${technician === "oui" ? "✅ Inclus" : "❌ Non inclus"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px;">Livraison</td>
                  <td align="center" style="padding: 10px;">
                    ${deliveryOption === "livraison" ? "🚚 À domicile" : "🏢 Retrait"}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message supplémentaire -->
          <tr>
            <td style="padding: 20px;">
              <h2 style="margin: 0 0 10px; font-size: 18px; color: #333;">Message du client</h2>
              <div style="background-color: #f8f8f8; padding: 16px; border-radius: 6px; color: #555;">
                ${message || "Aucun message"}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px; text-align: center; color: #999999; font-size: 13px;">
              <p style="margin: 0;">© ${new Date().getFullYear()} Snd rush. Tous droits réservés.</p>
              <p style="margin: 4px 0 0; font-size: 12px;">Contact : devis@guy-location-events.com</p>
            </td>
          </tr>
        </table>
      </div>
      `,
        });

        console.log("✅ Email envoyé avec succès :", response);
        return NextResponse.json({ success: true, message: "Réservation enregistrée et email envoyé !" });

    } catch (error) {
        console.error("❌ Erreur :", error.message);
        return NextResponse.json({ success: false, message: "Erreur lors de la réservation" }, { status: 500 });
    }
}