import React from "react";
import { repoActiveStep } from "@atom/stepper";
import LoadingButton from "@components/molecules/loadingButton";
import { DialogBody, DialogFooter, Typography } from "@material-tailwind/react";
import { useSetRecoilState } from "recoil";
import CancelButton from "@components/atoms/button/cancelButton";
import RepoShare from "@components/organisms/users";

interface IProps {
  handleClose: () => void;
}

const RepoAddUser = ({ handleClose }: IProps) => {
  const setActiveStep = useSetRecoilState(repoActiveStep);

  return (
    <>
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6"
      >
        <RepoShare />
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <CancelButton onClick={handleClose}>انصراف</CancelButton>
        <LoadingButton
          className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={() => setActiveStep(2)}
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
