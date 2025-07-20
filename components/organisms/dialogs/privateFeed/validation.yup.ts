import * as yup from "yup";

export const privateFeedSchema = yup
  .object()
  .shape({
    name: yup.string().required("لطفا نام خبرنامه را وارد کنید."),
    content: yup.string().required("لطفا متن خبرنامه را وارد کنید."),
  })
  .required();
