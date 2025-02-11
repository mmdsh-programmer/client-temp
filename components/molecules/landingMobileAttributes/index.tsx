import LandingAccessManagementContext from "../landingAccessManagementContext";
import LandingAdvancedFeaturesContext from "../landingAdvancedFeaturesContext";
import LandingDocManagementContext from "../landingDocManagementContext";
import LandingRepoManagementContext from "../landingRepoManagementContext";
import LandingVariousEditorsContext from "../landingVariousEditorsContext";
import Lottie from "react-lottie";
import React from "react";
import accessManagement from "@dataJson/access-management.json";
import advanceFeatures from "@dataJson/advance-features.json";
import documentManagement from "@dataJson/document-management.json";
import { featuresDefaultOptions } from "@components/molecules/landingDesktopAttribute";
import repoManagement from "@dataJson/repo-management.json";
import variousEditors from "@dataJson/various-editors.json";

const LandingMobileAttributes = () => {
  return (
    <section id="clasor-attributes" className="landing-attributes">
      <div className="container max-w-[1108px] py-[70px]">
        <h2 className="section-title">ویژگی های کلاسور</h2>

        <div className="mt-10 flex flex-col gap-y-[88px]">
          <article className="clasor-attributes__item flex gap-10 flex-col md:flex-row">
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

            <div className="md:w-[50vw] w-full">
              <LandingRepoManagementContext />
            </div>
          </article>

          <article className="clasor-attributes__item flex gap-10 flex-col md:flex-row">
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

            <div className="md:w-[50vw] w-full">
              <LandingDocManagementContext />
            </div>
          </article>

          <article className="clasor-attributes__item flex gap-10 flex-col md:flex-row">
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

            <div className="md:w-[50vw] w-full">
              <LandingVariousEditorsContext />
            </div>
          </article>

          <article className="clasor-attributes__item flex gap-10 flex-col md:flex-row">
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

            <div className="md:w-[50vw] w-full">
              <LandingAccessManagementContext />
            </div>
          </article>

          <article className="clasor-attributes__item flex gap-10 flex-col md:flex-row">
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

            <div className="md:w-[50vw] w-full">
              <LandingAdvancedFeaturesContext />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default LandingMobileAttributes;
