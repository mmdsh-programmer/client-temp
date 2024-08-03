import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { documentActiveStep } from "@atom/stepper";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import StepperDialog from "@components/templates/stepperDialog";
import DocumentType from "@components/organisms/document/documentType";
import DocumentInfo from "@components/organisms/document/documentInfo";
import DocumentVersion from "@components/organisms/document/documentVersion";
import DocumentTemplate from "@components/organisms/document/documentTemplate";
import DocumentEncryption from "../../document/documentEncryption";
import { repoAtom } from "@atom/repository";

interface IProps {
  isTemplate: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentCreate = ({ isTemplate, setOpen }: IProps) => {
  const [getActiveStep, setActiveStep] = useRecoilState(documentActiveStep);
  const getRepo = useRecoilValue(repoAtom);

  const repoId = getRepo!.id;
  const { close } = useStepperNavigate();
  const handleClose = () => {
    close();
    setOpen(false);
  };

  const stepList = isTemplate
    ? ["نوع سند", "عنوان و توضیحات سند", "نام نسخه سند"]
    : [
        "نوع سند",
        "عنوان و توضیحات سند",
        "نمونه سند",
        "رمز گذاری سند",
        "نام نسخه سند",
      ];

  const handleStepperContent = () => {
    if (getActiveStep === 0) {
      return <DocumentType isTemplate={isTemplate} setOpen={setOpen} />;
    }
    if (getActiveStep === 1) {
      return <DocumentInfo />;
    }
    if (isTemplate && getActiveStep === 2) {
      return <DocumentVersion isTemplate={isTemplate} setOpen={setOpen} />;
    }
    if (getActiveStep === 2) {
      return <DocumentTemplate />;
    }
    if (getActiveStep === 3) {
      return <DocumentEncryption repoId={repoId} />;
    }
    if (getActiveStep === 4) {
      return <DocumentVersion isTemplate={isTemplate} setOpen={setOpen} />;
    }
  };
  return (
    <StepperDialog
      dialogHeader={isTemplate ? "ایجاد نمونه سند" : "ایجاد سند"}
      stepList={stepList}
      handleClose={handleClose}
      activeStep={getActiveStep}
    >
      {handleStepperContent()}
    </StepperDialog>
  );
};

export default DocumentCreate;
