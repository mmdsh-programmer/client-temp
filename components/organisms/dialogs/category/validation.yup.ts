import * as yup from "yup";

// eslint-disable-next-line no-useless-escape
const forbiddenRegex = /^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$/;

export const categorySchema = yup
  .object()
  .shape({
    name: yup.string().required("لطفا نام را وارد کنید.")
      .max(500, "نام دسته بندی بیش از 500 کاراکتر است.")
      .test(
        "no-forbidden-chars",
        "نام دسته بندی شامل کاراکتر غیرمجاز است.",
        (value) => {
          if (!value) return true;
          return !forbiddenRegex.test(value);
        }
      ),
    description: yup
      .string()
      .optional()
      .max(500, "توضیحات دسته بندی بیش از 500 کاراکتر است.")
      .test(
        "no-forbidden-chars",
        " توضیحات دسته بندی شامل کاراکتر غیرمجاز است.",
        (value) => {
          if (!value) return true;
          return !forbiddenRegex.test(value);
        }
      ),
  })
  .required();

export const fileVersionScheme = yup
  .object()
  .shape({
    versionNumber: yup.string().required("لطفا شماره نسخه فایل را وارد کنید!"),
  })
  .required();

export const blockUserSchema = yup
  .object()
  .shape({
    username: yup.string().required("لطفا نام کاربری را وارد کنید!"),
  })
  .required();
