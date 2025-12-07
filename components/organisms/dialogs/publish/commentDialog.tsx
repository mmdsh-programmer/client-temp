import React from "react";
import { Dialog, DialogHeader, Typography } from "@material-tailwind/react";
import BackButton from "@components/atoms/button/backButton";
import CloseButton from "@components/atoms/button/closeButton";
import PublishComments from "@components/organisms/publishFeedback/publishComments";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
  repoId: number;
  documentId: number;
}

const CommentDialog = ({ repoId, documentId, setOpen }: IProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog {...({} as React.ComponentProps<typeof Dialog>)} size="lg" open handler={handleClose}>
      <DialogHeader
        {...({} as React.ComponentProps<typeof DialogHeader>)}
        className="border-b-none flex items-center justify-between gap-[10px] border-normal bg-white py-[6px] pl-4 pr-1 xs:gap-0 xs:border-b-[0.5px] xs:px-6 xs:py-5"
      >
        <div className="flex items-center">
          <div className="block xs:hidden">
            <BackButton onClick={handleClose} />
          </div>
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form__title">
            دیدگاه کاربران
          </Typography>
        </div>
        <CloseButton onClose={handleClose} />
      </DialogHeader>
      <div className="block h-2 w-full bg-secondary xs:hidden" />
      <div className="max-h-[500px] overflow-y-auto">
        <PublishComments repoId={repoId} documentId={documentId} />
      </div>
    </Dialog>
  );
};

export default CommentDialog;
