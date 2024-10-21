import React from "react";
import { DialogBody } from "@material-tailwind/react";
import DialogStepperFooter from "@components/molecules/stepperDialogFooter";
import { IPublicKey } from "@interface/repo.interface";
import RepoKeyList from "../../repository/repoKey/repoKeyList";
import { documentKeyAtom } from "@atom/document";
import { useRecoilState } from "recoil";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";

interface IProps {
  repoId: number;
}

const DocumentEncryption = ({ repoId }: IProps) => {
  const [getDocumentKey, setDocumentKey] = useRecoilState(documentKeyAtom);
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
        <div className="w-full overflow-auto max-h-[403px] xs:max-h-[327px] h-auto border-[0.5px] border-normal rounded-lg mt-4">
          <RepoKeyList
            repoId={repoId}
            isSelectable
            onSelect={onSelectKey}
            selectedKeyId={getDocumentKey?.id}
          />
        </div>
      </DialogBody>
      <DialogStepperFooter
        hasNextStep
        hasPreviousStep
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePrevStep}
      />
    </>
  );
};

export default DocumentEncryption;
