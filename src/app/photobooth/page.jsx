/**
 * Title: Home
 * Description: Description of the component
 * Author: Kaji Hasibur Rahman
 * Date: 2025-01-03
 */
"use client";
import * as React from "react";
import Grid from "@mui/material/Grid2";
import PublicLayout from "@/_components/layouts";
import { Fragment } from "react";
import CtaShort from "@/_components/single-page/cta";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CatalogList from "@/_components/home/catelog-llist";

const ProductDetails = () => {
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
        "50-100 Personnes Idéal pour des séminaires petits concerts ou fêtes privé"
      ),
      title: t(
        "50-100 Personnes Idéal pour des séminaires petits concerts ou fêtes privé"
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
  ];
  return (
    <Fragment>
      <PublicLayout>
        <div className="single-page">
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
                <h1 className="title">{t("Photobooth")}</h1>
                <div className="title-image">
                  <Image
                    src="/images/title-border.png"
                    width="130"
                    height="16"
                    alt="border"
                  />
                </div>
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

          <CtaShort />
        </div>
      </PublicLayout>
    </Fragment>
  );
};

export default ProductDetails;
