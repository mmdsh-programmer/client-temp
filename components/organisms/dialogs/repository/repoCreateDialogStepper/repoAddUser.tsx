import { DialogBody, DialogFooter, Typography } from "@material-tailwind/react";

import CancelButton from "@components/atoms/button/cancelButton";
import LoadingButton from "@components/molecules/loadingButton";
import React from "react";
import RepoShare from "@components/organisms/users";
import useGetUser from "@hooks/auth/useGetUser";
import { useRepoStepperStore } from "@store/stepper";

interface IProps {
  handleClose: () => void;
}

const RepoAddUser = ({ handleClose }: IProps) => {
  const { setRepoActiveStep } = useRepoStepperStore();
  const { data: userInfo } = useGetUser();

  return (
    <>
      <DialogBody
        {...({} as React.ComponentProps<typeof DialogBody>)}
        className="repo-add-user__dialog-body flex-grow px-5 py-3 xs:p-6 overflow-auto"
      >
        <RepoShare createRepoDialog />
      </DialogBody>
      <DialogFooter
        {...({} as React.ComponentProps<typeof DialogFooter>)}
        className="repo-add-user__dialog-footer p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <CancelButton onClick={handleClose}>انصراف</CancelButton>
        <LoadingButton
          className="repo-add-user__dialog-next-button bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
          onClick={() => {
            if (!userInfo?.domainConfig.useDomainTag) {
              setRepoActiveStep(2);
            } else {
              setRepoActiveStep(3);
            }
          }}
        >
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="text__label__button text-white">
            ادامه
          </Typography>
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default RepoAddUser;