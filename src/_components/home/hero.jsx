"use client";
import Grid from "@mui/material/Grid2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import BackgroundVideo from "next-video/background-video";
const CommonHero = ({ slides, isHigher }) => {
  return (
    <section className={`hero-area ${isHigher ? "higher" : "normal"}`}>
      <Grid container className="hero-wrapper">
        <Swiper
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <Grid
                container
                className="wrapper-content"
                style={{
                  position: "relative",
                }}
              >
                <BackgroundVideo src="/videos/hero.mp4?thumbnailTime=0">
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
                    }}
                  />
                  <Grid container className="hero-content">
                    <Grid container className="container">
                      <Grid item xs={12} md={12} className="text-main">
                        {slide.subtitle && (
                          <span className="tags">{slide.subtitle}</span>
                        )}
                        {slide.title && (
                          <h1>
                            {slide.titleHighlight && (
                              <span>{slide.titleHighlight} </span>
                            )}
                            <span className="main-title">{slide.title}</span>
                          </h1>
                        )}
                        {!isHigher && (
                          <div className="title-image">
                            <Image
                              src="/images/title-border.png"
                              width="130"
                              height="16"
                              alt="border"
                            />
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </BackgroundVideo>
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </section>
  );
};

export default CommonHero;
