import {
 DialogFooter,
 Typography
} from "@material-tailwind/react";

import CancelButton from "@components/atoms/button/cancelButton";
import LoadingButton from "../loadingButton";
import React from "react";

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
      className="dialog-footer p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
    >
      <CancelButton onClick={handlePreviousStep}>
        {hasPreviousStep ? " مرحله‌ قبلی" : "انصراف"}
      </CancelButton>
      <LoadingButton
        className="dialog-footer__submit-button bg-secondary hover:bg-secondary active:bg-secondary"
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
