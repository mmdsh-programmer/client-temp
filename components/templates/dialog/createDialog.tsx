import React from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import BackButton from "@components/atoms/button/backButton";
import CancelButton from "@components/atoms/button/cancelButton";
import CloseButton from "@components/atoms/button/closeButton";
import LoadingButton from "@components/molecules/loadingButton";
import { size } from "@material-tailwind/react/types/components/dialog";
import RenderIf from "@components/atoms/renderIf";

export interface IProps {
  isPending: boolean;
  children: React.ReactNode;
  dialogHeader?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => Promise<void>;
  className?: string;
  backToMain?: boolean;
  customSize?: size;
  showFooter?: boolean;
}

const CreateDialog = ({
  isPending,
  children,
  dialogHeader,
  setOpen,
  onSubmit,
  className,
  backToMain,
  customSize,
  showFooter = true,
}: IProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <Dialog
      placeholder=""
      size={customSize || "sm"}
      open
      handler={handleClose}
      className={`${className} flex flex-col !rounded-none shrink-0 h-full w-full max-w-full xs:h-auto xs:min-w-[400px] xs:max-w-[400px] bg-primary xs:!rounded-lg `}
      onClick={handleBackdropClick}
      dismiss={{
        enabled: false,
      }}
    >
      <DialogHeader
        placeholder="dialog header"
        className="dialog-header flex items-center xs:justify-between gap-[10px] xs:gap-0 px-[6px] xs:px-6 py-[6px] xs:py-5 border-b-none xs:border-b-[0.5px] border-normal"
      >
        <div className="block xs:hidden">
          <BackButton onClick={handleClose} disabled={isPending} />
        </div>
        <div className="flex items-center">
          {backToMain ? (
            <div className="hidden xs:block">
              <BackButton
                className="!pl-2 !pr-0 !py-0"
                onClick={handleClose}
                disabled={isPending}
              />
            </div>
          ) : null}
          <Typography className="form__title">{dialogHeader}</Typography>
        </div>
        <div className="hidden xs:block">
          <CloseButton onClose={handleClose} disabled={isPending} />
        </div>
      </DialogHeader>
      <div className="block xs:hidden h-2 w-full bg-secondary" />
      <DialogBody
        placeholder="dialog body"
        className="dialog-body flex-grow px-5 py-3 xs:p-6 overflow-auto"
      >
        {children}
      </DialogBody>
      <RenderIf isTrue={showFooter}>
        <DialogFooter
          placeholder="dialog footer"
          className="dialog-footer p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
        >
          <CancelButton onClick={handleClose} disabled={isPending}>
            انصراف
          </CancelButton>
          <LoadingButton
            className="dialog-footer__submit-button bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
            onClick={onSubmit}
            loading={isPending}
          >
            <Typography className="text__label__button text-white">
              ایجاد
            </Typography>
          </LoadingButton>
        </DialogFooter>
      </RenderIf>
    </Dialog>
  );
};

export default CreateDialog;
