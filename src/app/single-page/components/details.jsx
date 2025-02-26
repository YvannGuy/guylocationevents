/**
 * Title: Home
 * Description: Description of the component
 * Author: Kaji Hasibur Rahman
 * Date: 2025-01-03
 */
"use client";
import * as React from "react";
import Grid from "@mui/material/Grid2";
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
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

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

const ProductDetailsInfo = (props) => {
  const t = useTranslations();
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);

  const packages = [
    {
      image: "/images/packstandard1.jpg",
      slug: "/pack-standard",
      title: t(
        "50-100 Personnes, Un son plus puissant pour des événements de taille moyenne"
      ),
      tag: t("PACK STANDARD"),
      specifications: [
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
      ],
      price: "250.00",
      unite: t("Per Day"),
      description: t(
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore mque laud antium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto be atae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores"
      ),
      description2: t(
        "Eos qui ratione voluptatem sequi nesciunt Neque porro  es qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi"
      ),
      subtitle: t("Best Yanmar powered hydraulic excavator for rent"),
      informations: [
        t("Nostrud exercitation ullamco laboris"),
        t("Ut aliquip ex ea reprehenderitin voluptate"),
        t("Adipisicing elit sed eiusmod tempor incididunt"),
        t("Labore dolore magna aliqua veniam nostrud"),
      ],
      images: [
        {
          fullImage: "/images/packstandard1.jpg",
          thumbnail: "/images/packstandard1.jpg",
        },
        {
          fullImage: "/images/packessentiel.jpg",
          thumbnail: "/images/packessentiel.jpg",
        },
        {
          fullImage: "/images/packgrandevent.jpg",
          thumbnail: "/images/packgrandevent.jpg",
        },
        {
          fullImage: "/images/packpremium.jpg",
          thumbnail: "/images/packpremium.jpg",
        },
        {
          fullImage: "/images/packprestige.jpg",
          thumbnail: "/images/packprestige.jpg",
        },
        {
          fullImage: "/images/packvideo.jpg",
          thumbnail: "/images/packvideo.jpg",
        },
      ],
    },
    {
      image: "/images/packessentiel.jpg",
      slug: "/pack-essentiel",
      title: t(
        "50-100 Personnes, Un son plus puissant pour des événements de taille moyenne"
      ),
      tag: t("PACK ESSENTIEL"),
      specifications: [
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
      ],
      price: "250.00",
      unite: t("Per Day"),
      description: t(
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore mque laud antium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto be atae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores"
      ),
      description2: t(
        "Eos qui ratione voluptatem sequi nesciunt Neque porro  es qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi"
      ),
      subtitle: t("Best Yanmar powered hydraulic excavator for rent"),
      informations: [
        t("Nostrud exercitation ullamco laboris"),
        t("Ut aliquip ex ea reprehenderitin voluptate"),
        t("Adipisicing elit sed eiusmod tempor incididunt"),
        t("Labore dolore magna aliqua veniam nostrud"),
      ],
      images: [
        {
          fullImage: "/images/packstandard1.jpg",
          thumbnail: "/images/packstandard1.jpg",
        },
        {
          fullImage: "/images/packessentiel.jpg",
          thumbnail: "/images/packessentiel.jpg",
        },
        {
          fullImage: "/images/packgrandevent.jpg",
          thumbnail: "/images/packgrandevent.jpg",
        },
        {
          fullImage: "/images/packpremium.jpg",
          thumbnail: "/images/packpremium.jpg",
        },
        {
          fullImage: "/images/packprestige.jpg",
          thumbnail: "/images/packprestige.jpg",
        },
        {
          fullImage: "/images/packvideo.jpg",
          thumbnail: "/images/packvideo.jpg",
        },
      ],
    },
    {
      image: "/images/packconfort.jpg",
      slug: "/pack-confort",
      title: t(
        "100-150 personnes L’équilibre parfait entre puissance et qualité pour des événements de taille moyenne"
      ),
      tag: t("PACK CONFORT"),
      specifications: [
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
      ],
      price: "250.00",
      unite: t("Per Day"),
      description: t(
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore mque laud antium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto be atae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores"
      ),
      description2: t(
        "Eos qui ratione voluptatem sequi nesciunt Neque porro  es qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi"
      ),
      subtitle: t("Best Yanmar powered hydraulic excavator for rent"),
      informations: [
        t("Nostrud exercitation ullamco laboris"),
        t("Ut aliquip ex ea reprehenderitin voluptate"),
        t("Adipisicing elit sed eiusmod tempor incididunt"),
        t("Labore dolore magna aliqua veniam nostrud"),
      ],
      images: [
        {
          fullImage: "/images/packstandard1.jpg",
          thumbnail: "/images/packstandard1.jpg",
        },
        {
          fullImage: "/images/packessentiel.jpg",
          thumbnail: "/images/packessentiel.jpg",
        },
        {
          fullImage: "/images/packgrandevent.jpg",
          thumbnail: "/images/packgrandevent.jpg",
        },
        {
          fullImage: "/images/packpremium.jpg",
          thumbnail: "/images/packpremium.jpg",
        },
        {
          fullImage: "/images/packprestige.jpg",
          thumbnail: "/images/packprestige.jpg",
        },
        {
          fullImage: "/images/packvideo.jpg",
          thumbnail: "/images/packvideo.jpg",
        },
      ],
    },
    {
      image: "/public/images/packpremium.jpg",
      slug: "/pack-premium",
      title: t(
        "150-200 personnes, Des basses profondes et une clarté sonore professionnelle les petites soirées privées, anniversaires ou réunions professionnelles"
      ),
      tag: t("PACK PREMIUM"),
      specifications: [
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
      ],
      price: "250.00",
      unite: t("Per Day"),
      description: t(
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore mque laud antium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto be atae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores"
      ),
      description2: t(
        "Eos qui ratione voluptatem sequi nesciunt Neque porro  es qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi"
      ),
      subtitle: t("Best Yanmar powered hydraulic excavator for rent"),
      informations: [
        t("Nostrud exercitation ullamco laboris"),
        t("Ut aliquip ex ea reprehenderitin voluptate"),
        t("Adipisicing elit sed eiusmod tempor incididunt"),
        t("Labore dolore magna aliqua veniam nostrud"),
      ],
      images: [
        {
          fullImage: "/images/packstandard1.jpg",
          thumbnail: "/images/packstandard1.jpg",
        },
        {
          fullImage: "/images/packessentiel.jpg",
          thumbnail: "/images/packessentiel.jpg",
        },
        {
          fullImage: "/images/packgrandevent.jpg",
          thumbnail: "/images/packgrandevent.jpg",
        },
        {
          fullImage: "/images/packpremium.jpg",
          thumbnail: "/images/packpremium.jpg",
        },
        {
          fullImage: "/images/packprestige.jpg",
          thumbnail: "/images/packprestige.jpg",
        },
        {
          fullImage: "/images/packvideo.jpg",
          thumbnail: "/images/packvideo.jpg",
        },
      ],
    },
    {
      image: "/images/packprestige.jpg",
      slug: "/pack-prestige",
      title: t(
        "200-250 personnes, L’expérience sonore ultime pour vos événements prestigieux anniversaires ou réunions professionnelles"
      ),
      tag: t("PACK PRESTIGE"),
      specifications: [
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
      ],
      price: "250.00",
      unite: t("Per Day"),
      description: t(
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore mque laud antium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto be atae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores"
      ),
      description2: t(
        "Eos qui ratione voluptatem sequi nesciunt Neque porro  es qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi"
      ),
      subtitle: t("Best Yanmar powered hydraulic excavator for rent"),
      informations: [
        t("Nostrud exercitation ullamco laboris"),
        t("Ut aliquip ex ea reprehenderitin voluptate"),
        t("Adipisicing elit sed eiusmod tempor incididunt"),
        t("Labore dolore magna aliqua veniam nostrud"),
      ],
      images: [
        {
          fullImage: "/images/packstandard1.jpg",
          thumbnail: "/images/packstandard1.jpg",
        },
        {
          fullImage: "/images/packessentiel.jpg",
          thumbnail: "/images/packessentiel.jpg",
        },
        {
          fullImage: "/images/packgrandevent.jpg",
          thumbnail: "/images/packgrandevent.jpg",
        },
        {
          fullImage: "/images/packpremium.jpg",
          thumbnail: "/images/packpremium.jpg",
        },
        {
          fullImage: "/images/packprestige.jpg",
          thumbnail: "/images/packprestige.jpg",
        },
        {
          fullImage: "/images/packvideo.jpg",
          thumbnail: "/images/packvideo.jpg",
        },
      ],
    },
    {
      image: "/images/packgrandevent.jpg",
      slug: "/pack-grand-event",
      title: t(
        "250-250 personnes L’équilibre parfait  entre puissance et qualité pour des événements de taille moyenne"
      ),
      tag: t("PACK GRAND EVENT"),
      specifications: [
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
      ],
      price: "250.00",
      unite: t("Per Day"),
      description: t(
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore mque laud antium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto be atae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores"
      ),
      description2: t(
        "Eos qui ratione voluptatem sequi nesciunt Neque porro  es qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi"
      ),
      subtitle: t("Best Yanmar powered hydraulic excavator for rent"),
      informations: [
        t("Nostrud exercitation ullamco laboris"),
        t("Ut aliquip ex ea reprehenderitin voluptate"),
        t("Adipisicing elit sed eiusmod tempor incididunt"),
        t("Labore dolore magna aliqua veniam nostrud"),
      ],
      images: [
        {
          fullImage: "/images/packstandard1.jpg",
          thumbnail: "/images/packstandard1.jpg",
        },
        {
          fullImage: "/images/packessentiel.jpg",
          thumbnail: "/images/packessentiel.jpg",
        },
        {
          fullImage: "/images/packgrandevent.jpg",
          thumbnail: "/images/packgrandevent.jpg",
        },
        {
          fullImage: "/images/packpremium.jpg",
          thumbnail: "/images/packpremium.jpg",
        },
        {
          fullImage: "/images/packprestige.jpg",
          thumbnail: "/images/packprestige.jpg",
        },
        {
          fullImage: "/images/packvideo.jpg",
          thumbnail: "/images/packvideo.jpg",
        },
      ],
    },
  ];

  const packageData =
    props?.slug !== "pack-vido"
      ? packages.find((item) => item.slug == `/${props?.slug}`)
      : {
          image: "/images/packvideo.jpg",
          slug: "/pack-vido",
          title: t(
            "Plongez votre audience dans une expérience visuelle exceptionnelle"
          ),
          tag: t("PACK VIDÉO"),
          specifications: [
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
          ],
          price: "250.00",
          unite: t("Per Day"),
          description: t(
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore mque laud antium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto be atae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores"
          ),
          description2: t(
            "Eos qui ratione voluptatem sequi nesciunt Neque porro  es qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi"
          ),
          subtitle: t("Best Yanmar powered hydraulic excavator for rent"),
          informations: [
            t("Nostrud exercitation ullamco laboris"),
            t("Ut aliquip ex ea reprehenderitin voluptate"),
            t("Adipisicing elit sed eiusmod tempor incididunt"),
            t("Labore dolore magna aliqua veniam nostrud"),
          ],
          images: [
            {
              fullImage: "/images/packstandard1.jpg",
              thumbnail: "/images/packstandard1.jpg",
            },
            {
              fullImage: "/images/packessentiel.jpg",
              thumbnail: "/images/packessentiel.jpg",
            },
            {
              fullImage: "/images/packgrandevent.jpg",
              thumbnail: "/images/packgrandevent.jpg",
            },
            {
              fullImage: "/images/packpremium.jpg",
              thumbnail: "/images/packpremium.jpg",
            },
            {
              fullImage: "/images/packprestige.jpg",
              thumbnail: "/images/packprestige.jpg",
            },
            {
              fullImage: "/images/packvideo.jpg",
              thumbnail: "/images/packvideo.jpg",
            },
          ],
        };
  return (
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
            <Grid className="col-lg-8 col-12">
              {/* product image */}
              <Grid className="block-gallery">
                {/* Main Slider */}
                <Swiper
                  modules={[Pagination, Thumbs]}
                  pagination={{ clickable: true }}
                  thumbs={{ swiper: thumbsSwiper }}
                  spaceBetween={10}
                  slidesPerView={1}
                  className="images-slider"
                >
                  {packageData.images?.map((item, index) => (
                    <SwiperSlide key={index} className="full-image">
                      <img
                        src={item.fullImage}
                        alt={`Slide ${index + 1}`}
                        className="w-full"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  modules={[Thumbs]}
                  onSwiper={setThumbsSwiper}
                  spaceBetween={20}
                  slidesPerView={5}
                  watchSlidesProgress
                  className="thumbnails-slider mt-4"
                >
                  {packageData.images?.map((item, index) => (
                    <SwiperSlide key={index} className="thumbnile-image">
                      <img
                        src={item.thumbnail}
                        alt={`Thumbnail ${index + 1}`}
                        className="cursor-pointer"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
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
                  <h4>{packageData.subtitle}</h4>
                  <p>{packageData.description}</p>
                  <p>{packageData.description2}</p>

                  <ul className="product-key-points">
                    {packageData.informations.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
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
                    <Table sx={{ minWidth: 400 }} aria-label="customized table">
                      <TableBody>
                        {packageData.specifications.map((row, index) => (
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
                  <span className="border border-long"></span>$
                  {packageData.price}
                  <span className="border border-short-right"></span>
                  <span className="border border-long-right"></span>
                </h5>
                <p>{packageData.unite}</p>
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
  );
};

export default ProductDetailsInfo;
