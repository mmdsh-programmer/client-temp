"use client";

import {
  AccessManagementIcon,
  CapabilitiesIcon,
  DocumentManagementIcon,
  EditorIcon,
  RepoManagementIcon,
} from "@components/atoms/landingSvg/landingSvg";
import Lottie, { Options } from "react-lottie";
import React, { useEffect, useRef } from "react";

import LandingAccessManagementContext from "../landingAccessManagementContext";
import LandingAdvancedFeaturesContext from "../landingAdvancedFeaturesContext";
import LandingDocManagementContext from "../landingDocManagementContext";
import LandingRepoManagementContext from "../landingRepoManagementContext";
import LandingVariousEditorsContext from "../landingVariousEditorsContext";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import accessManagement from "@dataJson/access-management.json";
import advanceFeatures from "@dataJson/advance-features.json";
import documentManagement from "@dataJson/document-management.json";
import gsap from "gsap";
import repoManagement from "@dataJson/repo-management.json";
import variousEditors from "@dataJson/various-editors.json";

export const featuresDefaultOptions: Options = {
  autoplay: true,
  loop: true,
  animationData: repoManagement,
};

gsap.registerPlugin(ScrollTrigger);

let timeOut: number = 0;
const DesktopAttributes = () => {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const removeSpecificClassName = (
    items: NodeListOf<Element>,
    className: string
  ) => {
    items.forEach((item) => {
      item.classList.remove(className);
    });
  };

  useEffect(() => {
    clearTimeout(timeOut);
    window.scrollTo({ top: 0, behavior: "smooth" });
    timeOut = window.setTimeout(() => {
      const navItems = (
        triggerRef.current as unknown as HTMLElement
      ).querySelectorAll(".clasor-attributes__list-item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-trigger",
          pin: true,
          scrub: 1,
          start: "top-=48 top",
          end: "+=2000", // Adjusted to fit five slides
          snap: 1 / 4, // Snap to each slide
          // markers: true,
        },
      });
      // Slides Scroll Animation
      Array.from({ length: 5 }, (_, i) => {
          const selector = `[data-slide='${i + 1}']`;
          const fromOffset = i * 0.1; // Set each slide to occupy 20% of the scroll area
          const finalOffset = (i + 1) * 0.1;
          return tl.fromTo(
            selector,
            {
              opacity: i + 1 === 1 ? 1 : 0,
              zIndex: 0,
              translateY: 100, // Slide in from below
            },
            {
              opacity: 1,
              zIndex: 1,
              translateY: 0,
              duration: 3,
              ease: "power3.out",
              onStart: () => {
                if (navItems.length) {
                  removeSpecificClassName(navItems, "active");
                  navItems[i].classList.add("active");
                }
              },
              onReverseComplete: () => {
                if (navItems.length) {
                  removeSpecificClassName(navItems, "active");
                  navItems[i - 1 < 0 ? 0 : i - 1].classList.add("active");
                }
              },
            },
            `+=${fromOffset * 100}%`
          ).to(
            selector,
            {
              opacity: i + 1 === 5 ? 1 : 0,
              zIndex: i + 1 === 5 ? 1 : 0,
              translateY: -100, // Slide out upwards
              duration: 1,
              ease: "power3.in",
            },
            `+=${finalOffset * 50}%`
          );
        }
      );
    }, 1000);
    return () => 
{return clearTimeout(timeOut);}; 
  }, []);

  return (
    <section id="clasor-attributes" className="landing-attributes">
      <div className="container max-w-[1108px] py-[70px]">
        <h2 className="section-title">ویژگی های کلاسور</h2>
        <div className="scroll-trigger min-h-screen mt-12" ref={triggerRef}>
          <nav className="clasor-attributes__nav">
            <ul className="clasor-attributes__list">
              <li className="clasor-attributes__list-item group">
                <RepoManagementIcon />
                <span>مدیریت مخزن</span>
              </li>
              <li className="clasor-attributes__list-item group">
                <DocumentManagementIcon />
                <span>مدیریت اسناد</span>
              </li>
              <li className="clasor-attributes__list-item group">
                <EditorIcon />
                <span>ویرایشگر متنوع</span>
              </li>
              <li className="clasor-attributes__list-item group">
                <AccessManagementIcon />
                <span>مدیریت پیشرفته دسترسی‌ها</span>
              </li>
              <li className="clasor-attributes__list-item group">
                <CapabilitiesIcon />
                <span>امکانات پیشرفته روی سند</span>
              </li>
            </ul>
          </nav>

          <div className="slide-container mt-20 gap-y-[88px]">
            <article
              className="clasor-attributes__item  slide flex gap-10 flex-col md:flex-row"
              data-slide="1"
            >
              <div className="clasor-attributes__item-image flex w-full justify-center md:justify-end">
                <div className="w-full md:w-[clamp(334px,33.634vw,485px)] h-[clamp(328px,28.779vw,415px)] relative">
                  <Lottie
                    options={{
                      ...featuresDefaultOptions,
                      animationData: repoManagement,
                    }}
                    height="auto"
                    width="100%"
                  />
                </div>
              </div>

              <LandingRepoManagementContext />
            </article>

            <article
              className="clasor-attributes__item  slide flex gap-10 flex-col md:flex-row"
              data-slide="2"
            >
              <div className="clasor-attributes__item-image flex w-full justify-center md:justify-end">
                <div className="w-full md:w-[clamp(334px,33.634vw,485px)] h-[clamp(328px,28.779vw,415px)] relative">
                  <Lottie
                    options={{
                      ...featuresDefaultOptions,
                      animationData: documentManagement,
                    }}
                    height="auto"
                    width="100%"
                  />
                </div>
              </div>

              <LandingDocManagementContext />
            </article>

            <article
              className="clasor-attributes__item  slide flex gap-10 flex-col md:flex-row"
              data-slide="3"
            >
              <div className="clasor-attributes__item-image flex w-full justify-center md:justify-end">
                <div className="w-full md:w-[clamp(334px,33.634vw,485px)] h-[clamp(328px,28.779vw,415px)] relative">
                  <Lottie
                    options={{
                      ...featuresDefaultOptions,
                      animationData: variousEditors,
                    }}
                    height="auto"
                    width="100%"
                  />
                </div>
              </div>

              <LandingVariousEditorsContext />
            </article>

            <article
              className="clasor-attributes__item  slide flex gap-10 flex-col md:flex-row"
              data-slide="4"
            >
              <div className="clasor-attributes__item-image flex w-full justify-center md:justify-end">
                <div className="w-full md:w-[clamp(334px,33.634vw,485px)] h-[clamp(328px,28.779vw,415px)] relative">
                  <Lottie
                    options={{
                      ...featuresDefaultOptions,
                      animationData: accessManagement,
                    }}
                    height="auto"
                    width="100%"
                  />
                </div>
              </div>
              <LandingAccessManagementContext />
            </article>
            <article
              className="clasor-attributes__item  slide flex gap-10 flex-col md:flex-row mt-20"
              data-slide="5"
            >
              <div className="clasor-attributes__item-image flex w-full justify-center md:justify-end">
                <div className="w-full md:w-[clamp(334px,33.634vw,485px)] h-[clamp(328px,28.779vw,415px)] relative">
                  <Lottie
                    options={{
                      ...featuresDefaultOptions,
                      animationData: advanceFeatures,
                    }}
                    height="auto"
                    width="100%"
                  />
                </div>
              </div>

              <LandingAdvancedFeaturesContext />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesktopAttributes;
