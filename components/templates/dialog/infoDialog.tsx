import React from "react";
import { Dialog, DialogHeader, Typography } from "@material-tailwind/react";
import CloseButton from "@components/atoms/button/closeButton";
import BackButton from "@components/atoms/button/backButton";

export interface IProps {
  children: React.ReactNode;
  dialogHeader?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const InfoDialog = ({ children, dialogHeader, setOpen, className }: IProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      placeholder=""
      size="sm"
      open={true}
      handler={handleClose}
      className={`${className} flex flex-col h-full w-full max-w-full xs:h-auto xs:min-w-[400px] xs:max-w-[400px] bg-primary rounded-none xs:rounded-lg `}
    >
      <DialogHeader
        placeholder="dialog header"
        className="flex items-center xs:justify-between gap-[10px] xs:gap-0 px-[6px] xs:px-6 py-[6px] xs:py-5 border-b-none xs:border-b-[0.5px] border-normal"
      >
        <div className="block xs:hidden">
          <BackButton onClick={handleClose} />
        </div>
        <Typography className="form__title">{dialogHeader}</Typography>
        <div className="hidden xs:block">
          <CloseButton onClose={handleClose} />
        </div>
      </DialogHeader>
      <div className="block xs:hidden h-2 w-full bg-secondary" />
      <>{children}</>
    </Dialog>
  );
};

export default InfoDialog;
