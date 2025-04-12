import React from "react";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import { DialogBody, Typography } from "@material-tailwind/react";
import DialogStepperFooter from "@components/molecules/stepperDialogFooter";
import ChildrenTree from "@components/organisms/childrenTree";

const DocumentTemplate = () => {
  const { handleNextStep, handlePrevStep } = useStepperNavigate();
  return (
    <>
      <DialogBody
        placeholder="dialog body"
        className="dialog-body flex-grow px-5 py-3 xs:p-6 "
      >
        <div className="document-template flex flex-col gap-2">
          <Typography className="form_label">انتخاب نمونه سند</Typography>
          <ChildrenTree move={false} enableAction={false} />
        </div>
      </DialogBody>
      <DialogStepperFooter
        hasNextStep
        hasPreviousStep
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePrevStep}
      />
    </>
  );
};

export default DocumentTemplate;
