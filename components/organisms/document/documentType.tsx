import React, { useState } from "react";
import { documentType } from "@atom/document";
import useGetClasorField from "@hooks/document/useGetClasorField";
import { EDocumentTypes } from "@interface/enums";
import { useRecoilState } from "recoil";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import { DialogBody, DialogFooter, Spinner } from "@material-tailwind/react";
import Label from "@components/atoms/typograghy/label";
import CancelButton from "@components/atoms/button/cancelButton";
import LoadingButton from "@components/molecules/loadingButton";
import Text from "@components/atoms/typograghy/text";
import SelectAtom from "@components/molecules/select";

interface IProps {
  isTemplate: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentType = ({ isTemplate, setOpen }: IProps) => {
  const [getDocumentType, setDocumentType] = useRecoilState(documentType);
  const { handleNextStep } = useStepperNavigate();
  const { data: getDocumentTypes, isLoading } = useGetClasorField();
  const [type, setType] = useState<EDocumentTypes | null>(null);

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
        <form className="flex flex-col gap-6" onSubmit={handleSelectType}>
          {isLoading ? (
            <Spinner className="h-4 w-4" color="deep-purple" />
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <Label>نوع سند</Label>
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
      <DialogFooter
        placeholder="dialog footer"
        className="p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <CancelButton onClick={() => setOpen(false)}>انصراف</CancelButton>
        <LoadingButton
          className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={handleSelectType}
        >
          <Text className="text-[12px] font-medium leading-[18px] -tracking-[0.12px] text-white">
            ادامه
          </Text>
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default DocumentType;
