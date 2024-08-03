import React, { useState } from "react";
import { repoActiveStep } from "@atom/stepper";
import StepperDialog from "@components/templates/stepperDialog";
import { useRecoilState } from "recoil";
import RepoCreate from "./repoCreate";
import Tags from "@components/organisms/dialogs/repository/repoCreateDialogStepper/tags";
import RepoImage from "@components/organisms/dialogs/repository/repoCreateDialogStepper/repoImage";
import RepoAddUser from "@components/organisms/dialogs/repository/repoCreateDialogStepper/repoAddUser";
import { repoAtom } from "@atom/repository";
import Files from "./files";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const RepoCreateDialogStepper = ({ setOpen }: IProps) => {
  const [getActiveStep, setActiveStep] = useRecoilState(repoActiveStep);
  const [getRepo, setRepo] = useRecoilState(repoAtom);

  const [openFileManagement, setOpenFileManagement] = useState(false);

  const steplist = ["عنوان مخزن", "اشتراک گذاری", "تگ", "افزودن تصویر"];

  const handleClose = () => {
    setActiveStep(0);
    setOpen(false);
    setRepo(null);
  };

  const handleStepperContent = () => {
    if (getActiveStep === 0) {
      return <RepoCreate handleClose={handleClose} />;
    }
    if (getActiveStep === 1) {
      return <RepoAddUser handleClose={handleClose} />;
    }
    if (getActiveStep === 2) {
      return <Tags handleClose={handleClose} />;
    }
    if (getActiveStep === 3) {
      return (
        <RepoImage
          setOpenFileManagement={setOpenFileManagement}
          handleClose={handleClose}
        />
      );
    }
  };
  return (
    <>
      {openFileManagement ? (
        <Files userGroupHash={getRepo?.userGroupHash} resourceId={null} type="public" handleClose={handleClose} />
      ) : (
        <StepperDialog
          dialogHeader="ایجاد مخزن"
          stepList={steplist}
          handleClose={handleClose}
          activeStep={getActiveStep}
        >
          {handleStepperContent()}
        </StepperDialog>
      )}
    </>
  );
};

export default RepoCreateDialogStepper;
