/**
 * Title: Home
 * Description: Description of the component
 * Author: Kaji Hasibur Rahman
 * Date: 2025-01-03
 */
"use client";
import Grid from "@mui/material/Grid2";
import PublicLayout from "@/_components/layouts";
import CatalogList from "@/_components/home/catelog-llist";
import { Fragment } from "react";
import CommonHero from "@/_components/home/hero";
import Image from "next/image";
import AccordionContent from "@/_components/home/faq";
import CallToAction from "@/_components/home/cta";
import ContactInfo from "@/_components/home/contact-info";
import { useTranslations } from "next-intl";
const Home = async () => {
  const t = useTranslations();
  const packages = [
    {
      image: "/images/packstandard1.jpg",
      slug: "/pack-standard",
      alt: t(
        "20-50 Personnes, Idéal pour les petites soirées privées, anniversaires ou réunions professionnelles"
      ),
      title: t(
        "20-50 Personnes, Idéal pour les petites soirées privées, anniversaires ou réunions professionnelles"
      ),
      tag: t("PACK STANDARD"),
    },
    {
      image: "/images/packessentiel.jpg",
      slug: "/pack-essentiel",
      alt: t(
        "50-100 Personnes, Un son plus puissant pour des événements de taille moyenne"
      ),
      title: t(
        "50-100 Personnes, Un son plus puissant pour des événements de taille moyenne"
      ),
      tag: t("PACK ESSENTIEL"),
    },
    {
      image: "/images/packconfort.jpg",
      slug: "/pack-confort",
      alt: t(
        "100-150 personnes L’équilibre parfait entre puissance et qualité pour des événements de taille moyenne"
      ),
      title: t(
        "100-150 personnes L’équilibre parfait entre puissance et qualité pour des événements de taille moyenne"
      ),
      tag: t("PACK CONFORT"),
    },
    {
      image: "/images/packpremium.jpg",
      slug: "/pack-premium",
      alt: t(
        "150-200 personnes, Des basses profondes et une clarté sonore professionnelle les petites soirées privées, anniversaires ou réunions professionnelles"
      ),
      title: t(
        "150-200 personnes, Des basses profondes et une clarté sonore professionnelle les petites soirées privées, anniversaires ou réunions professionnelles"
      ),
      tag: t("PACK PREMIUM"),
    },
    {
      image: "/images/packprestige.jpg",
      slug: "/pack-prestige",
      alt: t(
        "200-250 personnes, L’expérience sonore ultime pour vos événements prestigieux anniversaires ou réunions professionnelles"
      ),
      title: t(
        "200-250 personnes, L’expérience sonore ultime pour vos événements prestigieux anniversaires ou réunions professionnelles"
      ),
      tag: t("PACK PRESTIGE"),
    },
    {
      image: "/images/packgrandevent.jpg",
      slug: "/pack-grand-event",
      alt: t(
        "250-250 personnes L’équilibre parfait  entre puissance et qualité pour des événements de taille moyenne"
      ),
      title: t(
        "250-250 personnes L’équilibre parfait  entre puissance et qualité pour des événements de taille moyenne"
      ),
      tag: t("PACK GRAND EVENT"),
    },
  ];
  const slides = [
    {
      backgroundImage: "/images/hero-bg1.jpg",
      subtitle: t("Louez facilement, profitez pleinement"),
      titleHighlight: t("Tout ce dont vous avez besoin"),
      title: t("pour vos événements en quelques clics"),
    },
  ];

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
        <div className="home">
          <CommonHero slides={slides} isHigher={true} />
          <CallToAction />
          <CatalogList cards={packages.slice(0, 3)} />
          {/* Proccess Start */}
          <section
            className="proccess-area"
            style={{
              backgroundImage: `url(/images/process-bg.png)`,
              backgroundRepeate: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <Grid className="container">
              <Grid className="section-title">
                <p>{t("Des étapes simplifiées pour vos locations")}</p>
                <h2>{t("NOTRE PROCESS")}</h2>
                <Image
                  src="/images/title-border.png"
                  width="130"
                  height="16"
                  alt="border"
                />
              </Grid>
              <Grid className="process-wrapper">
                <Grid className="single-process">
                  <Image
                    src="/images/step-1.png"
                    width="280"
                    height="265"
                    alt=""
                  />
                  <h3>{t("Remplissez le formulaire de réservation")}</h3>
                </Grid>
                <Grid className="single-process">
                  <Image
                    src="/images/step-2.png"
                    width="280"
                    height="265"
                    alt=""
                  />
                  <h3>
                    {t("Validez la caution et le paiement du pack choisi")}
                  </h3>
                </Grid>
                <Grid className="single-process">
                  <Image
                    src="/images/step-3.png"
                    width="280"
                    height="265"
                    alt=""
                  />
                  <h3>
                    {" "}
                    {t("Récupérez votre matériel")} <br /> (
                    {t("livraison ou retrait")})
                  </h3>
                </Grid>
              </Grid>
            </Grid>
          </section>
          {/* Proccess End */}
          <AccordionContent faqData={faqData} />
          <ContactInfo />
        </div>
      </PublicLayout>
    </Fragment>
  );
};

export default Home;
