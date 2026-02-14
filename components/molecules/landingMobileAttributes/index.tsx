import React from "react";
import LandingAccessManagementContext from "@/components/molecules/landingAccessManagementContext";
import LandingAdvancedFeaturesContext from "@/components/molecules/landingAdvancedFeaturesContext";
import LandingDocManagementContext from "@/components/molecules/landingDocManagementContext";
import LandingRepoManagementContext from "@/components/molecules/landingRepoManagementContext";
import LandingVariousEditorsContext from "@/components/molecules/landingVariousEditorsContext";
import { featuresDefaultOptions } from "@components/molecules/landingDesktopAttribute";
import Lottie from "react-lottie";
import accessManagement from "@dataJson/access-management.json";
import advanceFeatures from "@dataJson/advance-features.json";
import documentManagement from "@dataJson/document-management.json";
import repoManagement from "@dataJson/repo-management.json";
import variousEditors from "@dataJson/various-editors.json";

const LandingMobileAttributes = () => {
  return (
    <section id="clasor-attributes" className="landing-attributes">
      <div className="container max-w-[1108px] py-[70px]">
        <h2 className="section-title">ویژگی های کلاسور</h2>

        <div className="mt-10 flex flex-col gap-y-[88px]">
          <article className="clasor-attributes__item flex flex-col gap-10 md:flex-row">
            <div className="clasor-attributes__item-image">
              <Lottie
                options={{
                  ...featuresDefaultOptions,
                  animationData: repoManagement,
                }}
                height="auto"
                width="100%"
              />
            </div>

            <div className="w-full md:w-[50vw]">
              <LandingRepoManagementContext />
            </div>
          </article>

          <article className="clasor-attributes__item flex flex-col gap-10 md:flex-row">
            <div className="clasor-attributes__item-image">
              <Lottie
                options={{
                  ...featuresDefaultOptions,
                  animationData: documentManagement,
                }}
                height="auto"
                width="100%"
              />
            </div>

            <div className="w-full md:w-[50vw]">
              <LandingDocManagementContext />
            </div>
          </article>

          <article className="clasor-attributes__item flex flex-col gap-10 md:flex-row">
            <div className="clasor-attributes__item-image">
              <Lottie
                options={{
                  ...featuresDefaultOptions,
                  animationData: variousEditors,
                }}
                height="auto"
                width="100%"
              />
            </div>

            <div className="w-full md:w-[50vw]">
              <LandingVariousEditorsContext />
            </div>
          </article>

          <article className="clasor-attributes__item flex flex-col gap-10 md:flex-row">
            <div className="clasor-attributes__item-image">
              <Lottie
                options={{
                  ...featuresDefaultOptions,
                  animationData: accessManagement,
                }}
                height="auto"
                width="100%"
              />
            </div>

            <div className="w-full md:w-[50vw]">
              <LandingAccessManagementContext />
            </div>
          </article>

          <article className="clasor-attributes__item flex flex-col gap-10 md:flex-row">
            <div className="clasor-attributes__item-image">
              <Lottie
                options={{
                  ...featuresDefaultOptions,
                  animationData: advanceFeatures,
                }}
                height="auto"
                width="100%"
              />
            </div>

            <div className="w-full md:w-[50vw]">
              <LandingAdvancedFeaturesContext />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default LandingMobileAttributes;
