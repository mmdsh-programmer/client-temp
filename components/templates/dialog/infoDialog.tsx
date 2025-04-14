import React from "react";
import { Dialog, DialogHeader, Typography } from "@material-tailwind/react";
import CloseButton from "@components/atoms/button/closeButton";
import BackButton from "@components/atoms/button/backButton";
import { size } from "@material-tailwind/react/types/components/dialog";

export interface IProps {
  children: React.ReactNode;
  dialogHeader?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  customSize?: size;
}

const InfoDialog = ({
  children,
  dialogHeader,
  setOpen,
  className,
  customSize,
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
      className={`${className} flex flex-col h-full w-full max-w-full xs:h-auto xs:min-w-[400px] xs:max-w-[400px] bg-primary rounded-none xs:rounded-lg `}
    >
      <DialogHeader
        placeholder="dialog header"
        className="dialog-header flex items-center justify-between gap-[10px] xs:gap-0 pr-1 pl-4 xs:px-6 py-[6px] xs:py-5 border-b-none xs:border-b-[0.5px] border-normal"
      >
        <div className="flex items-center">
          <div className="block xs:hidden">
            <BackButton onClick={handleClose} />
          </div>
          <Typography
            className="form__title truncate flex-grow"
            title={dialogHeader}
          >
            {dialogHeader}
          </Typography>
        </div>
        <CloseButton onClose={handleClose} />
      </DialogHeader>
      <div className="block xs:hidden h-2 w-full bg-secondary" />
      {children}
    </Dialog>
  );
};

export default InfoDialog;
