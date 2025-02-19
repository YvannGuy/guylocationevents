"use client";
import { Fragment, ReactNode } from "react";
import Header from "@/_components/layouts/header";
import Footer from "@/_components/layouts/footer";
import Grid from "@mui/material/Grid2";

const PublicLayout = ({ children }) => {
  return (
    <Fragment>
      <Grid className={"jj"}>
        <Header />
        {children}
        <Footer />
      </Grid>
    </Fragment>
  );
};

export default PublicLayout;
