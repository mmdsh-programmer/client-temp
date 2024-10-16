import Shepherd, { StepOptions } from "shepherd.js";

import { activeTourAtom } from "atom/tour";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const VersionTour = () => {
  const setActiveTour = useSetRecoilState(activeTourAtom);

  const versonListContainer = document.querySelector(
    ".version-list__container"
  );

  const versionOverlay = document.createElement("div");
  versonListContainer?.append(versionOverlay);
  versionOverlay.classList.add("version-overlay");

  useEffect(() => {
    const tourOverlay = document.querySelectorAll(
        ".tour-overlay",
      )[0] as HTMLElement;

    const versionTour = new Shepherd.Tour({
      useModalOverlay: false,
      exitOnEsc: true,

      defaultStepOptions: {
        id: "version-tour",
        classes: "custom-shepherd-theme",
        scrollTo: true,
        cancelIcon: {
          enabled: true,
          label: "exit",
        },
        when: {
          show: () => {
            tourOverlay.style.display = "block";
          },
          hide: () => {
            tourOverlay.style.display = "none";
            // setActiveTour(null);
          },
          complete: () => {
            tourOverlay.style.display = "none";
            setActiveTour(null);
          },
          cancel: () => {
            tourOverlay.style.display = "none";
            setActiveTour(null);
          },
        },
      },
    });

    const createStep = (
      id: string,
      content: string,
      element: string,
      where: string,
      disabled?: string
    ) => {
      return {
        id,
        text: content,
        attachTo: {
          element,
          on: where,
        },
        // canClickTarget: true,
        // scrollTo: {
        //   block: "center",
        //   inline: "center",
        // },
        buttons: [
          {
            text: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
      </svg>        
              `,
            action: () => {
              versionTour.back();
            },
          },
          {
            action: () => {
              versionTour.next();
            },
            text: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            `,
            disabled: disabled === "next" && true,
          },
        ],
      };
    };

    const tourSteps = [
      createStep(
        "step1",
        `
      <div class="tour-step-container">
    <h1 class="tour-step-header">  لیست نسخه ها  </h1>
    <p class="tour-step-title">
    شامل:
    </p>
    <ul class="list-disc tour-step-list">
    <li>اسم نسخه </li>
    <li>وضعیت نسخه </li>
    <li>تاریخ ایجاد </li>
    <li>تاریخ به  روز رسانی </li>
    </ul>
    </div>
            `,
        ".version-list",
        "top-end",
        "back"
      ),
      createStep(
        "step2",
        `
            <div class="tour-step-container">
            <h1 class="tour-step-header">وضعیت نسخه ها  </h1>
            <p class="tour-step-title">
           وضعیت نسخه ها می توانند در یکی حالت های زیر باشد:
            </p>
            <ul class="list-disc tour-step-list">
            <li>پیشنویس</li>
            <li>در انتظار تایید</li>
            <li>تایید شده </li>
            <li>در انتظار عمومی شدن</li>
            <li>عمومی </li>
            <li>رد شده </li>
            </ul> 
            <ul> 
            <li>
            توجه داشته باشید فقط  محتوای نسخه عمومی برای دیگران قابل نمایش است. اگر میخواهید یک محتوا را به صورت عمومی در اختیار دیگران قرار دهید حتما باید نسخه مورد نظر توسط مالک مخزن عمومی شده باشد          
</li>
</ul>
            </div>`,
        ".version-status",
        "left"
      ),

      createStep(
        "step3",
        `
            <div class="tour-step-container">
            <h1 class="tour-step-header"> ایجاد نسخه جدید   </h1>
            <p class="tour-step-text">
            می توانید نسخه های جدیدی برای سند ایجاد و آن را مدیریت کنید
            کافیست برای نسخه خود اسم وارد کنید.            
            </p>
          </div>`,
        ".version-create",
        "bottom"
      ),
      createStep(
        "step4",
        `
          <div class="tour-step-container">
          <h1 class="tour-step-header"> عملیات نسخه </h1>
          <p class="tour-step-text">
          می توانید عملیات مربوط به نسخه از جمله ساخت، ویرایش، حذف، مقایسه، کپی فایل هش، تایید و عمومی سازی را در این قسمت انجام دهید.       
          </p>
        </div>`,
        ".version-action",
        "bottom",
      ),
    ];

    tourSteps.forEach((step) => {
      return versionTour.addStep(step as StepOptions );
    });

    versionTour.start();

    return () => {
      if (versionTour) {
        versionOverlay.remove();

        versionTour.hide();
        versionTour.complete();
        versionTour.cancel();
      }
    };
    // }
  }, []);

  return null;
};

export default VersionTour;
