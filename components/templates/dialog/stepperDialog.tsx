import { Dialog, DialogHeader, Typography } from "@material-tailwind/react";

import BackButton from "@components/atoms/button/backButton";
import CloseButton from "@components/atoms/button/closeButton";
import React from "react";
import StepperComponent from "@components/molecules/stepper";

interface IProps {
  dialogHeader: string;
  stepList: string[];
  activeStep: number;
  handleClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const StepperDialog = ({
  handleClose,
  children,
  dialogHeader,
  stepList,
  activeStep,
  className,
}: IProps) => {
  return (
    <Dialog
      placeholder="stepper-dialog"
      size="sm"
      open
      handler={handleClose}
      className={`flex !h-dvh m-0 w-full max-w-full shrink-0 flex-col rounded-none bg-white xs:!h-[630px] xs:min-w-[400px] xs:max-w-[400px] xs:rounded-lg ${className || ""}`}
      dismiss={{
        enabled: false,
      }}
    >
      <DialogHeader
        placeholder="dialog header"
        className="dialog-header border-b-none flex items-center gap-[10px] border-normal px-[6px] py-[6px] xs:justify-between xs:gap-0 xs:border-b-[0.5px] xs:px-6 xs:py-5"
      >
        <div className="block xs:hidden">
          <BackButton onClick={handleClose} />
        </div>
        <Typography className="form__title">{dialogHeader}</Typography>
        <div className="hidden xs:block">
          <CloseButton onClose={handleClose} />
        </div>
      </DialogHeader>
      <div className="block h-2 w-full bg-secondary xs:hidden" />
      <div className="flex flex-col gap-4 h-[calc(100dvh-60px)]">
        <div className="w-full px-8 py-4">
          <StepperComponent getActiveStep={activeStep} stepList={stepList} />
        </div>
        <div className="flex flex-grow flex-col justify-between overflow-auto !h-[calc(100dvh-150px)] xs:!h-max">
          {children}
        </div>
      </div>
    </Dialog>
  );
};

export default StepperDialog;
