import React from "react";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { Button } from "@components/ui/button";
import { IAccessRequest } from "@interface/accessRequest.interface";
import { CopyIcon } from "@components/atoms/icons";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";

interface IProps {
  repo: IAccessRequest;
  setAcceptedRepo: React.Dispatch<React.SetStateAction<IAccessRequest | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const JoinToRepoDialog = ({ repo, setAcceptedRepo, setOpen }: IProps) => {
  const handleClose = () => {
    setAcceptedRepo(null);
    setOpen(false);
  };

  return (
    <InfoDialog
      onOpenChange={handleClose}
      trigger={null}
      dialogHeader="لیست درخواست‌ها"
      className="join-to-repo-requests__dialog xs:!min-w-[450px] xs:!max-w-[450px]"
      backToMain
    >
      <div className="h-[200px] flex-grow overflow-auto px-5 py-3 xs:p-6">
        <div className="flex flex-col gap-4">
          <h2 className="title_t2 text-primary_normal">
            {`شما با موفقیت به مخزن ${repo.repoName} پیوستید.`}
          </h2>
          <div className="flex flex-col gap-2">
            <label className="form_label">لینک ورود به مخزن</label>
            <div className="flex h-10 flex-grow items-center justify-between gap-2 overflow-hidden rounded-lg border-[1px] border-normal bg-gray-50 pl-2 pr-3">
              <p
                className="font-300 w-full cursor-pointer truncate text-sm text-placeholder"
                dir="ltr"
              >
                {`${window.location.origin}/admin/repositories?repoId=${repo.repoId}`}
              </p>
              <div className="flex items-center">
                <Button
                  className="repo-link-wrapper__copy-link-button h-7 w-8 rounded-none bg-white p-0"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    copy(`${window.location.origin}/admin/repositories?repoId=${repo.repoId}`);
                    toast.success("لینک مخزن کپی شد");
                  }}
                >
                  <CopyIcon className="h-4 w-4 fill-icon-active" />
                </Button>
              </div>
            </div>
          </div>
          <Button
            className="text__label__button w-fit bg-transparent p-0 !text-[12px] text-[#0C8CE9] hover:bg-transparent"
            variant="ghost"
            onClick={() => {
              handleClose();
              setOpen(false);
              setTimeout(() => {
                window.location.href = `/admin/repositories?repoId=${repo.repoId}`;
              }, 100);
            }}
          >
            ورود به مخزن
          </Button>
        </div>
      </div>
    </InfoDialog>
  );
};

export default JoinToRepoDialog;
