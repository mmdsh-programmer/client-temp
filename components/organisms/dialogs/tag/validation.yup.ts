import * as yup from "yup";

// eslint-disable-next-line no-useless-escape
const forbiddenRegex = /^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$/;

export const tagSchema = yup.object().shape({
  name: yup
    .string()
    .required("نام تگ الزامی است.")
    .max(500, "نام تگ بیش از 500 کاراکتر است.")
    .test(
      "no-forbidden-chars",
      "نام تگ شامل کاراکتر غیرمجاز است.",
      (value) => { return !value || !forbiddenRegex.test(value); }
    ),
  order: yup
    .number()
    .transform((value, originalValue) => { return (originalValue === "" ? undefined : value); })
    .typeError("اولویت باید عدد باشد.")
    .min(0, "اولویت نمی‌تواند عدد منفی باشد.")
    .optional()
    .nullable(),
  description: yup
    .string()
    .nullable()
    .optional()
    .max(500, "توضیحات بیش از 500 کاراکتر است.")
    .test(
      "no-forbidden-chars",
      "توضیحات شامل کاراکتر غیرمجاز است.",
      (value) => { return !value || !forbiddenRegex.test(value); }
    ),
});
