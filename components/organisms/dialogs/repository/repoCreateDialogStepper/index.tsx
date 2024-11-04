import React, { useState } from "react";
import Files from "../../../fileManagement";
import RepoAddUser from "@components/organisms/dialogs/repository/repoCreateDialogStepper/repoAddUser";
import RepoCreate from "./repoCreate";
import RepoImage from "@components/organisms/dialogs/repository/repoCreateDialogStepper/repoImage";
import StepperDialog from "@components/templates/dialog/stepperDialog";
import Tags from "@components/organisms/dialogs/repository/repoCreateDialogStepper/tags";
import { repoActiveStepAtom } from "@atom/stepper";
import { repoAtom } from "@atom/repository";
import { useRecoilState } from "recoil";

interface IProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
}
const RepoCreateDialogStepper = ({ close }: IProps) => {
  const [getActiveStep, setActiveStep] = useRecoilState(repoActiveStepAtom);
  const [getRepo, setRepo] = useRecoilState(repoAtom);
  const [selectedFile, setSelectedFile] = useState<string | undefined>();

  const [openFileManagement, setOpenFileManagement] = useState(false);

  const steplist = ["عنوان مخزن", "اشتراک گذاری", "تگ", "افزودن تصویر"];

  const handleClose = () => {
    setActiveStep(0);
    close(false);
    setRepo(null);
  };

  const handleStepperContent = () => {
    if (getActiveStep === 0) {
      return <RepoCreate handleClose={handleClose} />;
    }
    if (getActiveStep === 1 && getRepo) {
      return <RepoAddUser handleClose={handleClose} />;
    }
    if (getActiveStep === 2 && getRepo) {
      return <Tags handleClose={handleClose} />;
    }
    if (getActiveStep === 3 && getRepo) {
      return (
        <RepoImage
          setOpenFileManagement={setOpenFileManagement}
          handleClose={handleClose}
          selectedFile={selectedFile}
        />
      );
    }
  };

  return openFileManagement && getRepo ? (
    <Files
      userGroupHash={getRepo.userGroupHash}
      resourceId={getRepo.id}
      type="public"
      handleClose={() => {
        setOpenFileManagement(false);
      }}
      setSelectedFile={(file) => {
        return setSelectedFile(file?.hash);
      }}
    />
  ) : (
    <StepperDialog
      dialogHeader="ایجاد مخزن"
      stepList={steplist}
      handleClose={handleClose}
      activeStep={getActiveStep}
    >
      {handleStepperContent()}
    </StepperDialog>
  );
};

export default RepoCreateDialogStepper;
