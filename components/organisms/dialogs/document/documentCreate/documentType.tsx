import {
  DialogBody,
  Typography
} from "@material-tailwind/react";
import React, { useState } from "react";
import SelectAtom, { IOption } from "@components/molecules/select";
import DialogStepperFooter from "@components/molecules/stepperDialogFooter";
import { EDocumentTypes } from "@interface/enums";
import useGetClasorField from "@hooks/document/useGetClasorField";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import { Spinner } from "@components/atoms/spinner";
import { useDocumentStore } from "@store/document";

interface IProps {
  isTemplate: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentType = ({
  isTemplate, setOpen
}: IProps) => {
  const { documentType: getDocumentType, setDocumentType } = useDocumentStore();
  const { handleNextStep } = useStepperNavigate();
  const {
    data: getDocumentTypes, isLoading
  } = useGetClasorField();
  const [type, setType] = useState<IOption>({
    label: "clasor",
    value: EDocumentTypes.classic,
  });

  const handleSelectType = () => {
    setDocumentType(type.value as EDocumentTypes);
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

  const defaultOption = getDocumentType
    ? {
      label: getDocumentType,
      value: getDocumentType,
    }
    : typeOptions?.[0];
  return (
    <>
      <DialogBody
        placeholder="dialog body"
        className="dialog-body flex-grow px-5 py-3 xs:p-6"
        {...({} as  Omit<React.ComponentProps<typeof DialogBody>, "placeholder">)}
      >
        <form className="document-type flex flex-col gap-5" onSubmit={handleSelectType}>
          {isLoading ? (
            <div className="w-full justify-center items-center flex h-[50px]">
              <Spinner className="h-5 w-5 text-primary" />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Typography
                placeholder=""
                className="form_label"
                {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
              >
                نوع سند
              </Typography>
              <SelectAtom
                className="document-type__select w-full h-[46px] flex items-center !bg-gray-50 justify-between pr-3 pl-2 rounded-lg border-[1px] border-normal"
                defaultOption={defaultOption}
                options={typeOptions}
                selectedOption={type}
                setSelectedOption={setType}
              />
            </div>
          )}
        </form>
      </DialogBody>
      <DialogStepperFooter
        hasNextStep
        hasPreviousStep={false}
        handleNextStep={handleSelectType}
        handlePreviousStep={() => {
          return setOpen(false);
        }}
      />
    </>
  );
};

export default DocumentType;
