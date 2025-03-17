import * as yup from "yup";

export const partySchema = yup
  .object()
  .shape({
    members: yup.array().required("لطفا اعضا را وارد کنید."),
  })
  .required();
