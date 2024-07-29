import React, { useState } from "react";
import { repoActiveStep } from "@atom/stepper";
import StepperDialog from "@components/templates/stepperDialog";
import { IRepo } from "@interface/repo.interface";
import { useRecoilState } from "recoil";
import RepoCreate from "./repoCreate";
import RepoShare from "@components/organisms/dialogs/repository/repoCreateDialogStepper/repoShare";
import Tags from "@components/organisms/dialogs/repository/repoCreateDialogStepper/tags";
import RepoImage from "@components/organisms/dialogs/repository/repoCreateDialogStepper/repoImage";


interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const RepoCreateDialogStepper = ({ setOpen }: IProps) => {
  const [getActiveStep, setActiveStep] = useRecoilState(repoActiveStep);
  const [repo, setRepo] = useState<IRepo | null>(null);

  const steplist = ["عنوان مخزن", "اشتراک گذاری", "تگ", "افزودن تصویر"];

  const handleClose = () => {
    setActiveStep(0);
    setOpen(false);
  };
  const handleStepperContent = () => {

    if (getActiveStep === 0) {
      return <RepoCreate setRepo={setRepo} handleClose={handleClose} />;
    }
    if (getActiveStep === 1) {
      return <RepoShare repo={repo} handleClose={handleClose} />;
    }
    if (getActiveStep === 2) {
      return <Tags repo={repo} handleClose={handleClose} />;
    }
    if (getActiveStep === 3) {
      return (
        <RepoImage
          repo={repo}
          handleClose={handleClose}
        />
      );
    }
  };
  return (
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
