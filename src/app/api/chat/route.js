// src/app/api/chat/route.js
export async function POST(request) {
    try {
        const { message } = await request.json();

        if (!message || typeof message !== 'string') {
            return new Response(
                JSON.stringify({ error: 'Message invalide ou manquant.' }),
                { status: 400 }
            );
        }

        // Normalisation du message pour gérer la casse et les espaces
        const normalizedMessage = message.trim().toLowerCase();

        // Réponses préprogrammées pour la location d'équipements événementiels
        const predefinedResponses = {
            "bonjour": "Bonjour ! Comment puis-je vous aider ?",
            "salut": "Salut ! Que puis-je faire pour vous ?",
            "quels sont vos horaires ?": "Nous sommes ouverts de 9h à 18h du lundi au vendredi.",
            "quels équipements proposez-vous ?":
                "Nous proposons une large gamme d'équipements : systèmes de sonorisation, équipements vidéo professionnels et photobooths pour animer vos événements.",
            "quels types d'équipements sono proposez-vous ?":
                "Nous offrons des systèmes de sonorisation adaptés à tous types d'événements, incluant enceintes, microphones et tables de mixage.",
            "quels équipements vidéo proposez-vous ?":
                "Nous louons des caméras, projecteurs, écrans et accessoires vidéo de haute qualité.",
            "qu'est-ce qu'un photobooth ?":
                "Un photobooth est une cabine photo interactive qui permet à vos invités de créer des souvenirs amusants lors de vos événements.",
            "comment réserver ?":
                "Vous pouvez réserver nos équipements via notre site web ou en nous contactant directement par téléphone.",
            "quel est le prix de location ?":
                "Nos tarifs varient selon l'équipement et la durée de location. Contactez-nous pour un devis personnalisé.",
            "où se situe votre entreprise ?":
                "Nous sommes basés à [votre ville ou région] et nous desservons toute la région environnante.",
            "offrez-vous un service d'installation ?":
                "Oui, nous proposons un service d'installation et de support technique pour assurer le bon déroulement de votre événement."
        };

        if (predefinedResponses[normalizedMessage]) {
            return new Response(
                JSON.stringify({ reply: predefinedResponses[normalizedMessage] }),
                { status: 200 }
            );
        } else {
            return new Response(
                JSON.stringify({ reply: "Désolé, je n'ai pas de réponse pour cette question." }),
                { status: 200 }
            );
        }
    } catch (error) {
        console.error("Erreur API:", error);
        return new Response(
            JSON.stringify({ error: "Service indisponible - Veuillez réessayer" }),
            { status: 500 }
        );
    }
}
