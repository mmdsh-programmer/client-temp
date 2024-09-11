import React from "react";
import CancelButton from "@components/atoms/button/cancelButton";
import { DialogFooter, Typography } from "@material-tailwind/react";
import LoadingButton from "../loadingButton";

interface IProps {
  hasPreviousStep: boolean;
  hasNextStep: boolean;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
  loading?: boolean;
}

const DialogStepperFooter = ({
  handlePreviousStep,
  hasNextStep,
  hasPreviousStep,
  handleNextStep,
  loading,
}: IProps) => {
  return (
    <DialogFooter
      placeholder="dialog footer"
      className="p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
    >
      <CancelButton onClick={handlePreviousStep}>
        {hasPreviousStep ? " مرحله‌ قبلی" : "انصراف"}
      </CancelButton>
      <LoadingButton
        className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
        onClick={handleNextStep}
        loading={loading}
      >
        <Typography className="text__label__button text-white">
          {hasNextStep ? "ادامه" : "ایجاد"}
        </Typography>
      </LoadingButton>
    </DialogFooter>
  );
};

export default DialogStepperFooter;
