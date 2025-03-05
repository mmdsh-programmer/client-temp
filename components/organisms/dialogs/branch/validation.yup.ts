import * as yup from "yup";

export const createBranchSchema = yup
  .object()
  .shape({
    name: yup.string().required("لطفا نام شعبه را وارد کنید."),
    repoType: yup.string().required("لطفا نوع شعبه را انتخاب کنید"),
    username: yup.string().required("لطفا شناسه پادی را وارد کنید"),
  })
  .required();

  export const editBranchSchema = yup
  .object()
  .shape({
    name: yup.string().required("لطفا نام شعبه را وارد کنید."),
    username: yup.string().required("لطفا شناسه پادی را وارد کنید"),
  })
  .required();
