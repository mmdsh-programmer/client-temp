import Shepherd, { StepOptions } from "shepherd.js";
import { activeTourAtom } from "@atom/tour";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const CategoryTour = () => {
    const setActiveTour = useSetRecoilState(activeTourAtom);

  useEffect(() => {
    const tourOverlay = document.querySelectorAll(
      ".tour-overlay",
    )[0] as HTMLElement;

    const categoryTour = new Shepherd.Tour({
      useModalOverlay: false,
      exitOnEsc: true,

      defaultStepOptions: {
        id: "category-tour",
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
      disabled?: string,
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
            text: `
              <svg style="display:${id === "step1" ? "none" : "inherit"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>        
            `,
            action: () => {
              categoryTour.back();
            },
            disabled: disabled === "back",
          },
          {
            action: () => {
              categoryTour.next();
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

    const categoryTourSteps = [
      createStep(
        "step1",
        `
            <div class="tour-step-container">
            <h1 class="tour-step-header"> جست و جو در محتوا  </h1>
            <p class="tour-step-text">
            جست و جو در محتوای تمام اسناد موجود، کافیست کلمه یا جمله مورد نظر را
            وارد کنیدتا جست و جو در اسناد انجام شود و نتیجه به شما نمایش داده شود.
            </p>
          </div>`,

        ".categorySearchContent",
        "bottom",
      ),
      createStep(
        "step2",
        `
          <div class="tour-step-container">
            <h1 class="tour-step-header">جست و جوی پیشرفته</h1>
            <p class="tour-step-text">
             در این قسمت می توانید جست و جوی پیشرفته در مستندات و دسته بندی ها داشته باشید.
            </p>
          </div>
            `,
        ".categorySearch",
        "bottom",
      ),
    //   createStep(
    //     "step3",
    //     `
    //       <div class="tour-step-container">
    //       <h1 class="tour-step-header"> نمایش درختی </h1>
    //       <p class="tour-step-text">
    //       نمایش درختی و مدیریت دسته بندی ها و اسناد موجود در مخزن
    //       </p>
    //     </div>`,
    //     ".categoryTreeMode",
    //     "bottom",
    //   ),
      createStep(
        "step3",
        `
          <div class="tour-step-container">
            <h1 class="tour-step-header">عملیات مربوط به دسته بندی نمونه سند و سند</h1>
            <p class="tour-step-text">
              از این گزینه می توانید برای ایجاد دسته بندی ، نمونه سند و سند استفاده کنید. 
            </p>
          </div>`,
        ".createMenu",
        "bottom",
      ),
      createStep(
        "step4",
        `
          <div class="tour-step-container">
            <h1 class="tour-step-header"> انتخاب </h1>
            <p class="tour-step-text">
              با انتخاب دو یا چند سند/ دسته بندی امکان جابجایی به یک دسته بندی و یا حذف
              موارد انتخاب شده وجود دارد.
            </p>
          </div>
        `,
        ".categoryBulk",
        "bottom",
      ),
      createStep(
        "step5",
        `
          <div class="tour-step-container">
            <h1 class="tour-step-header"> الویت</h1>
            <p class="tour-step-text">
              اگر برای سند یا دسته بندی الویت وارد شده باشد،بر اساس این الویت بندی ها
              لیست مرتب می شود.
            </p>
          </div>
        `,
        ".categoryOrder",
        "bottom",
      ),
      createStep(
        "step-last",
        `
          <div class="tour-step-container">
              <h1 class="tour-step-header">  
              عملیات مربوط به دسته بندی و سند  
              </h1>
              <p class="tour-step-text">
              عملیات مربوط به ساخت، ویرایش، انتقال، حذف در این قسمت وجود دارد.
              </p>
          </div>
        `,
        ".category-action",
        "bottom",
      ),
    ];

    categoryTourSteps?.forEach((step) => {
      return categoryTour.addStep(step as StepOptions);
    });

    categoryTour.start();
    return () => {
      if (categoryTour) {
        tourOverlay.style.display = "none";

        categoryTour.hide();
        categoryTour.complete();
        categoryTour.cancel();
      }
    };
  }, []);

  return null;
};

export default CategoryTour;
