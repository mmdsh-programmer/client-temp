import React from "react";
import { Dialog, DialogFooter, DialogBody, DialogHeader, Typography } from "@material-tailwind/react";
import LoadingButton from "@components/molecules/loadingButton";
import CloseButton from "@components/atoms/button/closeButton";
import CancelButton from "@components/atoms/button/cancelButton";
import BackButton from "@components/atoms/button/backButton";

interface IProps {
  isPending: boolean;
  children: React.ReactNode;
  dialogHeader?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => Promise<void>;
  className?: string;
  backToMain?: boolean;
}

const ConfirmDialog = ({
  isPending,
  children,
  dialogHeader,
  setOpen,
  onSubmit,
  className,
  backToMain,
}: IProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      placeholder=""
      size="sm"
      open
      handler={handleClose}
      className={`${className}  rounded-lg flex flex-col bg-primary w-auto min-w-[90%] max-w-[90%] xs:min-w-[400px] xs:max-w-[400px] -mb-[60vh] xs:mb-0 `}
    >
      <DialogHeader
        placeholder="dialog header"
        className="flex items-center justify-between px-5 pt-5 pb-4 xs:py-5 xs:px-6 border-b-none xs:border-b-[0.5px] border-normal"
      >
        <div className="flex items-center">
          {backToMain ? (
            <div className="">
              <BackButton
                className="!pl-2 !pr-0 !py-0"
                onClick={handleClose}
                disabled={isPending}
              />
            </div>
          ) : null}
          <Typography className="form__title">{dialogHeader}</Typography>{" "}
        </div>
        <div className="hidden xs:block">
          <CloseButton onClose={handleClose} disabled={isPending} />
        </div>
      </DialogHeader>
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6"
      >
        <div className="body_b3 flex text-primary">{children}</div>
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <CancelButton onClick={handleClose} disabled={isPending}>
          انصراف
        </CancelButton>
        <LoadingButton
          className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={onSubmit}
          loading={isPending}
        >
          <Typography className="text__label__button text-white">
            تایید
          </Typography>
        </LoadingButton>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmDialog;
