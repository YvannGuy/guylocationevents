export async function POST(request) {
    try {
      const { message } = await request.json();
  
      if (!message || typeof message !== 'string') {
        return new Response(
          JSON.stringify({ error: 'Message invalide ou manquant.' }),
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
  
      const predefinedResponses = {
        "bonjour": "Bonjour ! Comment puis-je vous aider ?",
        "quels équipements proposez-vous?": "Nous proposons une large gamme d'équipements : systèmes de sonorisation, équipements vidéo professionnels et photobooths pour animer vos événements.",
        "quels types d'équipements sono proposez-vous?": "Nous offrons des systèmes de sonorisation adaptés à tous types d'événements, incluant enceintes, microphones et tables de mixage.",
        "quels sont vos horaires?": "Nous sommes ouverts de 9h30 à 19h30 du lundi au dimanche, et pour les urgences de 19h30 à 21h",
        "comment fonctionne la location?": "La location se fait à la journée, avec possibilité de livraison et d’installation. Une caution est demandée, et nos équipements sont accompagnés de guides d’utilisation.",
        "comment réserver?": "Réservez directement via notre site web ou contactez-nous par téléphone pour un devis personnalisé.",
        "avez-vous un service technicien?": "Oui, notre technicien peut installer et configurer le matériel sur place. Ce service coûte 50 €/h avec une intervention minimum de 3 heures.",
      };
  
      let reply = "Désolé, je n'ai pas de réponse pour cette question, veuillez nous contactez via le bouton whatsapp.";
      // On parcourt les clés et on compare leurs versions normalisées
      for (const key in predefinedResponses) {
        if (normalizeString(key) === normalizedMessage) {
          reply = predefinedResponses[key];
          break;
        }
      }
  
      return new Response(
        JSON.stringify({ reply }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Erreur API:", error);
      return new Response(
        JSON.stringify({ error: "Service indisponible - Veuillez réessayer" }),
        { status: 500 }
      );
    }
  }
  