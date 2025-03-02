export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Message invalide ou manquant." }),
        { status: 400 }
      );
    }

    // Fonction de normalisation : suppression de la ponctuation, conversion en minuscule et espaces en trop
    function normalizeString(str) {
      return str
        .trim()
        .toLowerCase()
        .replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, " ");
    }

    const normalizedMessage = normalizeString(message);

    // Réponses prédéfinies couvrant un maximum de sujets liés à votre activité
    const predefinedResponses = {
      // Questions affichées (visibles dans l'interface)
      bonjour: "Bonjour ! Comment puis-je vous aider ?",
      "quels équipements proposez-vous?":
        "Nous proposons une large gamme d'équipements : systèmes de sonorisation, équipements vidéo professionnels et photobooths pour animer vos événements.",
      "quels types d'équipements sono proposez-vous?":
        "Nous offrons des systèmes de sonorisation adaptés à tous types d'événements, incluant enceintes, microphones et tables de mixage.",
      "quels sont vos horaires?":
        "Nous sommes ouverts de 9h30 à 19h30 du lundi au dimanche, et pour les urgences de 19h30 à 21h.",
      "comment fonctionne la location?":
        "La location se fait à la journée, avec possibilité de livraison et d’installation. Une caution est demandée, et nos équipements sont accompagnés de guides d’utilisation.",
      "comment réserver?":
        "Réservez directement via notre site web ou contactez-nous par téléphone pour un devis personnalisé.",
      "avez-vous un service technicien?":
        "Oui, notre technicien peut installer et configurer le matériel sur place. Ce service coûte 50 €/h avec une intervention minimum de 3 heures.",

      // Questions supplémentaires et mots clés (non affichés)
      "proposez vous des forfaits pour les événements?":
        "Oui, nous proposons des pack adaptés aux besoins de chaque événement. Contactez-nous pour un devis personnalisé.",
      forfait:
        "Oui, nous proposons des pack adaptés aux besoins de chaque événement. Contactez-nous pour un devis personnalisé.",
      réduction: "Nous n'offrons pas de réduction.",
      matériel:
        "Nos équipements sont assurés et vérifiés régulièrement pour garantir votre sécurité et la qualité du service.",
      équipements:
        "Nous proposons divers équipements professionnels pour vos événements, allant de systèmes de sonorisation à des équipements vidéo.",
      sonorisation:
        "Nos systèmes de sonorisation offrent une qualité audio optimale pour tous vos événements.",
      vidéo:
        "Nous fournissons des équipements vidéo professionnels pour capturer chaque moment important de votre événement.",
      photobooth:
        "Nos photobooths apportent une touche ludique à vos événements et créent des souvenirs inoubliables.",
      installation:
        "L'installation de nos équipements est réalisée par des professionnels pour garantir une performance optimale.",
      tarif:
        "Nos tarifs varient en fonction de l'équipement et de la durée de location. Contactez-nous pour un devis personnalisé.",
      devis:
        "Pour obtenir un devis, veuillez nous contacter directement via notre site ou par téléphone.",
      support:
        "Nous offrons un support technique sur place pendant vos événements afin d'assurer leur bon déroulement.",
      assistance:
        "Notre service d'assistance est à votre disposition pour répondre à toutes vos questions et garantir le succès de votre événement.",
      location:
        "La location de nos équipements est flexible et adaptée à tous types d'événements. N'hésitez pas à nous contacter pour plus d'informations.",
      caution:
        "Une caution est demandée lors de la location. Son montant varie en fonction du matériel et de la durée de la location.",
      litige:
        "En cas de litige, nous vous invitons à nous contacter directement afin de trouver une solution adaptée.",
      enceinte:
        "Nos enceintes sont de qualité professionnelle et adaptées pour offrir un son clair lors de vos événements.",
      événement:
        "Nous fournissons des équipements adaptés pour tous types d'événements, qu'il s'agisse de mariages, conférences ou fêtes privées.",
      chèque:
        "Nous n'acceptons pas les chèques. Nous acceptons uniquement la carte bleue et PayPal.",
      paiement: "Nous acceptons uniquement la carte bleue et PayPal.",
      réclamation:
        "Pour toute réclamation, merci de nous contacter directement afin que nous puissions résoudre le problème dans les plus brefs délais.",
      conditions:
        "Nos conditions de location et de paiement vous sont communiquées lors de la demande de devis. N'hésitez pas à nous contacter pour plus de détails.",
    };

    let reply =
      "Désolé, je n'ai pas de réponse pour cette question, veuillez nous contacter via le bouton WhatsApp.";

    // Recherche par inclusion sur l'ensemble des clés (mots clés et phrases)
    for (const key in predefinedResponses) {
      const normalizedKey = normalizeString(key);
      if (normalizedMessage.includes(normalizedKey)) {
        reply = predefinedResponses[key];
        break;
      }
    }

    return new Response(JSON.stringify({ reply }), { status: 200 });
  } catch (error) {
    console.error("Erreur API:", error);
    return new Response(
      JSON.stringify({ error: "Service indisponible - Veuillez réessayer" }),
      { status: 500 }
    );
  }
}
