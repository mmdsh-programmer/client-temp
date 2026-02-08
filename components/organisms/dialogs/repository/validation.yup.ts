import * as yup from "yup";

// eslint-disable-next-line no-useless-escape
const forbiddenRegex = /^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$/;

export const repoCreateSchema = yup.object().shape({
  name: yup
    .string()
    .required("نام مخزن الزامی است")
    .max(500, "نام مخزن بیش از 500 کاراکتر است.")
    .test(
      "no-forbidden-chars",
      "نام مخزن شامل کاراکتر غیرمجاز است.",
      (value) => {
        if (!value) return true;
        return !forbiddenRegex.test(value);
      }
    ),
  description: yup
    .string()
    .optional()
    .max(500, "توضیحات مخزن بیش از 500 کاراکتر است.")
    .test(
      "no-forbidden-chars",
      " توضیحات مخزن شامل کاراکتر غیرمجاز است.",
      (value) => {
        if (!value) return true;
        return !forbiddenRegex.test(value);
      }
    ),
});

export const repoUserSchema = yup
  .object()
  .shape({ username: yup.string().required("لطفا شناسه پادی را وارد کنید"), })
  .required();

export const repoTagSchema = yup
  .object()
  .shape({ name: yup.string().required("لطفا تگ را وارد کنید"), })
  .required();

export const repoShareSchema = yup
  .object()
  .shape({
    expireTime: yup.number().required("تاریخ انقضا لینک را وارد کنید"),
    roleId: yup.number().required("لطفا سطح دسترسی را انتخاب کنید"),
  })
  .required();

export const subscribeScheme = yup
  .object()
  .shape({ password: yup.string().required("رمز عبور را وارد کنید"), })
  .required();

export const repoDeleteSchema = yup
  .object()
  .shape({ name: yup.string().required("نام مخزن را وارد کنید!"), })
  .required();

export const repoCreateKeySchema = yup.object().shape({
  name: yup.string().required("نام کلید اجباریست")
    .max(500, "نام کلید بیش از 500 کاراکتر است.")
    .test(
      "no-forbidden-chars",
      "نام کلید شامل کاراکتر غیرمجاز است.",
      (value) => {
        if (!value) return true;
        return !forbiddenRegex.test(value);
      }
    ),
  publicKey: yup.string().required("کلید عمومی اجباریست"),
  privateKey: yup.string().optional(),
});
