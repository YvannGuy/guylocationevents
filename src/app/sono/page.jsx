/**
 * Title: Home
 * Description: Description of the component
 * Author: Kaji Hasibur Rahman
 * Date: 2025-01-03
 */
"use client";
import PublicLayout from "@/_components/layouts";
import CatalogList from "@/_components/home/catelog-llist";
import { Fragment } from "react";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { useTranslations } from "next-intl";
const CatalogPage = () => {
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
        "50-100 Personnes, Un son plus puissant pour des événements de taille moyenne"
      ),
      title: t(
        "50-100 Personnes, Un son plus puissant pour des événements de taille moyenne"
      ),
      tag: t("PACK ESSENTIEL"),
    },
    {
      image: "/images/c-3.png",
      slug: "/pack-confort",
      alt: t(
        "80-150 personnes L’équilibre parfait entre puissance et qualité !t pour des événements de taille moyenne"
      ),
      title: t(
        "80-150 personnes L’équilibre parfait entre puissance et qualité !t pour des événements de taille moyenne"
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
        "80-150 personnes, L’équilibre parfait  entre puissance et qualité !t  pour des événements de taille moyenne"
      ),
      title: t(
        "80-150 personnes, L’équilibre parfait  entre puissance et qualité !t  pour des événements de taille moyenne"
      ),
      tag: t("PACK GRAND EVENT"),
    },
  ];
  return (
    <Fragment>
      <PublicLayout>
        <Grid
          className="breadcumb-area"
          style={{
            backgroundImage: `url(/images/catalog-bg.png)`,
            backgroundRepeate: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <Grid
            className="gradient-overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "#000000",
              opacity: "0.8",
              zIndex: "-1",
            }}
          />
          <div className="container">
            <div className="hero-content-wrap">
              <h1 className="title">{t("Sono")}</h1>
              <div className="title-image">
                <Image
                  src="/images/title-border.png"
                  width="130"
                  height="16"
                  alt="border"
                />
              </div>
              <p className="subtitle">
                {t(
                  "Découvrez nos packs d’enceintes adaptés à tous vos besoins Que ce soit pour une petite réunion un mariage grandiose ou un concert en plein air nous avons la solution idéale Profitez d’un son puissant et clair avec des équipements de qualité professionnelle"
                )}
              </p>
            </div>
          </div>
          <Grid className="bottom-shape">
            <Image
              src="/images/hero-bottom-bar.png"
              width="300"
              height="28"
              alt="shape"
            />
          </Grid>
        </Grid>
        <CatalogList cards={packages} />
      </PublicLayout>
    </Fragment>
  );
};

export default CatalogPage;
