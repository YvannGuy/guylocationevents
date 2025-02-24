/**
 * Title: Home
 * Description: Description of the component
 * Author: Kaji Hasibur Rahman
 * Date: 2025-01-03
 */

import PublicLayout from "@/_components/layouts";
import { Fragment } from "react";
import AccordionContent from "@/_components/home/faq";

const faqData = [
  {
    id: 1,
    question: "Comment choisir l’équipement qui convient à mon événement ?",
    answer:
      "Le choix dépend du type d’événement, de la taille du lieu et du nombre de participants. Notre équipe peut vous conseiller pour trouver le pack le plus adapté.",
  },
  {
    id: 2,
    question: "Proposez-vous la livraison et l’installation du matériel ?",
    answer:
      "Oui, nous livrons et installons le matériel en Île-de-France, y compris Paris. Un technicien peut également rester sur place si nécessaire.",
  },
  {
    id: 3,
    question: "Fournissez-vous les câbles et accessoires nécessaires ?",
    answer:
      "Oui, tous les câbles et accessoires nécessaires au bon fonctionnement du matériel sont inclus dans la location.",
  },
  {
    id: 3,
    question: "Combien de temps à l'avance dois-je réserver l'équipement ?",
    answer:
      "Réservez le plus tôt possible, surtout pendant les périodes de forte demande. Nous acceptons les demandes de dernière minute selon la disponibilité.",
  },
  {
    id: 3,
    question: "Puis-je modifier ma réservation après confirmation ?",
    answer:
      "Oui, vous pouvez modifier votre réservation sous réserve de disponibilité. Contactez-nous dès que possible pour toute modification.",
  },
  {
    id: 3,
    question:
      "Dois-je vérifier le matériel au moment du retrait ou de la livraison?",
    answer:
      "Oui, il est important de vérifier le matériel lors du retrait ou de la livraison pour s'assurer qu'il est en bon état et complet. Toute anomalie doit être signalée immédiatement.",
  },
  {
    id: 3,
    question: "Que faire en cas de problème technique pendant l’événement ?",
    answer:
      "Pour les locations avec technicien, nous assurons une assistance sur place. Si le problème n’est pas dû à une mauvaise utilisation, nous intervenons gratuitement. Dans le cas contraire, une intervention sur place sera facturée.",
  },
];

const CatalogPage = async () => {
  return (
    <Fragment>
      <PublicLayout>
        <div className="catalog">
          <AccordionContent faqData={faqData} />
        </div>
      </PublicLayout>
    </Fragment>
  );
};

export default CatalogPage;
