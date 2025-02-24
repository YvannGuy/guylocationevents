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
            from: "Guy Location Events <contact@guylocationevents.com>",
            to: ["devisclients@guylocationevents.com"],
            subject: "🎉 Nouvelle réservation - Guy Location Events",
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif; max-width: 600px; margin: 0 auto; color: #1d1d1f;">
                    <div style="background: linear-gradient(135deg, #f5f5f7 0%, #fff 100%); padding: 32px; border-radius: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                        <!-- En-tête -->
                        <div style="text-align: center; margin-bottom: 32px;">
                            <div style="font-size: 24px; font-weight: 600; color: #1d1d1f; margin-bottom: 8px;">🎉 Nouvelle Réservation</div>
                            <div style="font-size: 15px; color: #86868b;">Guy Location Events</div>
                            <div style="height: 4px; background: linear-gradient(90deg, #0071e3 0%, #8e8ef0 100%); width: 60px; margin: 16px auto; border-radius: 2px;"></div>
                        </div>

                        <!-- Carte Client -->
                        <div style="background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #e0e0e0;">
                            <div style="display: flex; gap: 16px; margin-bottom: 20px;">
                                <div style="flex: 1;">
                                    <div style="font-size: 13px; color: #86868b; margin-bottom: 4px;">Client</div>
                                    <div style="font-size: 17px; font-weight: 500;">${fullName}</div>
                                </div>
                                <div style="flex: 1;">
                                    <div style="font-size: 13px; color: #86868b; margin-bottom: 4px;">Contact</div>
                                    <div style="font-size: 15px;">📧 ${email}</div>
                                    <div style="font-size: 15px;">📱 ${telephone}</div>
                                </div>
                            </div>
                            
                            <div style="margin-top: 16px;">
                                <div style="font-size: 13px; color: #86868b; margin-bottom: 4px;">Message</div>
                                <div style="font-size: 15px; background: #f5f5f7; padding: 12px; border-radius: 8px;">${message || "Aucun message"}</div>
                            </div>
                        </div>

                        <!-- Détails Événement -->
                        <div style="background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #e0e0e0;">
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 16px;">
                                <div>
                                    <div style="font-size: 20px; font-weight: 500; margin-bottom: 12px;">📅 Dates</div>
                                    <div style="font-size: 15px; margin-bottom: 8px;">
                                        <div style="color: #86868b;">Début</div>
                                        <div>${eventStartDate || "—"} • ${eventStartTime || "—"}</div>
                                    </div>
                                    <div style="font-size: 15px;">
                                        <div style="color: #86868b;">Fin</div>
                                        <div>${eventEndDate || "—"} • ${eventEndTime || "—"}</div>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: 20px; font-weight: 500; margin-bottom: 12px;">👥 Détails</div>
                                    <div style="font-size: 15px; margin-bottom: 8px;">
                                        <div style="color: #86868b;">Participants</div>
                                        <div>${participants || "—"}</div>
                                    </div>
                                    <div style="font-size: 15px;">
                                        <div style="color: #86868b;">Type</div>
                                        <div>${eventType || "—"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Options -->
                        <div style="background: #fff; border-radius: 12px; padding: 24px; border: 1px solid #e0e0e0;">
                            <div style="display: flex; gap: 16px;">
                                <div style="flex: 1; text-align: center; background: #f5f5f7; padding: 16px; border-radius: 8px;">
                                    <div style="font-size: 13px; color: #86868b; margin-bottom: 8px;">Technicien</div>
                                    <div style="font-size: 17px; font-weight: 500; color: ${technician === "oui" ? "#007A47" : "#BF4800"}">
                                        ${technician === "oui" ? "✅ Inclus" : "❌ Non inclus"}
                                    </div>
                                </div>
                                <div style="flex: 1; text-align: center; background: #f5f5f7; padding: 16px; border-radius: 8px;">
                                    <div style="font-size: 13px; color: #86868b; margin-bottom: 8px;">Livraison</div>
                                    <div style="font-size: 17px; font-weight: 500; color: #0071e3;">
                                        ${deliveryOption === "livraison" ? "🚚 À domicile" : "🏢 Retrait"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div style="text-align: center; margin-top: 32px; font-size: 13px; color: #86868b;">
                            <div style="margin-bottom: 8px;">📩 devis@guy-location-events.com</div>
                            <div>© ${new Date().getFullYear()} Guy Location Events</div>
                        </div>
                    </div>
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