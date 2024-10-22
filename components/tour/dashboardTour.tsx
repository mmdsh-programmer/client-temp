import Shepherd, { StepOptions } from "shepherd.js";

import { activeTourAtom } from "@atom/tour";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const DashboardTour = () => {
  const setActiveTour = useSetRecoilState(activeTourAtom);

  useEffect(() => {
    const tourOverlay = document.querySelectorAll(
      ".tour-overlay"
    )[0] as HTMLElement;

    const dashboardTour = new Shepherd.Tour({
      useModalOverlay: false,
      exitOnEsc: true,

      defaultStepOptions: {
        id: "dashboard-tour",
        classes: "custom-shepherd-theme",
        scrollTo: false,
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
        buttons: [
          {
            text: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
      </svg>        
              `,
            action: () => {
              dashboardTour.back();
            },
            disabled: disabled === "back" && true,
          },
          {
            action: () => {
              dashboardTour.next();
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
        `<div class="tour-step-container">
        <h1 class="tour-step-header"> مخرن های من</h1>
        <p class="tour-step-text">
        مالک و سازنده این مخزن ها شما هستید و می توانید با انتخاب هرکدام مدیریت
        اسناد را انجام دهید.
        </p>
        </div>`,
        ".myRepoList",
        "bottom",
        "back"
      ),
      createStep(
        "step2",
        `
      <div class="tour-step-container">
    <h1 class="tour-step-header"> مخرن های اشتراکی </h1>
    <p class="tour-step-text">
    مالک و سازنده این مخزن ها دیگران هستند و به شما دسترسی های گوناگون داده
    اند،با انتخاب هرکدام مدیریت اسناد را انجام دهید.
    </p>
  </div>
            `,
        ".myAccessList",
        "bottom"
      ),
      createStep(
        "step3",
        `
            <div class="tour-step-container">
            <h1 class="tour-step-header"> مخرن های نشان شده</h1>
            <p class="tour-step-text">
            این مخزن ها توسط شما نشان دار شده اند.
            </p>
          </div>`,

        ".myBookmarkList",
        "bottom"
      ),
      createStep(
        "step4",
        `
            <div class="tour-step-container">
            <h1 class="tour-step-header"> مخرن های آرشیوشده</h1>
            <p class="tour-step-text">
            بدون حذف شدن و محدودیت زمانی می توانید مخازن مورد نظر را آرشیو کنید و
            امکان بازگردانی دارند یا حذف کامل دارند.
            </p>
          </div>`,

        ".myArchiveList",
        "bottom"
      ),
      createStep(
        "step5",
        `
          <div class="tour-step-container">
          <h1 class="tour-step-header"> اعلان ها </h1>
          <p class="tour-step-text">
          اعلان ها و درخواست های ارسال شده پیوستن به مخازن اشتراکی که باید آن ها
          را تایید کنید تا دسترسی به مخزن های اشتراکی فعال شود.
            </p>
        </div>`,
        ".notice",
        "bottom"
      ),
      createStep(
        "step5",
        `
        <div class="tour-step-container">
        <h1 class="tour-step-header"> اکانت فرد </h1>
        <p class="tour-step-text">
        می توانید برای مشاهده حساب کاربری و خروج از پنل استفاده کنید.
        </p>
      </div>`,
        ".userProfile",
        "bottom"
      ),
      // createStep(
      //   "step6",
      //   `
      //   <div class="tour-step-container">
      //   <h1 class="tour-step-header"> نمایش کارتی </h1>
      //   <p class="tour-step-text">
      //   امکان نمایش و انتخاب کارتی مخزن ها.
      //   </p>
      // </div>`,
      //   ".RepoCardMode",
      //   "bottom",
      // ),
      // createStep(
      //   "step7",
      //   `
      //   <div class="tour-step-container">
      //   <h1 class="tour-step-header"> نمایش لیستی   </h1>
      //   <p class="tour-step-text">
      //   امکان نمایش و انتخاب لیستی مخزن ها.
      //   </p>
      // </div>`,
      //   ".RepoTableMode",
      //   "bottom",
      // ),
      createStep(
        "step6",
        `
        <div class="tour-step-container">
        <h1 class="tour-step-header">مخزن جدید </h1>
        <p class="tour-step-text">
        تمامی اسناد و دسته‌بندی‌های مرتبط با یک حوزه مشخص را می‌توانید در
        موجودیتی به نام مخزن قرار داده ، آن را مدیریت کنید و در اختیار دیگران
        قرار دهید.( اگر مخزنی باهات به اشتراک گذاشته نشده مخزن خودت رو بساز) اسم
        مخزن و در صورت لزوم توضیحات برای آن بنویسید.
        </p>
      </div>`,
        ".createNewRepo",
        "bottom"
      ),
      createStep(
        "step9",
        `
        <div class="tour-step-container">
        <h1 class="tour-step-header"> جست و جوی مخزن ها   </h1>
        <p class="tour-step-text">
        امکان جست و جوی نام مخزن در لیست انتخابی .        </p>
      </div>`,
        ".searchRepo",
        "bottom"
      ),
      createStep(
        "step-last",
        `
        <div class="tour-step-container">
        <h1 class="tour-step-header"> عملیات مخزن </h1>
        <p class="tour-step-text">
        امکان مدیریت مخزن        
        </p>
        </div>`,
        ".repoActions",
        "right"
      ),
    ];

    tourSteps.forEach((step) => {
      return dashboardTour.addStep(step as StepOptions);
    });

    dashboardTour.start();
    return () => {
      if (dashboardTour) {
        tourOverlay.style.display = "none";

        dashboardTour.hide();
        dashboardTour.complete();
        dashboardTour.cancel();
      }
    };
  }, []);

  return null;
};

export default DashboardTour;
