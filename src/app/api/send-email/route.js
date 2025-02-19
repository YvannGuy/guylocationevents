import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const formData = await req.json();

        await resend.emails.send({
            from: process.env.RESEND_EMAIL_FROM,
            to: process.env.RESEND_EMAIL_TO,
            subject: '🚨 DEMANDE URGENTE - Guy Location Events',
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #e27431; font-size: 24px; margin-bottom: 20px;">Nouvelle demande urgente</h2>
          
          <div style="margin-bottom: 15px;">
            <strong>Nom complet:</strong> ${formData.fullName || 'Non renseigné'}
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Téléphone:</strong> ${formData.phone || 'Non renseigné'}
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Adresse:</strong> ${formData.address || 'Non renseigné'}
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Type d'événement:</strong> ${formData.eventType || 'Non renseigné'}
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Créneau horaire:</strong><br>
            Début: ${formData.startDateTime || 'Non renseigné'}<br>
            Fin: ${formData.endDateTime || 'Non renseigné'}
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong>Équipement demandé:</strong><br>
            ${formData.equipmentNeeded || 'Non renseigné'}
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
            <strong>Conditions acceptées:</strong> ${formData.acceptTerms ? '✅ Oui' : '❌ Non'}
          </div>
        </div>
      `
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}