import * as yup from "yup";

export const documentCreateSchema = yup.object().shape({
  title: yup.string().required("لطفا عنوان را وارد کنید"),
  versionNumber: yup.string().required("لطفا شماره نسخه برای سند  را وارد کنید"),
  contentType: yup.string().required("لطفا نوع سند  را وارد کنید"),
}).required();

export const documentEditSchema = yup.object().shape({
  title: yup.string().required("لطفا عنوان را وارد کنید"),
}).required();

export const documentTypeSchema = yup.object().shape({
  contentType: yup.string().required("لطفا نوع سند  را وارد کنید"),
}).required();

export const documentInfoSchema = yup.object().shape({
  title: yup.string().required("لطفا عنوان سند را وارد کنید"),
}).required();

export const documentVersionSchema = yup.object().shape({
  versionNumber: yup.string().required("لطفا نسخه اولیه سند را وارد کنید"),
}).required();

export const blockUserSchema = yup.object().shape({
  username: yup.string().required("لطفا نام کاربری را وارد کنید!"),
}).required();

export const documentSetPasswordSchema = yup.object().shape({
  password: yup.string().matches(
    /^(?=.{8,})/,
    "رمز عبور باید حداقل 8 کاراکتر باشد",
  ).required("لطفا رمز عبور را وارد کنید"),
  confirmPassword: yup.string().required("لطفا تکرار رمز عبور را وارد کنید"),
}).required();

export const documentResetPasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("لطفا رمز عبور قدیمی خود را وارد کنید"),
  password: yup.string().matches(
    /^(?=.{8,})/,
    "رمز عبور باید حداقل 8 کاراکتر باشد",
  ).required("لطفا رمز عبور را وارد کنید"),
  confirmPassword: yup.string().required("لطفا تکرار رمز عبور را وارد کنید"),
}).required();

export const documentDeletePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("لطفا رمز عبور سند را وارد کنید"),
}).required();
