import DocumentEncryption from "./documentEncryption";
import DocumentInfo from "@components/organisms/dialogs/document/documentCreate/documentInfo";
import DocumentTemplate from "@components/organisms/dialogs/document/documentCreate/documentTemplate";
import DocumentType from "@components/organisms/dialogs/document/documentCreate/documentType";
import DocumentVersion from "@components/organisms/dialogs/document/documentCreate/documentVersion";
import React from "react";
import StepperDialog from "@components/templates/dialog/stepperDialog";
import { documentActiveStepAtom } from "@atom/stepper";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  isTemplate: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentCreate = ({ isTemplate, setOpen }: IProps) => {
  const getActiveStep = useRecoilValue(documentActiveStepAtom);
  const getRepo = useRecoilValue(repoAtom);
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const repoId =
  currentPath === "/admin/myDocuments"
    ? userInfo!.repository.id
    : getRepo!.id;

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
      className={isTemplate ? "template-create-dialog" :"document-create-dialog"}
    >
      {renderStepperContent()}
    </StepperDialog>
  );
};

export default DocumentCreate;
