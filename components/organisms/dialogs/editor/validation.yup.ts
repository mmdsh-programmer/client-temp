import * as yup from "yup";

export const keySchema = yup.object().shape({
  privateKey: yup.string().required("کلید خصوصی برای نمایش محتوا اجباریست"),
});
