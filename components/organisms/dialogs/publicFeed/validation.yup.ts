import * as yup from "yup";

export const publicFeedSchema = yup
  .object()
  .shape({
    name: yup.string().required("لطفا نام خبرنامه را وارد کنید."),
    content: yup.string().required("لطفا متن را وارد کنید."),
  })
  .required();
