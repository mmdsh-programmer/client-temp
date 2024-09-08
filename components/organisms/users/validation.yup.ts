import * as yup from "yup";

export const userSchema = yup.object().shape({
  username: yup.string().required("لطفا شناسه پادی را وارد کنید."),
}).required();
