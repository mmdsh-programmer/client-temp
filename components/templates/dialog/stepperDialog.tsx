import React from "react";
import { Dialog, DialogHeader, Typography } from "@material-tailwind/react";
import BackButton from "@components/atoms/button/backButton";
import CloseButton from "@components/atoms/button/closeButton";
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
      className={`flex flex-col shrink-0 !h-full w-full max-w-full xs:!h-[630px] xs:min-w-[400px] xs:max-w-[400px] bg-primary rounded-none xs:rounded-lg ${className || ""}`}
      dismiss={{
        enabled: false,
      }}
    >
      <DialogHeader
        placeholder="dialog header"
        className="dialog-header flex items-center xs:justify-between gap-[10px] xs:gap-0 px-[6px] xs:px-6 py-[6px] xs:py-5 border-b-none xs:border-b-[0.5px] border-normal"
      >
        <div className="block xs:hidden">
          <BackButton onClick={handleClose} />
        </div>
        <Typography className="form__title">{dialogHeader}</Typography>
        <div className="hidden xs:block">
          <CloseButton onClose={handleClose} />
        </div>
      </DialogHeader>
      <div className="flex flex-col gap-4 h-full">
        <div className="w-full px-8 py-4">
          <StepperComponent getActiveStep={activeStep} stepList={stepList} />
        </div>
        <div className="flex-grow flex flex-col justify-between">
          {children}
        </div>
      </div>
    </Dialog>
  );
};

export default StepperDialog;
