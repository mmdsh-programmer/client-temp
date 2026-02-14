"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

const LandingSupporters = () => {
  return (
    <section className="landing-supporters pt-12 pb-[82px] bg-white">
      <div className="container max-w-[1108px]">
        <h2 className="section-title-small text-center">
          پشتیبان‌های قدرتمند ما
        </h2>

        <Swiper
          className="customers-slider"
          modules={[Autoplay]}
          spaceBetween={48}
          slidesPerView={7}
          autoplay
          breakpoints={{
            // when window width is >= 280px
            280: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 3,
            },
            // when window width is >= 834px
            834: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          loop
        >
          <SwiperSlide>
            <div className="customers-slider__image-container">
              <Image
                layout="fill"
                src="/pasargad_logo.png"
                alt="pasargad"
                className="customers-slider__image"
              />

            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="customers-slider__image-container">
              <Image
                layout="fill"
                src="/fanap_logo.png"
                alt="fanap"
                className="customers-slider__image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="customers-slider__image-container">
              <Image
                layout="fill"
                src="/pod_logo.png"
                alt="pod"
                className="customers-slider__image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="customers-slider__image-container">
              <Image
                layout="fill"
                src="/dotin_logo.svg"
                alt="dotin"
                className="customers-slider__image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="customers-slider__image-container">
              <Image
                layout="fill"
                src="/pasargad_logo.png"
                alt="pasargad"
                className="customers-slider__image"
              />

            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="customers-slider__image-container">
              <Image
                layout="fill"
                src="/fanap_logo.png"
                alt="fanap"
                className="customers-slider__image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="customers-slider__image-container">
              <Image
                layout="fill"
                src="/pod_logo.png"
                alt="pod"
                className="customers-slider__image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="customers-slider__image-container">
              <Image
                layout="fill"
                src="/dotin_logo.svg"
                alt="dotin"
                className="customers-slider__image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="customers-slider__image-container">
              <Image
                layout="fill"
                src="/pasargad_logo.png"
                alt="pasargad"
                className="customers-slider__image"
              />

            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="customers-slider__image-container">
              <Image
                layout="fill"
                src="/fanap_logo.png"
                alt="fanap"
                className="customers-slider__image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="customers-slider__image-container">
              <Image
                layout="fill"
                src="/pod_logo.png"
                alt="pod"
                className="customers-slider__image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="customers-slider__image-container">
              <Image
                layout="fill"
                src="/dotin_logo.svg"
                alt="dotin"
                className="customers-slider__image"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default LandingSupporters;
