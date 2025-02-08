import * as yup from "yup";

export const landingMessageValidation = yup.object().shape({
  title: yup.string().required("لطفا عنوان را وارد کنید"),
  name: yup.string().required("لطفا نام خود را وارد کنید"),
  email: yup.string().email("ایمیل صحیح وارد کنید").required("لطفا ایمیل را وارد کنید"),
  message: yup.string().required("لطفا متن پیام را وارد کنید"),
}).required();
