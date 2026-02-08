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
import BackButton from "@components/atoms/button/backButton";

export interface IProps {
  isPending: boolean;
  children: React.ReactNode;
  dialogHeader?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
  className?: string;
  isArchive?: boolean;
  backToMain?: boolean;
  disabled?: boolean;
}

const DeleteDialog = ({
  isPending,
  children,
  dialogHeader,
  setOpen,
  onSubmit,
  className,
  isArchive,
  backToMain,
  disabled,
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
      className={`${className} delete-dialog -mb-[60dvh] flex w-auto min-w-[90%] max-w-[90%] flex-col rounded-lg bg-white xs:mb-0 xs:min-w-[400px] xs:max-w-[400px]`}
      dismiss={{
        enabled: false,
      }}
      {...({} as Omit<React.ComponentProps<typeof Dialog>, "placeholder" | "open" | "handler">)}
    >
      <DialogHeader
        placeholder="dialog header"
        className="dialog-header border-b-none flex items-center justify-between border-normal px-5 pb-4 pt-5 xs:border-b-[0.5px] xs:px-6 xs:py-5"
        {...({} as Omit<React.ComponentProps<typeof DialogHeader>, "placeholder">)}
      >
        <div className="flex items-center">
          {backToMain ? (
            <div className="dialog-header__back-button">
              <BackButton
                className="!py-0 !pl-2 !pr-0"
                onClick={handleClose}
                disabled={isPending}
              />
            </div>
          ) : null}
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form__title">
            {dialogHeader}
          </Typography>
        </div>
        <div className="hidden xs:block">
          <CloseButton onClose={handleClose} disabled={isPending} />
        </div>
      </DialogHeader>
      <DialogBody
        placeholder="dialog body"
        className="dialog-body flex-grow px-5 py-3 xs:p-6"
        {...({} as Omit<React.ComponentProps<typeof DialogBody>, "placeholder">)}
      >
        {children}
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="dialog-footer border-t-none flex gap-2 border-normal p-5 xs:gap-3 xs:border-t-[0.5px] xs:px-6 xs:py-4"
        {...({} as Omit<React.ComponentProps<typeof DialogFooter>, "placeholder">)}
      >
        <CancelButton onClick={handleClose} disabled={isPending}>
          انصراف
        </CancelButton>
        <LoadingButton
          className="dialog-footer__submit-button bg-error hover:bg-error active:bg-error"
          onClick={onSubmit}
          loading={isPending}
          isPrimary={false}
          disabled={disabled}
        >
          <Typography
            className="text__label__button text-white"
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            {isArchive ? "آرشیو" : "حذف"}
          </Typography>
        </LoadingButton>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteDialog;
