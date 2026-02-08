import * as yup from "yup";

// eslint-disable-next-line no-useless-escape
const forbiddenRegex = /^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$/;

export const userGroupSchema = yup
  .object()
  .shape({
    title: yup.string().required("لطفا نام گروه را وارد کنید.")
      .max(500, "نام گروه بیش از 500 کاراکتر است.")
      .test(
        "no-forbidden-chars",
        "نام گروه شامل کاراکتر غیرمجاز است.",
        (value) => {
          if (!value) return true;
          return !forbiddenRegex.test(value);
        }
      ),
    description: yup
      .string()
      .nullable()
      .optional()
      .max(500, "توضیحات گروه بیش از 500 کاراکتر است.")
      .test(
        "no-forbidden-chars",
        "توضیحات گروه شامل کاراکتر غیرمجاز است.",
        (value) => {
          if (!value) return true;
          return !forbiddenRegex.test(value);
        }
      ),
    members: yup.array()
      .required("لطفا اعضا را وارد کنید.")
      .min(1, "لیست اعضای گروه نباید خالی باشد.")
  })
  .required();
