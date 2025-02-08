"use client";

import "swiper/css";
import "swiper/css/pagination";

import { StacksIcon, UrgencyIcon, UsersIcon } from "@components/atoms/landingSvg/landingSvg";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper/modules";
import React from "react";

const Advantages = () => {
  return (
    <section className="landing-advantages bg-white">
      <div className="container max-w-[1108px] py-[70px]">
        <h2 className="section-title">مزایای استفاده از کلاسور</h2>

        <Swiper
          className="advantages-slider"
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={3}
          pagination={{
            el: ".advantages-slider__pagination",
            clickable: true,
          }}
          breakpoints={{
            // when window width is >= 280px
            280: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 2,
            },
            // when window width is >= 834px
            834: {
              slidesPerView: 3,
            },
          }}
        >
          <SwiperSlide>
            <div className="advantages-item">
              <UsersIcon />
              <h4 className="advantages-item__title">دسترسی آسان</h4>
              <p className="advantages-item__desc">
                صرف‌نظر از اینکه از چه پلتفرمی استفاده می‌کنید می‌توانید تنها با
                استفاده از مرورگر به پنل و سرویس‌های کلاسور دسترسی داشته باشید.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="advantages-item">
              <UrgencyIcon />
              <h4 className="advantages-item__title">پشتیبانی شبانه روزی</h4>
              <p className="advantages-item__desc">
                در صورت داشتن سوال یا بروز مشکل در هر زمانی می‌توانید با
                پشتیبانی کلاسور در ارتباط باشید.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="advantages-item">
              <StacksIcon />
              <h4 className="advantages-item__title">
                پشتیبانی از فرمت‌های رایج
              </h4>
              <p className="advantages-item__desc">
                کلاسور از فرمت‌های رایج مدیریت محتوا شامل File، word،‌ HTML،
                Excel, Flowchart … پشتیبانی می‌کند.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="advantages-slider__pagination" />
      </div>
    </section>
  );
};

export default Advantages;
