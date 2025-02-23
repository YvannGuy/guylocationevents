/**
 * Title: Home
 * Description: Description of the component
 * Author: Kaji Hasibur Rahman
 * Date: 2025-01-03
 */
"use client";
import PublicLayout from "@/_components/layouts";
import { Fragment } from "react";
import AccordionContent from "@/_components/home/faq";
import { useTranslations } from "next-intl";

const CatalogPage = async () => {
  const t = useTranslations();

  const faqData = [
    {
      id: 1,
      question: t("Comment choisir l’équipement qui convient à mon événement?"),
      answer: t(
        "Nous proposons une assurance en option pour couvrir d’éventuels dommages Contactez-nous pour en savoir plus"
      ),
    },
    {
      id: 2,
      question: t("Dois-je verser une caution pour la location?"),
      answer: t(
        "Nous proposons une assurance en option pour couvrir d’éventuels dommages Contactez-nous pour en savoir plus"
      ),
    },
    {
      id: 3,
      question: t("Proposez-vous un service de livraison"),
      answer: t(
        "Nous proposons une assurance en option pour couvrir d’éventuels dommages Contactez-nous pour en savoir plus"
      ),
    },
    {
      id: 3,
      question: t("Si je rencontre un problème technique avec le matériel"),
      answer: t(
        "Nous proposons une assurance en option pour couvrir d’éventuels dommages Contactez-nous pour en savoir plus"
      ),
    },
    {
      id: 3,
      question: t("Quels sont les modes de paiement acceptés"),
      answer: t(
        "Nous proposons une assurance en option pour couvrir d’éventuels dommages Contactez-nous pour en savoir plus"
      ),
    },
    {
      id: 3,
      question: t(
        "Dois-je vérifier le matériel au moment du retrait ou de la livraison"
      ),
      answer: t(
        "Nous proposons une assurance en option pour couvrir d’éventuels dommages Contactez-nous pour en savoir plus"
      ),
    },
    {
      id: 3,
      question: t("Le matériel est-il assuré en cas de dommage"),
      answer: t(
        "Nous proposons une assurance en option pour couvrir d’éventuels dommages Contactez-nous pour en savoir plus"
      ),
    },
  ];
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
