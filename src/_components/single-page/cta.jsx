"use client";
import * as React from "react";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const CtaShort = () => {
  const t = useTranslations();

  return (
    <section className="cta-area">
      <Grid className="container">
        <Grid className="row">
          <Grid className="col-lg-7">
            <h2>{t("UNE QUESTION SUR NOS CONDITIONS DE LOCATION")}? </h2>
          </Grid>
          <Grid className="col-lg-5">
            <Link href="/condition-location" className="view-more-btn">
              {t("C’EST PAR ICI")}
              <Image
                src="/images/double-arrow.png"
                width="40"
                height="20"
                alt="arrow icon"
              />
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
};
export default CtaShort;
