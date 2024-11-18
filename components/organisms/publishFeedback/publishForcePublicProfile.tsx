import LoadingButton from "@components/molecules/loadingButton";
import useEditSocialProfile from "@hooks/auth/useEditSocialProfile";
import { Typography } from "@material-tailwind/react";
import React from "react";
import { toast } from "react-toastify";

interface IProps {
  customText?: string;
}

const PublishForcePublicProfile = ({ customText }: IProps) => {
  const editSocialProfile = useEditSocialProfile();

  const handlePublicUserProfile = () => {
    editSocialProfile.mutate({
      isPrivate: false,
      callBack: () => {
        toast.success("پروفایل شما با موفقیت عمومی شد.");
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <Typography className="text-sm text-gray-800 font-bold">
        {customText || "برای پرسیدن سوال باید پروفایل کاربری شما عمومی باشد"}
      </Typography>

      <LoadingButton
        className="flex justify-center items-center !px-2 py-5 rounded-lg lg:mt-0 bg-purple-normal text-white font-iranYekan !max-h-[unset] !w-fit"
        onClick={handlePublicUserProfile}
        disabled={editSocialProfile.isPending}
        loading={editSocialProfile.isPending}
      >
        عمومی سازی پروفایل کاربری
      </LoadingButton>
    </div>
  );
};

export default PublishForcePublicProfile;
