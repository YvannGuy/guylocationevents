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
import Link from "next/link";
import EastIcon from "@mui/icons-material/East";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SliderBlock from "@/_components/single-page/product-gallary";
import Image from "next/image";
import { useTranslations } from "next-intl";

const items = [
  {
    fullImage: "/images/slider/image1.webp",
    thumbnail: "/images/slider/image1.webp",
  },
  {
    fullImage: "/images/slider/image2.webp",
    thumbnail: "/images/slider/image2.webp",
  },
  {
    fullImage: "/images/slider/image3.webp",
    thumbnail: "/images/slider/image3.webp",
  },
  {
    fullImage: "/images/slider/image4.webp",
    thumbnail: "/images/slider/image4.webp",
  },
  {
    fullImage: "/images/slider/image5.webp",
    thumbnail: "/images/slider/image5.webp",
  },
  {
    fullImage: "/images/slider/image6.webp",
    thumbnail: "/images/slider/image6.webp",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProductDetails = (props) => {
  const t = useTranslations();
  const packages = [
    {
      image: "/images/c-1.png",
      slug: "/pack-standard",
      title: "",
      tag: t("PACK STANDARD"),
    },
    {
      image: "/images/c-2.png",
      slug: "/pack-essentiel",
      title: t(
        "50-100 Personnes, Un son plus puissant pour des événements de taille moyenne"
      ),
      tag: t("PACK ESSENTIEL"),
    },
    {
      image: "/images/c-3.png",
      slug: "/pack-confort",
      title: t(
        "80-150 personnes L’équilibre parfait entre puissance et qualité !t pour des événements de taille moyenne"
      ),
      tag: t("PACK CONFORT"),
    },
    {
      image: "/images/c-3.png",
      slug: "/pack-premium",
      title: t(
        "120-200 personnes, Des basses profondes et une clarté sonore professionnelle les petites soirées privées, anniversaires ou réunions professionnelles"
      ),
      tag: t("PACK PREMIUM"),
    },
    {
      image: "/images/c-3.png",
      slug: "/pack-prestige",
      title: t(
        "200-300 personnes, L’expérience sonore ultime pour vos événements prestigieux anniversaires ou réunions professionnelles"
      ),
      tag: t("PACK PRESTIGE"),
    },
    {
      image: "/images/c-3.png",
      slug: "/pack-grand-event",
      title: t(
        "80-150 personnes, L’équilibre parfait  entre puissance et qualité !t  pour des événements de taille moyenne"
      ),
      tag: t("PACK GRAND EVENT"),
    },
  ];
  const rows = [
    { name: t("Weight"), value: "5710kg" },
    { name: t("Rated power"), value: "36.9kW / 2200rpm" },
    { name: t("Standard bucket capacity"), value: "0.2m³" },
    { name: t("Standard bucket width"), value: "775mm" },
    { name: t("Operation Hydraulic Pressure"), value: "24.5Mpa" },
    { name: t("Maximum Digging Force"), value: "37.4kN" },
    { name: t("Gradeability"), value: "30°" },
    { name: t("Pressure To The Ground"), value: "31.4kPa" },
    { name: t("Walking Speed"), value: "2.8 / 4.7 km/h" },
    { name: t("Maximum Hauling Force"), value: "44kN" },
  ];
  const packageData =
    props.params?.slug !== "pack-vido"
      ? packages.find((item) => item.slug == `/${props.params?.slug}`)
      : {
          image: "/images/c-1.png",
          slug: "/pack-vido",
          title: t(
            "Plongez votre audience dans une expérience visuelle exceptionnelle"
          ),
          tag: t("PACK VIDÉO"),
        };
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
                <h1 className="title">{packageData.tag}</h1>
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
          <section className="product-details">
            <Grid className="container">
              <Grid className="row">
                <Grid className="col-lg-8">
                  {/* product image */}
                  <SliderBlock items={items} />
                  {/* product image */}
                  <Grid className="product-content">
                    <h2 className="name">{packageData.title}</h2>
                    <Grid className="description-box">
                      <h3 className="common-title">
                        {t("Description")}
                        <span className="border border-short"></span>
                        <span className="border border-long"></span>
                        <span className="border border-middle"></span>
                      </h3>
                      <h4>
                        {t("Best Yanmar powered hydraulic excavator for rent")}.
                      </h4>
                      <p>
                        {t(
                          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore mque laud antium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto be atae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores"
                        )}
                      </p>
                      <p>
                        {t(
                          "Eos qui ratione voluptatem sequi nesciunt Neque porro  es qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi"
                        )}
                      </p>

                      <ul className="product-key-points">
                        <li>{t("Nostrud exercitation ullamco laboris")}</li>
                        <li>
                          {t("Ut aliquip ex ea reprehenderitin voluptate")}
                        </li>
                        <li>
                          {t("Adipisicing elit sed eiusmod tempor incididunt")}
                        </li>
                        <li>
                          {t("Labore dolore magna aliqua veniam nostrud")}
                        </li>
                      </ul>
                    </Grid>
                    <Grid className="specification-box">
                      <h3 className="common-title">
                        {t("Specification")}
                        <span className="border border-short"></span>
                        <span className="border border-long"></span>
                        <span className="border border-middle"></span>
                      </h3>

                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 400 }}
                          aria-label="customized table"
                        >
                          <TableBody>
                            {rows.map((row, index) => (
                              <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                  {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  {row.value}
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className="col-lg-4">
                  <Grid className="price-tag">
                    <h5>
                      <span className="border border-short"></span>
                      <span className="border border-long"></span>
                      $250.00
                      <span className="border border-short-right"></span>
                      <span className="border border-long-right"></span>
                    </h5>
                    <p>{t("Per Day")}</p>
                  </Grid>
                  <Grid className="book-btn">
                    <Link href="/reservation" className="view-more-btn">
                      {t("Book Now")}
                      <EastIcon />
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </section>
          {/* Product details START END */}
          <CtaShort />
        </div>
      </PublicLayout>
    </Fragment>
  );
};

export default ProductDetails;
