import React from "react";
import { documentInfo } from "@atom/document";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import { DialogBody, DialogFooter, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import TextareaAtom from "@components/atoms/textarea/textarea";
import CancelButton from "@components/atoms/button/cancelButton";
import LoadingButton from "@components/molecules/loadingButton";
import FormInput from "@components/atoms/input/formInput";
import InputAtom from "@components/atoms/input";

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
            <Typography className="label">نام سند</Typography>
            <FormInput
              className="w-full"
              placeholder="نام سند"
              register={{
                ...register("title", { value: getDocumentInfo?.title }),
              }}
            />
            {errors.title && <Typography className="warning_text">{errors.title?.message}</Typography>}
          </div>
          <div className="flex flex-col gap-2">
            <Typography className="label">اولویت سند </Typography>
            <InputAtom
              className="w-full"
              placeholder="اولویت سند"
              register={{
                ...register("order", { value: getDocumentInfo?.order }),
              }}
            />
            {errors.order && <Typography className="warning_text">{errors.order?.message}</Typography>}
          </div>
          <div className="flex flex-col gap-2">
            <Typography className="label">توضیحات سند</Typography>
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
              <Typography className="warning_text">{errors.description?.message}</Typography>
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
          <Typography className="text-Typography-button text-white">
            ادامه
          </Typography>
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default DocumentInfo;
