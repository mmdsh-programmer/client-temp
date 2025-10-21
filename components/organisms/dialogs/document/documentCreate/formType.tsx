import { DialogBody, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import SelectAtom, { IOption } from "@components/molecules/select";
import DialogStepperFooter from "@components/molecules/stepperDialogFooter";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import { useDocumentStore } from "@store/document";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormType = ({ setOpen }: IProps) => {
  const { setDocumentFormContentInfo } = useDocumentStore();
  const { handleNextStep } = useStepperNavigate();
  const [type, setType] = useState<IOption>({
    label: "فرم معمولی",
    value: "GENERAL",
  });

  const [display, setDisplay] = useState<IOption>({
    label: "فرم کلاسیک",
    value: "CLASSIC",
  });

  const handleSelectType = () => {
    setDocumentFormContentInfo({
      type: type.value as "GENERAL" | "EXAM",
      display: display.value as "CLASSIC" | "CARD",
    });
    handleNextStep();
  };

  const typeOptions = [
    { label: "فرم معمولی", value: "GENERAL" },
    { label: "فرم آزمون", value: "EXAM" },
  ];

  const displayOptions = [
    { label: "فرم کلاسیک", value: "CLASSIC" },
    { label: "فرم کارتی", value: "CARD" },
  ];

  return (
    <>
      <DialogBody
        placeholder="dialog body"
        className="dialog-body flex-grow px-5 py-3 xs:p-6"
        {...({} as Omit<React.ComponentProps<typeof DialogBody>, "placeholder">)}
      >
        <form className="document-type flex flex-col gap-5" onSubmit={handleSelectType}>
          <div className="flex flex-col gap-2">
            <Typography
              placeholder=""
              className="form_label"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              نوع فرم
            </Typography>
            <SelectAtom
              className="document-type__select flex h-[46px] w-full items-center justify-between rounded-lg border-[1px] border-normal !bg-gray-50 pl-2 pr-3"
              defaultOption={typeOptions[0]}
              options={typeOptions}
              selectedOption={type}
              setSelectedOption={setType}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Typography
              placeholder=""
              className="form_label"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              نمایش فرم
            </Typography>
            <SelectAtom
              className="document-type__select flex h-[46px] w-full items-center justify-between rounded-lg border-[1px] border-normal !bg-gray-50 pl-2 pr-3"
              defaultOption={displayOptions[0]}
              options={displayOptions}
              selectedOption={display}
              setSelectedOption={setDisplay}
            />
          </div>
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

export default FormType;
