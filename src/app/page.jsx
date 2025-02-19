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
