import * as yup from "yup";

export const versionSchema = yup.object().shape({
  name: yup.string().required("نسخه مورد نظر را وارد کنید."),

}).required();
