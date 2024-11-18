import React from "react";
import { login } from "@actions/auth";
import LoadingButton from "@components/molecules/loadingButton";
import { Typography } from "@material-tailwind/react";

interface IProps {
  customText?: string;
}

const PublishForceLogin = ({ customText }: IProps) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <Typography className="text-sm text-gray-800 font-bold">
        {customText ||
          "برای پرسیدن سوال باید وارد پنل کاربری یا در سایت عضو شوید"}
      </Typography>

      <LoadingButton
        className="flex justify-center items-center px-10 py-5 rounded-lg lg:mt-0 bg-purple-normal text-white font-iranYekan !max-h-[unset]"
        onClick={() => {
          window.localStorage.setItem(
            "CLASOR:LAST_PAGE",
            window.location.pathname
          );
          return login();
        }}
      >
        ورود به پنل
      </LoadingButton>
    </div>
  );
};

export default PublishForceLogin;
