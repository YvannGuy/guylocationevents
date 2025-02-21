// src/app/api/send-final-reservation/route.js
import Stripe from "stripe";
import { Resend } from "resend";
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

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

        let totalAmount = selectedPacks.reduce((acc, packId) => acc + (paymentLinks[packId] ? 10000 : 0), 0);
        totalAmount += selectedOptions.includes("technician") ? 10000 : 0;
        totalAmount += selectedOptions.includes("delivery") ? 5000 : 0;
        totalAmount += participants * 1000;

        const finalPaymentLink = paymentLinks[selectedPacks[0]] || paymentLinks.pack1;

        const { error: supabaseError } = await supabase.from("final_reservations").insert({
            fullName,
            email,
            selectedPacks,
            selectedOptions,
            participants,
            totalAmount: totalAmount / 100,
            paymentLink: finalPaymentLink,
        });

        if (supabaseError) {
            console.error("❌ Erreur Supabase :", supabaseError.message);
            return NextResponse.json({ success: false, message: "Erreur lors de l'insertion dans Supabase" }, { status: 500 });
        }

        const emailContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif; background-color: #fbfbfd; padding: 2rem; color: #1d1d1f;">
    <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border: 1px solid #e0e0e3;">
        <!-- En-tête type Apple -->
        <div style="background: linear-gradient(160deg, #e27431 0%, #d45a1a 100%); padding: 2.5rem; text-align: center;">
            <div style="display: inline-block; background: rgba(255, 255, 255, 0.15); border-radius: 50px; padding: 12px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            </div>
            <h1 style="margin: 1.5rem 0 0; font-size: 28px; font-weight: 600; color: white; letter-spacing: -0.3px;">Réservation confirmée</h1>
        </div>

        <!-- Corps du message -->
        <div style="padding: 2.5rem;">
            <p style="margin: 0 0 1.5rem; font-size: 17px; line-height: 1.5; color: #515154;">Bonjour <strong style="color: #1d1d1f;">${fullName}</strong>,<br>
            Votre réservation a été enregistrée avec succès. Voici le récapitulatif :</p>

            <div style="background: #f5f5f7; border-radius: 14px; padding: 1.5rem; margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                    <div>
                        <h3 style="margin: 0 0 0.5rem; font-size: 13px; color: #86868b; font-weight: 500;">PACKS</h3>
                        <p style="margin: 0; font-size: 17px; color: #1d1d1f;">${selectedPacks.join(', ') || '-'}</p>
                    </div>
                    <div>
                        <h3 style="margin: 0 0 0.5rem; font-size: 13px; color: #86868b; font-weight: 500;">OPTIONS</h3>
                        <p style="margin: 0; font-size: 17px; color: #1d1d1f;">${selectedOptions.join(', ') || '-'}</p>
                    </div>
                    <div>
                        <h3 style="margin: 0 0 0.5rem; font-size: 13px; color: #86868b; font-weight: 500;">PARTICIPANTS</h3>
                        <p style="margin: 0; font-size: 17px; color: #1d1d1f;">${participants}</p>
                    </div>
                    <div>
                        <h3 style="margin: 0 0 0.5rem; font-size: 13px; color: #86868b; font-weight: 500;">TOTAL</h3>
                        <p style="margin: 0; font-size: 17px; color: #1d1d1f; font-weight: 600;">${(totalAmount / 100).toFixed(2)} €</p>
                    </div>
                </div>
            </div>

            <!-- Bouton de paiement -->
            <a href="${finalPaymentLink}" style="display: block; text-decoration: none; background: linear-gradient(180deg, #e27431 0%, #d45a1a 100%); color: white; padding: 1rem; border-radius: 12px; text-align: center; font-weight: 500; font-size: 17px; transition: transform 0.1s ease; box-shadow: 0 4px 12px rgba(226, 116, 49, 0.2);">
                Finaliser le paiement
                <span style="font-size: 14px; display: block; opacity: 0.9; margin-top: 4px;">Cliquez pour accéder au portail sécurisé</span>
            </a>

            <!-- Footer -->
            <div style="margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid #e0e0e3; text-align: center;">
                <p style="margin: 0.5rem 0; font-size: 13px; color: #86868b;">
                    Guy Location Events<br>
                    <a href="tel:+33123456789" style="color: #0066cc; text-decoration: none;">+33 1 23 45 67 89</a> • 
                    <a href="mailto:contact@guylocationevents.com" style="color: #0066cc; text-decoration: none;">contact@guylocationevents.com</a>
                </p>
                <p style="margin: 0.5rem 0; font-size: 11px; color: #86868b;">
                    Cet e-mail a été envoyé automatiquement - merci de ne pas y répondre
                </p>
            </div>
        </div>
    </div>
</div>`;

        await resend.emails.send({
            from: "Guy Location Events <contact@guylocationevents.com>",
            to: email,
            subject: "Confirmation de votre réservation - Guy Location Events",
            html: emailContent,
        });

        return NextResponse.json({ success: true, message: "Réservation finale enregistrée et e-mail envoyé !" });

    } catch (error) {
        console.error("❌ Erreur :", error.message);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
