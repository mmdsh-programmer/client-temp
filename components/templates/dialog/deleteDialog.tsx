import React from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import CancelButton from "@components/atoms/button/cancelButton";
import CloseButton from "@components/atoms/button/closeButton";
import LoadingButton from "@components/molecules/loadingButton";

export interface IProps {
  isPending: boolean;
  children: React.ReactNode;
  dialogHeader?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
  className?: string;
  isArchive?: boolean;
}

const DeleteDialog = ({
  isPending,
  children,
  dialogHeader,
  setOpen,
  onSubmit,
  className,
  isArchive,
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
      className={`${className} delete-dialog rounded-lg flex flex-col bg-white w-auto min-w-[90%] max-w-[90%] xs:min-w-[400px] xs:max-w-[400px] xs:mb-0`}
      dismiss={{
        enabled: false,
      }}
    >
      <DialogHeader
        placeholder="dialog header"
        className="dialog-header flex items-center justify-between px-5 pt-5 pb-4 xs:py-5 xs:px-6 border-b-none xs:border-b-[0.5px] border-normal"
      >
        <Typography className="form__title">{dialogHeader}</Typography>
        <CloseButton onClose={handleClose} disabled={isPending} />
      </DialogHeader>
      <DialogBody
        placeholder="dialog body"
        className="dialog-body flex-grow px-5 py-3 xs:p-6"
      >
        {children}
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="dialog-footer p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <CancelButton onClick={handleClose} disabled={isPending}>
          انصراف
        </CancelButton>
        <LoadingButton
          className="dialog-footer__submit-button bg-error hover:bg-error active:bg-error"
          onClick={onSubmit}
          loading={isPending}
          isPrimary={false}
        >
          <Typography className="text__label__button text-white">
            {isArchive ? "آرشیو" : "حذف"}
          </Typography>
        </LoadingButton>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteDialog;
