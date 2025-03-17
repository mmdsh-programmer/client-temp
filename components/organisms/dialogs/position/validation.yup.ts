import * as yup from "yup";

export const positionSchema = yup
  .object()
  .shape({
    title: yup.string().required("لطفا نام سمت را وارد کنید."),
  })
  .required();
