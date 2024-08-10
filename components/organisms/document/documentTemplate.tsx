import React from "react";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import { DialogBody, DialogFooter, Typography } from "@material-tailwind/react";
import CancelButton from "@components/atoms/button/cancelButton";
import LoadingButton from "@components/molecules/loadingButton";
import DocumentTemplateTree from "./documentTemplateTree";

const DocumentTemplate = () => {
  const { handleNextStep, handlePrevStep } = useStepperNavigate();
  return (
    <>
      <DialogBody
        placeholder="dialog body" 
        className="flex-grow px-5 py-3 xs:p-6 "
      >
        <div className="flex flex-col gap-2">
          <Typography className="label">انتخاب نمونه سند</Typography>
          <DocumentTemplateTree />
        </div>
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <CancelButton onClick={handlePrevStep}>انصراف</CancelButton>
        <LoadingButton
          className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={() => {
            handleNextStep();
          }}
        >
          <Typography className="text__label__button text-white">
            ادامه
          </Typography>
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default DocumentTemplate;
