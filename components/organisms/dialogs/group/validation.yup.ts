import * as yup from "yup";

export const userGroupSchema = yup.object().shape({
  title: yup.string().required("لطفا نام گروه را وارد کنید."),
}).required();
