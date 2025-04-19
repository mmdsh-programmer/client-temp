import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";

import BackButton from "@components/atoms/button/backButton";
import CloseButton from "@components/atoms/button/closeButton";
import React from "react";

interface IProps {
  children: React.ReactNode;
  dialogHeader?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogClassName?: string;
  dialogBodyClassName?: string;
  handleSelect?: () => void;
}

const fileManagementDialog = ({
  children,
  dialogHeader,
  setOpen,
  dialogBodyClassName,
  dialogClassName,
  handleSelect,
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
      className={`file-management-dialog ${dialogClassName || ""}`}
      dismiss={{
        enabled: false,
      }}
    >
      <DialogHeader
        placeholder="dialog header"
        className="dialog-header flex items-center xs:justify-between gap-[10px] xs:gap-0 px-[6px] xs:px-6 py-2 border-b-none xs:border-b-[0.5px] border-normal"
      >
        <div className="flex items-center">
          <BackButton onClick={handleClose} />
          <Typography className="form__title">{dialogHeader}</Typography>
        </div>
        <div className="hidden xs:block">
          <CloseButton onClose={handleClose} />
        </div>
      </DialogHeader>
      <DialogBody
        placeholder="dialog body"
        className={`${dialogBodyClassName || ""} dialog-body`}
      >
        {children}
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="dialog-footer p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <Button
          placeholder=" button"
          variant="text"
          className="dialog-footer__submit-button flex justify-center items-center flex-1 xs:flex-0 w-full md:w-[100px] h-10 md:h-8 px-3 md:px-1 hover:bg-secondary bg-secondary active:bg-secondary "
          onClick={handleSelect}
        >
          <Typography
            placeholder=""
            className="text-[12px] font-medium leading-[18px] -tracking-[0.12px] text-white"
          >
            افزودن
          </Typography>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default fileManagementDialog;
