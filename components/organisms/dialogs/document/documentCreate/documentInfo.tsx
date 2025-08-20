import React from "react";
import { DialogBody, Typography } from "@material-tailwind/react";
import DialogStepperFooter from "@components/molecules/stepperDialogFooter";
import FormInput from "@components/atoms/input/formInput";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { documentInfoSchema } from "../validation.yup";
import { useForm } from "react-hook-form";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDocumentStore } from "@store/document";

interface IForm {
  title: string;
  description?: string;
  order?: number;
}

const DocumentInfo = () => {
  const { documentInfo: getDocumentInfo, setDocumentInfo } = useDocumentStore();
  const { handleNextStep, handlePrevStep } = useStepperNavigate();

  const form = useForm<IForm>({
    resolver: yupResolver(documentInfoSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (dataForm: IForm) => {
    setDocumentInfo(dataForm);
    handleNextStep();
  };
  return (
    <>
      <DialogBody
        placeholder="dialog body"
        className="dialog-body flex-grow px-5 py-3 xs:p-6"
      >
        <form className="document-info-form flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Typography className="form_label">نام سند</Typography>
            <FormInput
              className="document-info-form__name w-full"
              placeholder="نام سند"
              register={{
                ...register("title", { value: getDocumentInfo?.title }),
              }}
            />
            {errors.title && (
              <Typography className="warning_text">
                {errors.title?.message}
              </Typography>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Typography className="form_label">اولویت سند </Typography>
            <FormInput
              className="document-info-form__order w-full"
              placeholder="اولویت سند"
              type="number"
              min={1}
              register={{
                ...register("order", { value: getDocumentInfo?.order }),
              }}
            />
            {errors.order && (
              <Typography className="warning_text">
                {errors.order?.message}
              </Typography>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Typography className="form_label">توضیحات سند</Typography>
            <TextareaAtom
              className="document-info-form__description w-full"
              placeholder="توضیحات سند"
              register={{
                ...register("description", {
                  value: getDocumentInfo?.description,
                }),
              }}
            />
            {errors.description && (
              <Typography className="warning_text">
                {errors.description?.message}
              </Typography>
            )}
          </div>
        </form>
      </DialogBody>
      <DialogStepperFooter
        hasNextStep
        hasPreviousStep
        handleNextStep={handleSubmit(onSubmit)}
        handlePreviousStep={handlePrevStep}
      />
    </>
  );
};

export default DocumentInfo;
