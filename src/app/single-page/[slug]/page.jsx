/**
 * Title: Home
 * Description: Description of the component
 * Author: Kaji Hasibur Rahman
 * Date: 2025-01-03
 */
import * as React from "react";
import { Fragment } from "react";
import PublicLayout from "@/_components/layouts";
import ProductDetailsInfo from "../components/details";

const ProductDetails = async ({ params }) => {
  const slug = params.slug;
  
  return (
    <Fragment>
      <PublicLayout>
        <ProductDetailsInfo slug={slug} />
      </PublicLayout>
    </Fragment>
  );
};

export default ProductDetails;
