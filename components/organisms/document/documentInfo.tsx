import React from "react";
import { documentInfo } from "@atom/document";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import { DialogBody, DialogFooter } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import Label from "@components/atoms/typograghy/label";
import WarningText from "@components/atoms/typograghy/warningText";
import NumberInput from "@components/atoms/input/numberInput";
import TextareaAtom from "@components/atoms/textarea/textarea";
import CancelButton from "@components/atoms/button/cancelButton";
import Text from "@components/atoms/typograghy/text";
import LoadingButton from "@components/molecules/loadingButton";
import FormInput from "@components/atoms/input/formInput";

interface IForm {
  title: string;
  description?: string;
  order?: number;
}

const DocumentInfo = () => {
  const [getDocumentInfo, setDocumentInfo] = useRecoilState(documentInfo);
  const { handleNextStep, handlePrevStep } = useStepperNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IForm>();

  const onSubmit = async (dataForm: IForm) => {
    setDocumentInfo(dataForm);
    handleNextStep();
  };
  return (
    <>
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6"
      >
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Label>نام سند</Label>
            <FormInput
              className="w-full"
              placeholder="نام سند"
              register={{
                ...register("title", { value: getDocumentInfo?.title }),
              }}
            />
            {errors.title && <WarningText>{errors.title?.message}</WarningText>}
          </div>
          <div className="flex flex-col gap-2">
            <Label>اولویت سند </Label>
            <NumberInput
              className="w-full"
              placeholder="اولویت سند"
              register={{
                ...register("order", { value: getDocumentInfo?.order }),
              }}
            />
            {errors.order && <WarningText>{errors.order?.message}</WarningText>}
          </div>
          <div className="flex flex-col gap-2">
            <Label>توضیحات سند</Label>
            <TextareaAtom
              className="w-full"
              placeholder="توضیحات سند"
              register={{
                ...register("description", {
                  value: getDocumentInfo?.description,
                }),
              }}
            />
            {errors.description && (
              <WarningText>{errors.description?.message}</WarningText>
            )}
          </div>
        </form>
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <CancelButton onClick={handlePrevStep}>مرحله قبلی</CancelButton>
        <LoadingButton
          className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={handleSubmit(onSubmit)}
        >
          <Text className="text-[12px] font-medium leading-[18px] -tracking-[0.12px] text-white">
            ادامه
          </Text>
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default DocumentInfo;
