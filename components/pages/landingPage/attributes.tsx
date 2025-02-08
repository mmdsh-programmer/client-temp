import AccessManagementContext from "./features-context/accessManagementContext";
import AdvancedFeaturesContext from "./features-context/advancedFeaturesContext";
import DocManagementContext from "./features-context/docManagementContext";
import Lottie from "react-lottie";
import React from "react";
import RepoManagementContext from "./features-context/repoManagementContext";
import VariousEditorsContext from "./features-context/variousEditorsContext";
import accessManagement from "./data/access-management.json";
import advanceFeatures from "./data/advance-features.json";
import documentManagement from "./data/document-management.json";
import { featuresDefaultOptions } from "./desktopAttributes";
import repoManagement from "./data/repo-management.json";
import variousEditors from "./data/various-editors.json";

const Attributes = () => {
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
              <RepoManagementContext />
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
              <DocManagementContext />
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
              <VariousEditorsContext />
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
              <AccessManagementContext />
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
              <AdvancedFeaturesContext />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Attributes;
