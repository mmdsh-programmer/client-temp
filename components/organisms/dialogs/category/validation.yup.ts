import * as yup from "yup";

export const categorySchema = yup
  .object()
  .shape({
    name: yup.string().required("لطفا نام را وارد کنید."),
  })
  .required();

export const fileVersionScheme = yup
  .object()
  .shape({
    versionNumber: yup.string().required("لطفا شماره نسخه فایل را وارد کنید!"),
  })
  .required();

export const blockUserSchema = yup
  .object()
  .shape({
    username: yup.string().required("لطفا نام کاربری را وارد کنید!"),
  })
  .required();
