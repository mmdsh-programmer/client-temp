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
      {...({} as Omit<React.ComponentProps<typeof DialogFooter>, "placeholder">)}
    >
      <CancelButton onClick={handlePreviousStep}>
        {hasPreviousStep ? " مرحله‌ قبلی" : "انصراف"}
      </CancelButton>
      <LoadingButton
        className="dialog-footer__submit-button bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
        onClick={handleNextStep}
        loading={loading}
      >
        <Typography {...({} as React.ComponentProps<typeof Typography>)} className="text__label__button text-white">
          {hasNextStep ? "ادامه" : "ایجاد"}
        </Typography>
      </LoadingButton>
    </DialogFooter>
  );
};

export default DialogStepperFooter;
