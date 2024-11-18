import React from "react";
import { Dialog, DialogHeader, Typography } from "@material-tailwind/react";
import BackButton from "@components/atoms/button/backButton";
import CloseButton from "@components/atoms/button/closeButton";
import PublishComments from "@components/organisms/publishFeedback/PublishComments";

interface IProps {
  postId: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CommentDialog = ({ postId, setOpen }: IProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog placeholder="" size="lg" open handler={handleClose}>
      <DialogHeader
        placeholder="dialog header"
        className="flex items-center justify-between gap-[10px] xs:gap-0 pr-1 pl-4 xs:px-6 py-[6px] xs:py-5 border-b-none xs:border-b-[0.5px] border-normal"
      >
        <div className="flex items-center">
          <div className="block xs:hidden">
            <BackButton onClick={handleClose} />
          </div>
          <Typography className="form__title">دیدگاه کاربران</Typography>
        </div>
        <CloseButton onClose={handleClose} />
      </DialogHeader>
      <div className="block xs:hidden h-2 w-full bg-secondary" />
      <div className="max-h-[500px] overflow-y-auto">
        <PublishComments isQuestionAnswerComments postId={postId} />
      </div>
    </Dialog>
  );
};

export default CommentDialog;
