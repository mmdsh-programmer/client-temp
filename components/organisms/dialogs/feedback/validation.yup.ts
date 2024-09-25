import * as yup from "yup";

export const feedBackSchema = yup.object().shape({
  content: yup.string().required("لطفا متن پیام را وارد کنید"),
  // fileHashList: yup.array().of(yup.string()),
}).required();
