import * as yup from "yup";

export const documentCreateQuestionSchema = yup
  .object()
  .shape({
    title: yup.string().required("لطفا عنوان را وارد کنید"),
  })
  .required();

export const documentEditSchema = yup
  .object()
  .shape({ title: yup.string().required("لطفا عنوان را وارد کنید") })
  .required();
