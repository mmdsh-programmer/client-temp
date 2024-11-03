import * as yup from "yup";

export const publishSearchContentSchema = yup
  .object()
  .shape({
    searchText: yup
      .string()
      .required("لطفا متن جست و جو را وارد کنید")
      .min(3, "حداقل طول متن 3 کاراکتر است"),
  })
  .required();
