import React from "react";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { Button, DialogBody, Typography } from "@material-tailwind/react";
import { IAccessRequest } from "@interface/accessRequest.interface";

interface IProps {
  repo: IAccessRequest;
  setAcceptedRepo: React.Dispatch<React.SetStateAction<IAccessRequest | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const JoinToRepoDialog = ({ repo, setAcceptedRepo, setOpen }: IProps) => {
  const handleClose = () => {
    setAcceptedRepo(null);
  };

  return (
    <InfoDialog
      setOpen={handleClose}
      dialogHeader="لیست درخواست‌ها"
      className="join-to-repo-requests__dialog xs:!min-w-[450px] xs:!max-w-[450px]"
      backToMain
    >
      <DialogBody
        placeholder="dialog body"
        className="h-[200px] flex-grow overflow-auto px-5 py-3 xs:p-6"
      >
        <div className="flex flex-col gap-6">
          <Typography className="title_t2 text-primary_normal">
            {`شما با موفقیت به مخزن ${repo.repoName} پیوستید.`}
          </Typography>
          <Button
            className="text__label__button w-fit bg-transparent p-0 !text-[12px] text-[#0C8CE9]"
            onClick={() => {
              handleClose();
              setOpen(false);
              setTimeout(() => {
                window.location.href = `/admin/repositories?repoId=${repo.repoId}`;
              }, 100);
            }}
          >
            لینک ورود به مخزن
          </Button>
        </div>
      </DialogBody>
    </InfoDialog>
  );
};

export default JoinToRepoDialog;
