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
import React from "react";

export interface IProps {
  isPending: boolean;
  children: React.ReactNode;
  dialogHeader?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => Promise<void>;
  className?: string;
  disabled?: boolean;
  backToMain?: boolean;
  bodyClassName?: string;
}

const ConfirmFullHeightDialog = ({
  isPending,
  children,
  dialogHeader,
  setOpen,
  onSubmit,
  className,
  disabled,
  backToMain,
  bodyClassName,
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
      className={`${className} m-0 flex !h-dvh w-full max-w-full shrink-0 flex-col rounded-none bg-white xs:!h-auto xs:min-w-[400px] xs:max-w-[400px] xs:rounded-lg`}
      dismiss={{
        enabled: false,
      }}
      {...({} as Omit<React.ComponentProps<typeof Dialog>, "placeholder" | "open" | "handler">)}
    >
      <DialogHeader
        placeholder="dialog header"
        className="dialog-header border-b-none flex items-center gap-[10px] border-normal px-[6px] py-[6px] xs:justify-between xs:gap-0 xs:border-b-[0.5px] xs:px-6 xs:py-5"
        {...({} as Omit<React.ComponentProps<typeof DialogHeader>, "placeholder">)}
      >
        <div className="block xs:hidden">
          <BackButton onClick={handleClose} disabled={isPending} />
        </div>
        <div className="flex items-center">
          {backToMain ? (
            <div className="hidden xs:block">
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
      <div className="block h-2 w-full bg-secondary xs:hidden" />
      <DialogBody
        placeholder="dialog body"
        className={`${bodyClassName || ""} dialog-body flex-grow overflow-auto px-5 py-3 xs:p-6`}
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
          className="dialog-footer__submit-button bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
          onClick={onSubmit}
          loading={isPending}
          disabled={disabled}
        >
          <Typography
            className="text__label__button text-white"
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            تایید
          </Typography>
        </LoadingButton>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmFullHeightDialog;
