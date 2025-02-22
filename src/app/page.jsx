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
      image: "/images/c-1.png",
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
      image: "/images/c-2.png",
      slug: "/pack-essentiel",
      alt: t(
        "50-100 Personnes, Un son plus puissant pour des événements de taille moyenne !"
      ),
      title: t(
        "50-100 Personnes, Un son plus puissant pour des événements de taille moyenne !"
      ),
      tag: t("PACK ESSENTIEL"),
    },
    {
      image: "/images/c-3.png",
      slug: "/pack-confort",
      alt: t(
        "80-150 personnes, L’équilibre parfait entre puissance et qualité !t pour des événements de taille moyenne !"
      ),
      title: t(
        "80-150 personnes, L’équilibre parfait entre puissance et qualité !t pour des événements de taille moyenne !"
      ),
      tag: t("PACK CONFORT"),
    },
    {
      image: "/images/c-3.png",
      slug: "/pack-premium",
      alt: t(
        "120-200 personnes, Des basses profondes et une clarté sonore professionnelle les petites soirées privées, anniversaires ou réunions professionnelles"
      ),
      title: t(
        "120-200 personnes, Des basses profondes et une clarté sonore professionnelle les petites soirées privées, anniversaires ou réunions professionnelles"
      ),
      tag: t("PACK PREMIUM"),
    },
    {
      image: "/images/c-3.png",
      slug: "/pack-prestige",
      alt: t(
        "200-300 personnes, L’expérience sonore ultime pour vos événements prestigieux anniversaires ou réunions professionnelles"
      ),
      title: t(
        "200-300 personnes, L’expérience sonore ultime pour vos événements prestigieux anniversaires ou réunions professionnelles"
      ),
      tag: t("PACK PRESTIGE"),
    },
    {
      image: "/images/c-3.png",
      slug: "/pack-grand-event",
      alt: t(
        "80-150 personnes, L’équilibre parfait  entre puissance et qualité !t  pour des événements de taille moyenne !"
      ),
      title: t(
        "80-150 personnes, L’équilibre parfait  entre puissance et qualité !t  pour des événements de taille moyenne !"
      ),
      tag: t("PACK GRAND EVENT"),
    },
  ];
  const slides = [
    {
      backgroundImage: "/images/hero-bg1.jpg",
      subtitle: t("Louez facilement, profitez pleinement"),
      titleHighlight: t("Tout ce dont vous avez besoin"),
      title: t("pour vos événements en quelques clics !"),
    },
  ];

  const faqData = [
    {
      id: 1,
      question: t("Comment choisir l’équipement qui convient à mon événement"),
      answer: t(
        "Nous proposons une assurance en option pour couvrir d’éventuels dommages. Contactez-nous pour en savoir plus."
      ),
    },
    {
      id: 2,
      question: t("Dois-je verser une caution pour la location"),
      answer: t(
        "Nous proposons une assurance en option pour couvrir d’éventuels dommages. Contactez-nous pour en savoir plus."
      ),
    },
    {
      id: 3,
      question: t("Proposez-vous un service de livraison?"),
      answer: t(
        "Nous proposons une assurance en option pour couvrir d’éventuels dommages. Contactez-nous pour en savoir plus."
      ),
    },
    {
      id: 3,
      question: t("Si je rencontre un problème technique avec le matériel?"),
      answer: t(
        "Nous proposons une assurance en option pour couvrir d’éventuels dommages. Contactez-nous pour en savoir plus."
      ),
    },
    {
      id: 3,
      question: t("Quels sont les modes de paiement acceptés?"),
      answer: t(
        "Nous proposons une assurance en option pour couvrir d’éventuels dommages. Contactez-nous pour en savoir plus."
      ),
    },
    {
      id: 3,
      question: t(
        "Dois-je vérifier le matériel au moment du retrait ou de la livraison?"
      ),
      answer: t(
        "Nous proposons une assurance en option pour couvrir d’éventuels dommages. Contactez-nous pour en savoir plus."
      ),
    },
    {
      id: 3,
      question: t("Le matériel est-il assuré en cas de dommage?"),
      answer: t(
        "Nous proposons une assurance en option pour couvrir d’éventuels dommages. Contactez-nous pour en savoir plus."
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
