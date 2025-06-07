import React, { useImperativeHandle, forwardRef, useEffect } from "react";
import InputAtom from "@components/atoms/input";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISeo, SeoFormData } from "@interface/social.interface";
import { seoSchema } from "./validation.yup";

export interface SeoFormRef {
  getFormValues: () => SeoFormData;
  validateForm: () => Promise<boolean>;
}

interface IProps {
  defaultValues?: ISeo;
  onValidationError?: (hasError: boolean) => void;
}

const SeoForm = forwardRef<SeoFormRef, IProps>(({ defaultValues, onValidationError }, ref) => {
  const form = useForm<SeoFormData>({
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      keywords: defaultValues?.keywords || "",
      language: defaultValues?.language || "",
      canonicalUrl: defaultValues?.canonicalUrl || "",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(seoSchema) as any,
    mode: "onChange"
  });

  const { register, formState: { errors }, getValues, reset } = form;

  // Reset form with new default values when they change
  useEffect(() => {
    reset({
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      keywords: defaultValues?.keywords || "",
      language: defaultValues?.language || "",
      canonicalUrl: defaultValues?.canonicalUrl || "",
    });
    // Don't trigger validation on initial render
  }, [defaultValues, reset]);

  // Expose form values to parent component
  useImperativeHandle(ref, () => {
    return {
      getFormValues: () => { return getValues(); },
      validateForm: async () => {
        // Trigger validation for all fields
        await form.trigger();
        
        // Force re-check of errors after trigger
        const hasErrors = Object.keys(form.formState.errors).length > 0;
        
        if (onValidationError) {
          onValidationError(hasErrors);
        }
        
        return !hasErrors;
      }
    };
  });

  // Notify parent about validation status
  React.useEffect(() => {
    if (onValidationError) {
      const hasErrors = Object.keys(errors).length > 0;
      onValidationError(hasErrors);
    }
  }, [errors, onValidationError]);

  return (
    <div className="flex flex-col gap-6 pt-6 px-2 w-full">
      <div className="flex flex-col gap-2">
        <Typography className="form_label">عنوان</Typography>
        <InputAtom
          className="bg-white"
          placeholder="عنوان"
          register={{ ...register("title") }}
        />
        {errors.title && (
          <span className="text-[10px] text-red-700">
            {errors.title.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Typography className="form_label">توضیحات</Typography>
        <TextareaAtom
          className="!bg-white"
          placeholder="توضیحات"
          register={{ ...register("description") }}
        />
        {errors.description && (
          <span className="text-[10px] text-red-700">
            {errors.description.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Typography className="form_label">کلمات کلیدی</Typography>
        <TextareaAtom
          className="!bg-white"
          placeholder="کلمات کلیدی"
          register={{ ...register("keywords") }}
        />
        {errors.keywords && (
          <span className="text-[10px] text-red-700">
            {errors.keywords.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Typography className="form_label">زبان</Typography>
        <InputAtom
          className="bg-white"
          placeholder="زبان"
          register={{ ...register("language") }}
        />
        {errors.language && (
          <span className="text-[10px] text-red-700">
            {errors.language.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Typography className="form_label">لینک canonical</Typography>
        <InputAtom
          className="bg-white"
          placeholder="لینک canonical"
          register={{ ...register("canonicalUrl") }}
          type="url"
        />
        {errors.canonicalUrl && (
          <span className="text-[10px] text-red-700">
            {errors.canonicalUrl.message}
          </span>
        )}
      </div>
    </div>
  );
});

export default SeoForm; 