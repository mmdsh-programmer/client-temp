import React from "react";
import { Dialog, DialogHeader } from "@material-tailwind/react";
import StepperComponent from "@components/molecules/stepper";
import Title from "@components/atoms/typograghy/title";
import BackButton from "@components/atoms/button/backButton";
import CloseButton from "@components/atoms/button/closeButton";

interface IProps {
  dialogHeader: string;
  stepList: string[];
  activeStep: number;
  handleClose: () => void;
  children: React.ReactNode;
}

const StepperDialog = ({
  handleClose,
  children,
  dialogHeader,
  stepList,
  activeStep,
}: IProps) => {
  return (
    <Dialog
      placeholder="stepper-dialog"
      size="sm"
      open={true}
      handler={handleClose}
      className="flex flex-col shrink-0 !h-full w-full max-w-full xs:!h-[580px] xs:min-w-[400px] xs:max-w-[400px] bg-primary rounded-none xs:rounded-lg"
    >
      <DialogHeader
        placeholder="dialog header"
        className="flex items-center xs:justify-between gap-[10px] xs:gap-0 px-[6px] xs:px-6 py-[6px] xs:py-5 border-b-none xs:border-b-[0.5px] border-normal"
      >
        <div className="block xs:hidden">
          <BackButton onClick={handleClose} />
        </div>
        <Title>{dialogHeader} </Title>
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
