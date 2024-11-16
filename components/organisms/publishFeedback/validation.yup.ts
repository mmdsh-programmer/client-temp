import * as yup from "yup";

export const publishCreateCommentSchema = yup
  .object()
  .shape({
    text: yup
      .string()
      .required("لطفا متن نظر خود را وارد کنید")
      .min(3, "حداقل طول متن 3 کاراکتر است"),
  })
  .required();
