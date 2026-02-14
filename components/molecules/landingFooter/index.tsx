"use client";

import React from "react";
import { FooterLogo } from "@components/atoms/landingSvg/landingSvg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const landingMessageValidation = yup.object().shape({
  title: yup.string().required("لطفا عنوان را وارد کنید"),
  name: yup.string().required("لطفا نام خود را وارد کنید"),
  email: yup.string().email("ایمیل صحیح وارد کنید").required("لطفا ایمیل را وارد کنید"),
  message: yup.string().required("لطفا متن پیام را وارد کنید"),
}).required();


interface IDataForm {
  title: string;
  name: string;
  email: string;
  message: string;
}

const LandingFooter = () => {
  const form = useForm<IDataForm>({
    resolver: yupResolver(landingMessageValidation),
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;


  const onSubmit = (data: IDataForm) => {
    console.log(data);
  };

  return (
    <footer className="landing-footer bg-purple-600">
      <div className="container max-w-[1108px] mx-auto py-12 px-5 xl:px-0">
        <FooterLogo />

        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1">
            <address className="landing-footer__address">
              آدرس: مشهد، بلوار خیام، حدفاصل چهارراه سجاد و ارشاد، ساختمان پست
              بانک، طبقه ۴
            </address>
            <a href="tel:02161930400" className="landing-footer__phone w-fit">
              شماره تماس: 02161930400
            </a>
          </div>

          <div className="md:flex-[0_1_468px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="landing-footer__form"
            >
              <div className="flex-1 flex flex-col gap-2">
                <input
                  type="text"
                  className="landing-footer__form-input"
                  placeholder="عنوان پیام"
                  {...register("title")}
                />
                {errors.title && (
                  <small className="text-secondary text-xs w-full">
                    {errors.title?.message}
                  </small>
                )}
                <input
                  type="text"
                  className="landing-footer__form-input"
                  placeholder="نام و نام خانوادگی"
                  {...register("name")}
                />
                {errors.name && (
                  <small className="text-secondary text-xs w-full">
                    {errors.name?.message}
                  </small>
                )}
                <input
                  type="email"
                  className="landing-footer__form-input"
                  placeholder="ایمیل"
                  {...register("email")}
                />
                {errors.email && (
                  <small className="text-secondary text-xs w-full">
                    {errors.email?.message}
                  </small>
                )}
              </div>
              <div className="flex-1">
                <div
                  className={`relative ${
                    errors.message ? "h-[90%]" : "h-full"
                  }`}
                >
                  <textarea
                    className="landing-footer__form-input"
                    placeholder="شرح پیام شما..."
                    {...register("message")}
                  />
                  <button type="submit">
                    {/* {false ? (
                      <div className="spinner w-3 h-3 ml-2 align-middle" />
                    ) : null} */}
                    ارسال
                  </button>
                </div>

                {errors.message && (
                  <small className="text-secondary text-xs w-full">
                    {errors.message?.message}
                  </small>
                )}
              </div>
            </form>
          </div>
        </div>

        <hr className="border border-dashed border-white mt-6" />

        <div className="flex flex-wrap justify-between mt-2 gap-y-4">
          <span className="text-white text-opacity-75 text-xs inline-block mt-4">
            کلیه حقوق متعلق به شرکت فناپ بوده و هرگونه کپی برداری پیگرد قانونی
            دارد
          </span>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
