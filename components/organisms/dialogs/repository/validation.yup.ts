import * as yup from "yup";

export const repoCreateSchema = yup
  .object()
  .shape({
    name: yup.string().required("لطفا عنوان مخزن را وارد کنید"),
  })
  .required();

export const repoUserSchema = yup
  .object()
  .shape({
    username: yup.string().required("لطفا شناسه پادی را وارد کنید"),
  })
  .required();

export const repoTagSchema = yup
  .object()
  .shape({
    name: yup.string().required("لطفا تگ را وارد کنید"),
  })
  .required();

  export const repoShareSchema = yup
  .object()
  .shape({
    expireTime: yup.number().required("تاریخ انقضا لینک را وارد کنید"),
    roleId: yup.number().required("لطفا سطح دسترسی را انتخاب کنید"),
  })
  .required();

export const subscribeScheme = yup
  .object()
  .shape({
    password: yup.string().required("رمز عبور را وارد کنید"),
  })
  .required();

export const repoDeleteSchema = yup
  .object()
  .shape({
    name: yup.string().required("نام مخزن را وارد کنید!"),
  })
  .required();

export const repoCreateKeySchema = yup.object().shape({
  name: yup.string().required("نام کلید اجباریست"),
  publicKey: yup.string().required("کلید عمومی اجباریست"),
  privateKey: yup.string().optional(),
});
