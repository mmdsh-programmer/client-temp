import * as yup from "yup";

export const documentPasswordSchema = yup
  .object()
  .shape({
    password: yup
      .string()
      .matches(/^(?=.{8,})/, "رمز عبور باید حداقل 8 کاراکتر باشد")
      .required("لطفا رمز عبور را وارد کنید"),
  })
  .required();
