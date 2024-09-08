import React from "react";
import { DialogBody } from "@material-tailwind/react";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import { IPublicKey } from "@interface/repo.interface";
import { useRecoilState } from "recoil";
import { documentKey } from "@atom/document";
import DialogStepperFooter from "@components/molecules/stepperDialogFooter";
import RepoKeyList from "../../repository/repoKey/repoKeyList";

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
        <div className="w-full overflow-auto h-[calc(100vh-450px)] border-[0.5px] border-normal rounded-lg mt-4">
          <RepoKeyList
            repoId={repoId}
            isSelectable
            onSelect={onSelectKey}
            selectedKeyId={getDocumentKey?.id}
          />
        </div>
      </DialogBody>
      <DialogStepperFooter
        hasNextStep={true}
        hasPreviousStep={true}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePrevStep}
      />
    </>
  );
};

export default DocumentEncryption;
