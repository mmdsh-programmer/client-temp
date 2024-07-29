import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    Typography,
} from "@material-tailwind/react";
import { XIcon } from "@components/atoms/icons";
import StepperComponent from "@components/molecules/stepper";

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
      className="p-5 rounded-none h-full max-w-full w-full xs:rounded-md xs:max-h-[600px] xs:h-[80%] xs:max-w-[66%] md-max-w-[40%] flex flex-col"
    >
      <DialogHeader
        placeholder="dialog header"
        className="flex items-center justify-between p-0"
      >
        <Typography
          placeholder=""
          className="text-primary text-base font-bold font-iranYekan"
        >
          {dialogHeader}
        </Typography>
        <Button
          placeholder="close button"
          className="bg-transparent shadow-none hover:shadow-none p-0"
          onClick={handleClose}
        >
          <XIcon className="fill-gray-200 w-7 h-7" />
        </Button>
      </DialogHeader>
      <div className="w-full px-2 xs:px-8 py-4">
        <StepperComponent getActiveStep={activeStep} stepList={stepList} />
      </div>
      <div className="mt-12 h-full flex flex-col justify-between">{children}</div>
    </Dialog>
  );
};

export default StepperDialog;
