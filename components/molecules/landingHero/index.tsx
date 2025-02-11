"use client";

import {
  AccessIcon,
  CategoryIcon,
  EditIcon,
  MouseIcon,
  VersioningIcon,
} from "@components/atoms/landingSvg/landingSvg";

import BubbleItems from "./bubbleItems";
import Image from "next/image";
import LandingHeder from "../landingHeder";
import React from "react";
import { TypeAnimation } from "react-type-animation";

const LandingHero = () => {
  return (
    <section className="landing-hero min-h-[600px] relative">
      <LandingHeder />
      <div className="container max-w-[1220px]">
        <div className="flex flex-col relative">
          <h1 className="landing-hero__title text-4xl leading-[60px] xs:text-[clamp(40px,3.329vw,48px)] text-center w-full font-bold mt-[18.5vh]">
            <strong className="text-primary text-5xl xs:text-[clamp(56px,4.438vw,64px)] ml-2">
              کلاسور
            </strong>
            <span className="px-5 mx-1 inline-block">
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "سیستم مدیریت اسناد",
                  8000, // wait 1s before replacing "Mice" with "Hamsters"
                  "",
                  3000,
                  "سیستم دسته بندی اسناد",
                  8000,
                  "سیستم اشتراک گذاری اسناد",
                  8000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
                cursor
              />
            </span>
          </h1>

          <h2 className="text-landing-text-color text-xl xs:text-2xl text-center font-normal mt-6 leading-9 xs:leading-[48px]">
            امکانی برای مدیریت اسناد بر بستر مرورگر
            <span className="block text-opacity-80 text-sm xs:text-base leading-[48px]">
              بدون نیاز به پلتفرم یا نرم‌افزار
            </span>
          </h2>
          <BubbleItems className="top-[6vh] absolute hover:pause">
            <div className="landing-hero__card w-[150px] h-[150px] group hidden lg:block z-10">
              <Image
                src="/hero/versioning.svg"
                layout="fill"
                alt="versioning"
              />
              <h6 className="landing-hero__card-title bottom-[14px] -left-16">
                <VersioningIcon />
                نسخه‌گذاری
              </h6>
              <p className="landing-hero__card-description">
                می‌توانید به تعداد دلخواه برای هر سند نسخه بسازید و اون رو توسعه
                بدین
              </p>
            </div>
          </BubbleItems>

          <BubbleItems className="top-[6vh] absolute lg:top-[46vh] md:top-[49vh] md:right-6 lg:right-36 hover:pause">
            <div className="landing-hero__card w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] group hidden md:block">
              <Image src="/hero/editor.svg" layout="fill" alt="editor" />
              <h6 className="landing-hero__card-title bottom-[14px] -left-[100px]">
                <EditIcon />
                ویرایشگرهای متنوع
              </h6>
              <p className="landing-hero__card-description">
                می‌توانید برای ساخت محتوی خود، از ویرایشگر‌های حرفه‌ای کلاسور،
                وورد فلوچارت،اکسل،bord استفاده کنید.
              </p>
            </div>
          </BubbleItems>
          <BubbleItems className="absolute lg:top-[46vh] md:top-[49vh] md:left-6 lg:left-36 hover:pause">
            <div className="landing-hero__card w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] group hidden md:block">
              <Image
                src="/hero/user-access.svg"
                layout="fill"
                alt="user access"
              />
              <h6 className="landing-hero__card-title bottom-[14px] -right-[100px]">
                <AccessIcon />
                سطوح دسترسی کاربران
              </h6>
              <p className="landing-hero__card-description left-description">
                می‌توانید افرادی که می‌خواهید را با سطوح دسترسی مختلف به مخزن
                اضافه کرده و یا مستقیماً این سطوح دسترسی را روی دسته‌بندی‌ها یا
                سند‌ها، اعمال کنید.
              </p>
            </div>
          </BubbleItems>
          <BubbleItems className="absolute lg:top-[10.5vh] md:left-2/4 md:-translate-x-2/4 lg:left-5 lg:-translate-x-0 md:top-0 hover:pause">
            <div className="landing-hero__card w-[130px] h-[130px] group hidden md:block">
              <Image src="/hero/category.svg" layout="fill" alt="category" />
              <h6 className="landing-hero__card-title bottom-[14px] -right-[70px]">
                <CategoryIcon className="w-6 h-[25px]" />
                دسته‌ بندی
              </h6>
              <p className="landing-hero__card-description left-description">
                برای مرتب‌سازی اسناد خود در مخزن، اقدام به ساخت دسته‌بندی و آن
                را مدیریت کنید.
              </p>
            </div>
          </BubbleItems>
        </div>
      </div>
      <a
        className="arrows-link cursor-pointer"
        onClick={() => {
          const target = document.querySelector("#clasor-attributes");
          target?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        role="link"
        tabIndex={0}
      >
        <MouseIcon />
      </a>
    </section>
  );
};

export default LandingHero;
