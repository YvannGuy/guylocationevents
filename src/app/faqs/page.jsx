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
      "Nous proposons une assurance en option pour couvrir d’éventuels dommages. Contactez-nous pour en savoir plus.",
  },
  {
    id: 2,
    question: "Dois-je verser une caution pour la location ?",
    answer:
      "Nous proposons une assurance en option pour couvrir d’éventuels dommages. Contactez-nous pour en savoir plus.",
  },
  {
    id: 3,
    question: "Proposez-vous un service de livraison?",
    answer:
      "Nous proposons une assurance en option pour couvrir d’éventuels dommages. Contactez-nous pour en savoir plus.",
  },
  {
    id: 3,
    question: "Si je rencontre un problème technique avec le matériel ?",
    answer:
      "Nous proposons une assurance en option pour couvrir d’éventuels dommages. Contactez-nous pour en savoir plus.",
  },
  {
    id: 3,
    question: "Quels sont les modes de paiement acceptés ?",
    answer:
      "Nous proposons une assurance en option pour couvrir d’éventuels dommages. Contactez-nous pour en savoir plus.",
  },
  {
    id: 3,
    question:
      "Dois-je vérifier le matériel au moment du retrait ou de la livraison?",
    answer:
      "Nous proposons une assurance en option pour couvrir d’éventuels dommages. Contactez-nous pour en savoir plus.",
  },
  {
    id: 3,
    question: "Le matériel est-il assuré en cas de dommage ?",
    answer:
      "Nous proposons une assurance en option pour couvrir d’éventuels dommages. Contactez-nous pour en savoir plus.",
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
