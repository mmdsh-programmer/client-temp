import * as yup from "yup";

// eslint-disable-next-line no-useless-escape
const forbiddenRegex = /^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$/;

export const versionSchema = yup
  .object()
  .shape({
    versionNumber: yup.string().required("نسخه مورد نظر را وارد کنید.")
      .max(500, "نام نسخه بیش از 500 کاراکتر است.")
      .test(
        "no-forbidden-chars",
        "نام نسخه شامل کاراکتر غیرمجاز است.",
        (value) => {
          if (!value) return true;
          return !forbiddenRegex.test(value);
        }
      ),
  })
  .required();
