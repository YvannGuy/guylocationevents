"use client";

import React from "react";
import Grid from "@mui/material/Grid2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const SliderBlock = ({ items }) => {
  return (
    <Grid className="block-gallery">
      <Swiper
        modules={[Pagination, Thumbs]}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        className="images-slider"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="full-image">
            <img
              src={item.fullImage}
              alt={`Slide ${index + 1}`}
              className="w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};

export default SliderBlock;
