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
      question: t("Comment puis-je réserver du matériel pour mon événement ?"),
      answer: t(
        "Vous pouvez réserver directement via notre formulaire de réservation en ligne. Une fois le formulaire soumis, notre équipe vous contactera pour confirmer la disponibilité et vous envoyer un devis personnalisé."
      ),
    },
    {
      id: 2,
      question: t("Dois-je verser une caution pour la location"),
      answer: t(
        "Oui, une caution est demandée lors de la réservation. Son montant dépend du matériel loué et sera précisé dans votre devis. Elle est restituée après vérification du matériel à la fin de la location."
      ),
    },
    {
      id: 3,
      question: t("Proposez-vous un service de livraison"),
      answer: t(
        "Oui, nous livrons à Paris intramuros pour 40 € et en Île-de-France pour 80 €"
      ),
    },
    {
      id: 3,
      question: t("Si je rencontre un problème technique avec le matériel"),
      answer: t(
        "Notre équipe de support est disponible par téléphone pour vous assister à distance. En cas de panne majeure, nous intervenons rapidement pour résoudre le problème"
      ),
    },
    {
      id: 3,
      question: t("Fournissez-vous un service d’installation ?"),
      answer: t(
        "Oui, notre technicien peut installer et configurer le matériel sur place."
      ),
    },
    {
      id: 3,
      question: t(
        "Que se passe-t-il en cas de casse ou de perte du matériel ?"
      ),
      answer: t(
        "En cas de dommage dû à une mauvaise utilisation ou de perte, les frais de réparation ou de remplacement seront facturés."
      ),
    },
    {
      id: 3,
      question: t("Puis-je venir récupérer le matériel moi-même ?"),
      answer: t(
        "Oui, le retrait du matériel est possible sur rendez-vous dans nos locaux. Les détails vous seront communiqués après confirmation de la réservation"
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
