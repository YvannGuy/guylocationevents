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
import { packages } from "@/_utils/packages";
const CatalogPage = async () => {
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
              <h1 className="title">Sono</h1>
              <div className="title-image">
                <Image
                  src="/images/title-border.png"
                  width="130"
                  height="16"
                  alt="border"
                />
              </div>
              <p className="subtitle">
                Découvrez nos packs d’enceintes adaptés à tous vos besoins ! Que
                ce soit pour une petite réunion, un mariage grandiose ou un
                concert en plein air, nous avons la solution idéale. Profitez
                d’un son puissant et clair avec des équipements de qualité
                professionnelle
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
