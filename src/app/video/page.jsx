/**
 * Title: Home
 * Description: Description of the component
 * Author: Kaji Hasibur Rahman
 * Date: 2025-01-03
 */

import PublicLayout from "@/_components/layouts";
import CatalogList from "@/_components/home/catelog-llist";
import { Fragment } from "react";
import Grid from "@mui/material/Grid2";
import Image from "next/image";

const CatalogPage = async () => {
  const cards = [
    {
      image: "/images/c-1.png",
      link: "/single-page",
      alt: "Instrument de base pour petits évènements",
      title:
        "Plongez votre audience dans une expérience visuelle exceptionnelle",
      tag: "PACK VIDÉO",
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
              <h1 className="title">Vidéo</h1>
              <div className="title-image">
                <Image
                  src="/images/title-border.png"
                  width="130"
                  height="16"
                  alt="border"
                />
              </div>
              <p className="subtitle">
                Offrez une expérience visuelle immersive avec nos
                vidéoprojecteurs et écrans sur trépied ! Parfait pour vos
                conférences, mariages, soirées cinéma ou présentations
                professionnelles
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
        <CatalogList cards={cards} />
      </PublicLayout>
    </Fragment>
  );
};

export default CatalogPage;
