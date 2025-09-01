"use client";
import PublicLayout from "@/_components/layouts";
import ProductDetailsInfo from "../components/details";
import { Fragment } from "react";
import { useTranslations } from "next-intl";

const PackPremium11Page = () => {
  const t = useTranslations();

  return (
    <Fragment>
      <PublicLayout>
        <ProductDetailsInfo slug="pack-premium-11" />
      </PublicLayout>
    </Fragment>
  );
};

export default PackPremium11Page;
