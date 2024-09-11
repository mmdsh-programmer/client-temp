import React from "react";
import { useRecoilValue } from "recoil";
import { documentActiveStep } from "@atom/stepper";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import StepperDialog from "@components/templates/dialog/stepperDialog";
import DocumentType from "@components/organisms/dialogs/document/documentCreate/documentType";
import DocumentInfo from "@components/organisms/dialogs/document/documentCreate/documentInfo";
import DocumentVersion from "@components/organisms/dialogs/document/documentCreate/documentVersion";
import DocumentTemplate from "@components/organisms/dialogs/document/documentCreate/documentTemplate";
import { repoAtom } from "@atom/repository";
import DocumentEncryption from "./documentEncryption";

interface IProps {
  isTemplate: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentCreate = ({ isTemplate, setOpen }: IProps) => {
  const getActiveStep = useRecoilValue(documentActiveStep);
  const getRepo = useRecoilValue(repoAtom);

  const repoId = getRepo!.id;
  const { close } = useStepperNavigate();
  const handleClose = () => {
    close();
    setOpen(false);
  };

  const stepList = [
    "نوع سند",
    "عنوان و توضیحات سند",
    ...(isTemplate
      ? ["نام نسخه سند"]
      : ["نمونه سند", "رمز گذاری سند", "نام نسخه سند"]),
  ];

  const renderStepperContent = () => {
    switch (getActiveStep) {
      case 0:
        return <DocumentType isTemplate={isTemplate} setOpen={setOpen} />;
      case 1:
        return <DocumentInfo />;
      case 2:
        return isTemplate ? (
          <DocumentVersion isTemplate={isTemplate} setOpen={setOpen} />
        ) : (
          <DocumentTemplate />
        );
      case 3:
        return isTemplate ? (
          <DocumentVersion isTemplate={isTemplate} setOpen={setOpen} />
        ) : (
          <DocumentEncryption repoId={repoId} />
        );
      case 4:
        return <DocumentVersion isTemplate={isTemplate} setOpen={setOpen} />;
      default:
        return null;
    }
  };

  return (
    <StepperDialog
      dialogHeader={isTemplate ? "ایجاد نمونه سند" : "ایجاد سند"}
      stepList={stepList}
      handleClose={handleClose}
      activeStep={getActiveStep}
    >
      {renderStepperContent()}
    </StepperDialog>
  );
};

export default DocumentCreate;
