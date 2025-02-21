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
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);

  return (
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

      {/* Thumbnails */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={20}
        slidesPerView={5}
        watchSlidesProgress
        className="thumbnails-slider mt-4"
      >
        {items.map((item, index) => (
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
  );
};

export default SliderBlock;
