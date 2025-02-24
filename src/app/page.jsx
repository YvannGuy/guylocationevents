/**
 * Title: Home
 * Description: Description of the component
 * Author: Kaji Hasibur Rahman
 * Date: 2025-01-03
 */

import Grid from "@mui/material/Grid2";
import PublicLayout from "@/_components/layouts";
import CatalogList from "@/_components/home/catelog-llist";
import { Fragment } from "react";
import CommonHero from "@/_components/home/hero";
import Image from "next/image";
import AccordionContent from "@/_components/home/faq";
import CallToAction from "@/_components/home/cta";
import ContactInfo from "@/_components/home/contact-info";
import { packages } from "@/_utils/packages";
const slides = [
  {
    backgroundImage: "/images/hero-bg1.jpg",
    subtitle: "Louez facilement, profitez pleinement !",
    titleHighlight: "Tout ce dont vous avez besoin",
    title: "pour vos événements en quelques clics !",
  },
  // {
  //   backgroundImage: "/images/hero-bg1.jpg",
  //   subtitle: "Louez facilement, profitez pleinement !",
  //   titleHighlight: "Tout ce dont vous avez besoin",
  //   title: "pour vos événements en quelques clics !",
  // },
  // {
  //   backgroundImage: "/images/hero-bg1.jpg",
  //   subtitle: "Louez facilement, profitez pleinement !",
  //   titleHighlight: "Tout ce dont vous avez besoin",
  //   title: "pour vos événements en quelques clics !",
  // },
];

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
const Home = async () => {
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
                <p>Des étapes simplifiées pour vos locations</p>
                <h2>NOTRE PROCESS</h2>
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
                  <h3>Remplissez le formulaire de réservation</h3>
                </Grid>
                <Grid className="single-process">
                  <Image
                    src="/images/step-2.png"
                    width="280"
                    height="265"
                    alt=""
                  />
                  <h3>Validez la caution et le paiement du pack choisi</h3>
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
                    Récupérez votre matériel <br /> (livraison ou retrait)
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
