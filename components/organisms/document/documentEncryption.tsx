import React from "react";
import RepoKeyList from "../dialogs/repository/repoKey/repoKeyList";
import { DialogBody, DialogFooter, Typography } from "@material-tailwind/react";
import CancelButton from "@components/atoms/button/cancelButton";
import LoadingButton from "@components/molecules/loadingButton";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import { IPublicKey } from "@interface/repo.interface";
import { useRecoilState } from "recoil";
import { documentKey } from "@atom/document";

interface IProps {
  repoId: number;
}

const DocumentEncryption = ({ repoId }: IProps) => {
  const [getDocumentKey, setDocumentKey] = useRecoilState(documentKey);
  const { handleNextStep, handlePrevStep } = useStepperNavigate();

  const onSelectKey = (keyItem: IPublicKey) => {
    if (getDocumentKey === keyItem) {
      setDocumentKey(null);
    } else {
      setDocumentKey(keyItem);
    }
  };

  return (
    <>
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6"
      >
        <div className="w-full overflow-auto h-[calc(100dvh-450px)] border-[0.5px] border-normal rounded-lg mt-4">
          <RepoKeyList
            repoId={repoId}
            isSelectable
            onSelect={onSelectKey}
            selectedKeyId={getDocumentKey?.id}
          />
        </div>
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <CancelButton onClick={handlePrevStep}>مرحله قبلی</CancelButton>
        <LoadingButton
          className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={handleNextStep}
        >
          <Typography className="text__label__button text-white">
            ادامه
          </Typography>
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default DocumentEncryption;
