import { DialogBody, Spinner, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

import DialogStepperFooter from "@components/molecules/stepperDialogFooter";
import { EDocumentTypes } from "@interface/enums";
import SelectAtom from "@components/molecules/select";
import { documentTypeAtom } from "@atom/document";
import useGetClasorField from "@hooks/document/useGetClasorField";
import { useRecoilState } from "recoil";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";

interface IProps {
  isTemplate: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentType = ({ isTemplate, setOpen }: IProps) => {
  const [getDocumentType, setDocumentType] = useRecoilState(documentTypeAtom);
  const { handleNextStep } = useStepperNavigate();
  const { data: getDocumentTypes, isLoading } = useGetClasorField();
  const [type, setType] = useState<EDocumentTypes | null>(
    EDocumentTypes.classic,
  );

  const handleSelectType = () => {
    setDocumentType(type);
    handleNextStep();
  };

  const typeOptions =
    getDocumentTypes?.length && isTemplate
      ? getDocumentTypes
          ?.filter((x) => {
            return x.name === "clasor";
          })
          .map((item) => {
            return {
              label: item.name,
              value: item.uniqueId,
            };
          })
      : getDocumentTypes?.map((item) => {
          return {
            label: item.name,
            value: item.uniqueId,
          };
        });

  return (
    <>
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6"
      >
        <form className="flex flex-col gap-5" onSubmit={handleSelectType}>
          {isLoading ? (
            <div className="w-full justify-center items-center flex h-[50px]">
              <Spinner className="h-5 w-5" color="deep-purple" />
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <Typography className="form_label">نوع سند</Typography>
                <SelectAtom
                  className="w-full h-[46px] flex items-center !bg-gray-50 justify-between pr-3 pl-2 rounded-lg border-[1px] border-normal"
                  defaultOption={getDocumentType || typeOptions?.[0].label}
                  options={typeOptions}
                  selectedOption={type as string}
                  setSelectedOption={setType}
                />
              </div>
            </>
          )}
        </form>
      </DialogBody>
      <DialogStepperFooter
        hasNextStep={true}
        hasPreviousStep={false}
        handleNextStep={handleSelectType}
        handlePreviousStep={() => setOpen(false)}
      />
    </>
  );
};

export default DocumentType;
