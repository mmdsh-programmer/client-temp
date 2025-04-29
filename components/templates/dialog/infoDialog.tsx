import { Dialog, DialogHeader, Typography } from "@material-tailwind/react";

import BackButton from "@components/atoms/button/backButton";
import CloseButton from "@components/atoms/button/closeButton";
import React from "react";
import { size } from "@material-tailwind/react/types/components/dialog";

export interface IProps {
  children: React.ReactNode;
  dialogHeader?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  customSize?: size;
  backToMain?: boolean;
}

const InfoDialog = ({
  children,
  dialogHeader,
  setOpen,
  className,
  customSize,
  backToMain,
}: IProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      placeholder=""
      size={customSize || "sm"}
      open
      handler={handleClose}
      dismiss={{
        enabled: false,
      }}
      className={`${className} flex h-full w-full max-w-full flex-col rounded-none bg-white xs:h-auto xs:min-w-[400px] xs:max-w-[400px] xs:rounded-lg `}
    >
      <DialogHeader
        placeholder="dialog header"
        className="dialog-header border-b-none flex items-center justify-between gap-[10px] border-normal py-[6px] pl-4 pr-1 xs:gap-0 xs:border-b-[0.5px] xs:px-6 xs:py-5"
      >
        <div className="block xs:hidden">
          <BackButton onClick={handleClose} />
        </div>
        <div className="flex items-center">
          {backToMain ? (
            <div className="hidden xs:block">
              <BackButton className="!py-0 !pl-2 !pr-0" onClick={handleClose} />
            </div>
          ) : null}
          <Typography className="form__title">{dialogHeader}</Typography>
        </div>
        <div className="hidden xs:block">
          <CloseButton onClose={handleClose} />
        </div>
      </DialogHeader>
      <div className="block h-2 w-full bg-secondary xs:hidden" />
      {children}
    </Dialog>
  );
};

export default InfoDialog;
