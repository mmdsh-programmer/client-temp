import React from "react";
import DocumentEncryption from "./documentEncryption";
import DocumentInfo from "@components/organisms/dialogs/document/documentCreate/documentInfo";
import DocumentTemplate from "@components/organisms/dialogs/document/documentCreate/documentTemplate";
import DocumentType from "@components/organisms/dialogs/document/documentCreate/documentType";
import DocumentVersion from "@components/organisms/dialogs/document/documentCreate/documentVersion";
import StepperDialog from "@components/templates/dialog/stepperDialog";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import { useDocumentStepperStore } from "@store/stepper";
import useRepoId from "@hooks/custom/useRepoId";
import { useDocumentStore } from "@store/document";
import { EDocumentTypes } from "@interface/enums";
import FormType from "./formType";

interface IProps {
  isTemplate: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentCreate = ({ isTemplate, setOpen }: IProps) => {
  const { documentActiveStep: getActiveStep } = useDocumentStepperStore();
  const { documentType } = useDocumentStore();

  const repoId = useRepoId();

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
      : [
          documentType === EDocumentTypes.classic ? "نمونه سند" : "مشخصات فرم",
          "رمز گذاری سند",
          "نام نسخه سند",
        ]),
  ];

  const renderStepperContent = () => {
    switch (getActiveStep) {
      case 0:
        return <DocumentType isTemplate={isTemplate} setOpen={setOpen} />;
      case 1:
        return <DocumentInfo />;
      case 2:
        if (isTemplate) {
          return <DocumentVersion isTemplate={isTemplate} setOpen={setOpen} />;
        }
        if (documentType === EDocumentTypes.classic) {
          return <DocumentTemplate />;
        }
        return <FormType />;
      case 3:
        return isTemplate ? (
          <DocumentVersion isTemplate={isTemplate} setOpen={setOpen} />
        ) : (
          <DocumentEncryption repoId={repoId!} />
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
      className={isTemplate ? "template-create-dialog" : "document-create-dialog"}
    >
      {renderStepperContent()}
    </StepperDialog>
  );
};

export default DocumentCreate;
