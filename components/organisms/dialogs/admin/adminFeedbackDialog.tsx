import React from "react";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { IOffer } from "@interface/offer.interface";
import { Spinner, Typography } from "@material-tailwind/react";
import { DocIcon } from "@components/atoms/icons";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  feedback?: IOffer;
}

const AdminFeedbackDialog = ({ setOpen, feedback }: IProps) => {
  const { data: userInfo, isFetching } = useGetUser();

  if (isFetching) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner className="h-4 w-4" color="deep-purple" />
      </div>
    );
  }

  return (
    <InfoDialog setOpen={setOpen} dialogHeader="مشاهده بازخورد">
      <div className="flex flex-col gap-4">
        <Typography className="caption_c1">{feedback?.data.message}</Typography>
        <div className="block xs:hidden h-[1px] w-full bg-secondary" />
        {feedback?.data.fileHash.map((item, index) => {
          return (
            <div
              className="flex items-center bg-neutral-content border-solid border border-gray-300 px-3 py-2 rounded-lg"
              key={item}
            >
              <DocIcon className="w-5 h-5 fill-info" />
              <span className=" text-sm mr-3">{`فایل ${index + 1}`}</span>
              <span className="mx-2">.</span>
              <a
                className="text-sm text-info"
                target="_blank"
                href={`${
                  process.env.NEXT_PUBLIC_PODSPACE_API
                }files/${item}?&checkUserGroupAccess=true&Authorization=${userInfo?.access_token}&time=${Date.now()}`}
                rel="noreferrer"
              >
                دانلود فایل
              </a>
            </div>
          );
        })}
      </div>
    </InfoDialog>
  );
};

export default AdminFeedbackDialog;
