import React, { useImperativeHandle, forwardRef, useEffect } from "react";
import InputAtom from "@components/atoms/input";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISeo, OpenGraphFormData } from "@interface/social.interface";
import { openGraphSchema } from "./validation.yup";

export interface SocialSharingFormRef {
  getFormValues: () => OpenGraphFormData;
  validateForm: () => Promise<boolean>;
}

interface IProps {
  defaultValues?: ISeo;
  onValidationError?: (hasError: boolean) => void;
}

const SeoSocialSharingForm = forwardRef<SocialSharingFormRef, IProps>(({ defaultValues, onValidationError }, ref) => {
  const form = useForm<OpenGraphFormData>({
    defaultValues: {
      openGraph: {
        title: defaultValues?.openGraph?.title || "",
        description: defaultValues?.openGraph?.description || "",
        URL: defaultValues?.openGraph?.URL || "",
        author: defaultValues?.openGraph?.author || "",
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(openGraphSchema) as any,
    mode: "onChange"
  });

  const { register, formState: { errors }, getValues, reset } = form;

  // Reset form with new default values when they change
  useEffect(() => {
    reset({
      openGraph: {
        title: defaultValues?.openGraph?.title || "",
        description: defaultValues?.openGraph?.description || "",
        URL: defaultValues?.openGraph?.URL || "",
        author: defaultValues?.openGraph?.author || "",
      }
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
        const hasError = !!form.formState.errors.openGraph;
        
        if (onValidationError) {
          onValidationError(hasError);
        }
        
        return !hasError;
      }
    };
  });

  // Notify parent about validation status
  React.useEffect(() => {
    if (onValidationError) {
      const hasError = !!errors.openGraph;
      onValidationError(hasError);
    }
  }, [errors, onValidationError]);

  return (
    <div className="flex flex-col gap-6 pt-6 px-2 w-full">
      <div className="flex flex-col gap-2">
        <Typography className="form_label">عنوان</Typography>
        <InputAtom
          className="bg-white"
          placeholder="عنوان"
          register={{ ...register("openGraph.title") }}
        />
        {errors.openGraph?.title && (
          <span className="text-[10px] text-red-700">
            {errors.openGraph.title.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Typography className="form_label">URL</Typography>
        <TextareaAtom
          className="!bg-white"
          placeholder="URL"
          register={{ ...register("openGraph.URL") }}
        />
        {errors.openGraph?.URL && (
          <span className="text-[10px] text-red-700">
            {errors.openGraph.URL.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Typography className="form_label">توضیحات</Typography>
        <TextareaAtom
          className="!bg-white"
          placeholder="توضیحات"
          register={{ ...register("openGraph.description") }}
        />
        {errors.openGraph?.description && (
          <span className="text-[10px] text-red-700">
            {errors.openGraph.description.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Typography className="form_label"> نویسنده</Typography>
        <TextareaAtom
          className="!bg-white"
          placeholder="نویسنده"
          register={{ ...register("openGraph.author") }}
        />
        {errors.openGraph?.author && (
          <span className="text-[10px] text-red-700">
            {errors.openGraph.author.message}
          </span>
        )}
      </div>
    </div>
  );
});

export default SeoSocialSharingForm; 