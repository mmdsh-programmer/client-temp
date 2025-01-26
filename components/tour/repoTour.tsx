import Shepherd, { StepOptions } from "shepherd.js";
import { activeTourAtom } from "@atom/tour";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const RepoTour = () => {
  const setActiveTour = useSetRecoilState(activeTourAtom);

  useEffect(() => {
    const tourOverlay = document.querySelectorAll(".tour-overlay")[0] as HTMLElement;

    const repoTour = new Shepherd.Tour({
      useModalOverlay: false,
      exitOnEsc: true,

      defaultStepOptions: {
        id: "repo-tour",
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
      id:string,
      content:string,
      element: string,
      where:string,
      disabled?:string,
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
            text: `
            <svg style="display:${id === "step1" ? "none" : "inherit"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>        
          `,
            action: () => {
              repoTour.back();
            },
            disabled: disabled === "back",
          },
          {
            action: () => {
              repoTour.next();
            },
            text: `
            <svg style="display:${id === "step-last" ? "none" : "inherit"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
          `,
            disabled: disabled === "next",
          },
        ],
      };
    };

    const tourSteps = [
      createStep(
        "step1",
        `<div class="tour-step-container">
        <p class="tour-step-text">نام، تاریخ ایجاد و نقش در مخزن</p>
        </div>`,
        ".repoCreationDate",
        "bottom",
        "back",
      ),
      createStep(
        "step2",
        `
      <div class="tour-step-container">
    <h1 class="tour-step-header"> سربرگ اطلاعات مخزن </h1>
    <p class="tour-step-text">
      شما می توانید در این سربرگ به مدیریت مخزن بپردازید.
    </p>
    <p class="tour-step-title">امکانات:</p>
    <ul class="list-disc tour-step-list">
      <li>مشاهده اسم، توضیحات،عکس و حجم فایل های موجود در مخزن</li>
      <li>لینک اشتراک گذاری عمومی از محتوا مخزن</li>
      <li>ساخت،مدیریت و مشاهده تگ ها </li>
      <li>نشان کردن مخزن</li>
      <li>ویرایش اسم و اطلاعات مخزن</li>
      <li>حذف مخزن</li>
      <li>آرشیو کردن مخزن</li>
      <li>انتقال مالکیت مخزن</li>
      <li>ایجاد لینک برای اشتراک گذاری عمومی محتوای مخزن</li>
      <li>ایجاد لینک جوین شدن با نقش های مختلف به مخزن</li>
    </ul>
  </div>
            `,
        ".repoInformationTab",
        "left-end",
      ),
    //   createStep(
    //     "step3",
    //     `
    //         <div class="tour-step-container">
    //         <h1 class="tour-step-header"> انتخاب عکس مخزن</h1>
    //         <p class="tour-step-text">
    //           فایل آپلود کن یا از میان فایل های موجود 
    //           عکسی را برای مخزن انتخاب کنید.
    //         </p>
    //       </div>`,

    //     ".repo-upload-image",

    //     "bottom",
    //   ),
      // createStep(
      //   "step3",
      //   `
      //     <div class="tour-step-container">
      //     <h1 class="tour-step-header"> نشان کردن مخزن </h1>
      //     <p class="tour-step-text">
      //     مخزن های پر کاربرد خود را نشان کنید تا راحت تر و سریع تر در بخش مخزن های
      //     نشان شده پنل نمایش داده شود.
      //     </p>
      //   </div>`,
      //   ".repo-bookmark",
      //   "bottom",
      // ),
    //   createStep(
    //     "step5",
    //     `
    //     <div class="tour-step-container">
    //     <h1 class="tour-step-header"> ویرایش </h1>
    //     <p class="tour-step-text">
    //     در صورت لزوم امکان ویرایش اسم و اطلاعات مخزن را دارید اسم یا توضیحات جدید
    //     را وارد کنید.
    //     </p>
    //   </div>`,
    //     ".repo-edit",
    //     "bottom",
    //   ),
    //   createStep(
    //     "step6",
    //     `
    //     <div class="tour-step-container">
    //     <h1 class="tour-step-header"> حذف مخزن </h1>
    //     <p class="tour-step-text">
    //     امکان حذف یا ارشیو کردن مخزن در صورت حذف امکان بازیابی محتوا و فایل ها
    //     موجود درون مخزن وجود ندارد.
    //     </p>
    //   </div>`,
    //     ".repo-delete",
    //     "bottom",
    //   ),
    //   createStep(
    //     "step7",
    //     `
    //     <div class="tour-step-container">
    //     <h1 class="tour-step-header"> انتقال مالکیت  </h1>
    //     <p class="tour-step-text">
    //     با وارد کرد نام کاربری پادی در کادر موجود، مالکیت مخزن به فرد مورد نظر
    //     واگذار می گردد و فرد جدید می تواند مخزن را مدیریت کند (نقش شما در مخزن
    //     به مدیر تغییر می کند).
    //     </p>
    //   </div>`,
    //     ".repo-migrate-owner",
    //     "bottom",
    //   ),
    //   createStep(
    //     "step8",
    //     `
    //     <div class="tour-step-container">
    //     <h1 class="tour-step-header"> جوین شدن با نقش </h1>
    //     <p class="tour-step-text">
    //     این ابزار امکان ایجاد و مدیریت لینک اضافه شدن افراد به مخزن با استفاده
    //     از لینک‌های اختصاصی را فراهم می‌کند، افرادی که این لینک ها را در اختیار
    //     دارند اجازه دارند فقط کارهایی را انجام دهند که برای نقش آن‌ها مجاز است.
    //     و هر فرد در یک مخزن فقط می تواند یک نقش داشته باشد فقط کافی است برای نقش
    //     مورد نظر لینک ایجاد کنید و اگر لینک موجود باشد می توانید آن را خلاصه تر
    //     یا حذف کنید.
    //     </p>
    //   </div>`,
    //     ".repo-publish",
    //     "bottom",
    //   ),
    //   createStep(
    //     "step9",
    //     `
    //     <div class="tour-step-container">
    //     <h1 class="tour-step-header"> لینک عمومی کردن  </h1>
    //     <p class="tour-step-text">
    //     یا اگر می‌خواهید محتوای مخزنی را با مشتریان یا دیگران به اشتراک بگذارید،
    //     می‌توانید یک لینک با انتخاب تاریخ انقضا لینک اشتراک گذاری عمومی مخزن
    //     ایجاد می شود و تا پایان این تاریخ معتبر می ماند و محتوا هایی که تایید و
    //     عمومی شده اند نمایش داده می شونددر صورتی که مخزن لینک داشته باشد با
    //     انتخاب این بخش میتوانید لینک عمومی مخزن را لغو کنید.
    //     </p>
    //   </div>`,
    //     ".repo-link",
    //     "bottom",
    //   ),
      createStep(
        "step-last",
        `
        <div class="tour-step-container">
        <h1 class="tour-step-header"> ساخت تگ </h1>
        <p class="tour-step-text">
        میتوانید روی مخزن و اسناد موجود درآن تگ استفاده کنید کافی است بعد از انتخاب
        ساخت تگ نام تگ مورد نظر را وارد کنید.
        </p>
      </div>`,
        ".repoTags",
        "bottom",
      ),
    ];

    tourSteps.forEach((step) => { return repoTour.addStep(step as StepOptions ); });

    repoTour.start();
    return () => {
      if (repoTour) {
        tourOverlay.style.display = "none";

        repoTour.hide();
        repoTour.complete();
        repoTour.cancel();
      }
    };
  }, []);

  return null;
};

export default RepoTour;
