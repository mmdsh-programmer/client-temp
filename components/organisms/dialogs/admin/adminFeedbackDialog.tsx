import { DialogBody, Spinner, Typography } from "@material-tailwind/react";

import { DocIcon } from "@components/atoms/icons";
import { IOffer } from "@interface/offer.interface";
import InfoDialog from "@components/templates/dialog/infoDialog";
import React from "react";
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
        <Spinner className="h-4 w-4" color="purple" />
      </div>
    );
  }

  return (
    <InfoDialog setOpen={setOpen} dialogHeader="مشاهده بازخورد">
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6"
      >
        <div className="flex flex-col gap-4">
          <Typography className="body_b3 text-primary_normal">
            {feedback?.data.message}
          </Typography>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
            {feedback?.data.fileHash.map((item, index) => {
              return (
                <div
                  className="flex items-center gap-1 border-2 border-normal p-2 rounded-lg"
                  key={item}
                >
                  <DocIcon className="w-5 h-5 fill-info" />
                  <Typography className="caption_c1">{`فایل ${index + 1}`}</Typography>
                  <span className="">.</span>
                  <a
                    className="caption_c2 text-info"
                    target="_blank"
                    href={`${
                      process.env.NEXT_PUBLIC_PODSPACE_API
                    }/files/${item}?&checkUserGroupAccess=true&Authorization=${userInfo?.access_token}&time=${Date.now()}`}
                    rel="noreferrer"
                  >
                    دانلود فایل
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </DialogBody>
    </InfoDialog>
  );
};

export default AdminFeedbackDialog;
