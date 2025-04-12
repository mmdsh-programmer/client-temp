import React from "react";
import { DialogBody, DialogFooter, Typography } from "@material-tailwind/react";
import CancelButton from "@components/atoms/button/cancelButton";
import LoadingButton from "@components/molecules/loadingButton";
import RepoShare from "@components/organisms/users";
import { repoActiveStepAtom } from "@atom/stepper";
import { useSetRecoilState } from "recoil";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  handleClose: () => void;
}

const RepoAddUser = ({ handleClose }: IProps) => {
  const setActiveStep = useSetRecoilState(repoActiveStepAtom);
  const { data: userInfo } = useGetUser();

  return (
    <>
      <DialogBody
        placeholder="dialog body"
        className="repo-add-user__dialog-body flex-grow px-5 py-3 xs:p-6 overflow-auto"
      >
        <RepoShare createRepoDialog />
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="repo-add-user__dialog-footer p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <CancelButton onClick={handleClose}>انصراف</CancelButton>
        <LoadingButton
          className="repo-add-user__dialog-next-button bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={() => {
            if ((userInfo?.domainConfig.useDomainTag &&
              (userInfo?.domainRole === "owner" ||
                userInfo.domainRole === "participant")) || !userInfo?.domainConfig.useDomainTag) {
              setActiveStep(2);
            } else {
              setActiveStep(3);
            }
          }}
        >
          <Typography className="text__label__button text-white">
            ادامه
          </Typography>
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default RepoAddUser;
