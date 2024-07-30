import React from "react";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import { DialogBody, DialogFooter } from "@material-tailwind/react";
import Label from "@components/atoms/typograghy/label";
import CancelButton from "@components/atoms/button/cancelButton";
import LoadingButton from "@components/molecules/loadingButton";
import Text from "@components/atoms/typograghy/text";
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
          <Label>انتخاب نمونه سند</Label>
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
          <Text className="text-[12px] font-medium leading-[18px] -tracking-[0.12px] text-white">
            ادامه
          </Text>
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default DocumentTemplate;
