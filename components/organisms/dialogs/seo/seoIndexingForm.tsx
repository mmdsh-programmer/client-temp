import React, { useImperativeHandle, forwardRef } from "react";
import { Button, Typography, Radio, Checkbox } from "@material-tailwind/react";
import { ISeo, IndexingFormData } from "@interface/social.interface";
import TooltipComponent from "@components/molecules/tooltip";
import { InfoIcon } from "@components/atoms/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { indexingSchema } from "./validation.yup";

export interface IndexingFormRef {
  getFormValues: () => IndexingFormData;
  validateForm: () => Promise<boolean>;
}

interface IProps {
  defaultValues?: ISeo;
  onValidationError?: (hasError: boolean) => void;
}

const SeoIndexingForm = forwardRef<IndexingFormRef, IProps>(({ defaultValues, onValidationError }, ref) => {
  const form = useForm<IndexingFormData>({
    defaultValues: {
      indexing: defaultValues?.seoIndexing?.indexing || "",
      following: defaultValues?.seoIndexing?.following || "",
      noarchive: defaultValues?.seoIndexing?.noarchive || false,
      nosnippet: defaultValues?.seoIndexing?.nosnippet || false,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(indexingSchema) as any,
    mode: "onChange"
  });

  const { register, formState: { errors }, getValues } = form;

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
    <div className="flex flex-col gap-6 pt-6 px-2 w-full h-full">
      <div className="flex items-center gap-4">
        <Typography className="form_label py-4">Indexing</Typography>
        <div className="flex items-start flex-grow flex-wrap gap-5 py-4 px-5  border-normal border-[1px] rounded-md shadow-small">
          <div className="flex items-center gap-2">
            <Radio
              label="index"
              value="index"
              className="radio !hover:shadow-none"
              containerProps={{ className: "p-0 ml-2" }}
              labelProps={{ className: "text-[13px] truncate" }}
              crossOrigin={undefined}
              {...register("indexing")}
            />
            <TooltipComponent content="این گزینه باعث می‌شود صفحه در نتایج جستجو نمایش داده شود.">
              <Button className="p-0 bg-transparent">
                <InfoIcon className="h-4 w-4 stroke-primary-normal" />
              </Button>
            </TooltipComponent>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              label="noindex"
              value="noindex"
              className="!hover:shadow-none"
              containerProps={{ className: "p-0 ml-2" }}
              labelProps={{ className: "text-[13px] truncate" }}
              crossOrigin={undefined}
              {...register("indexing")}
            />
            <TooltipComponent content="با انتخاب این گزینه، صفحه از نتایج جستجو حذف می‌شود.">
              <Button className="p-0 bg-transparent">
                <InfoIcon className="h-4 w-4 stroke-primary-normal" />
              </Button>
            </TooltipComponent>
          </div>
        </div>
      </div>
      {errors.indexing && (
        <span className="text-[10px] text-red-700">
          {errors.indexing.message}
        </span>
      )}

      <div className="flex items-center gap-4">
        <Typography className="form_label py-4">following</Typography>
        <div className="flex items-start flex-grow flex-wrap gap-5 py-4 px-5  border-normal border-[1px] rounded-md shadow-small">
          <div className="flex items-center gap-2">
            <Radio
              label="follow"
              value="follow"
              className="radio !hover:shadow-none"
              containerProps={{ className: "p-0 ml-2" }}
              labelProps={{ className: "text-[13px] truncate" }}
              crossOrigin={undefined}
              {...register("following")}
            />
            <TooltipComponent content="موتورهای جستجو لینک‌های موجود در صفحه را دنبال می‌کنند.">
              <Button className="p-0 bg-transparent">
                <InfoIcon className="h-4 w-4 stroke-primary-normal" />
              </Button>
            </TooltipComponent>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              label="nofollow"
              value="nofollow"
              className="!hover:shadow-none"
              containerProps={{ className: "p-0 ml-2" }}
              labelProps={{ className: "text-[13px] truncate" }}
              crossOrigin={undefined}
              {...register("following")}
            />
            <TooltipComponent content="موتورهای جستجو از دنبال کردن لینک‌های این صفحه خودداری می‌کنند.">
              <Button className="p-0 bg-transparent">
                <InfoIcon className="h-4 w-4 stroke-primary-normal" />
              </Button>
            </TooltipComponent>
          </div>
        </div>
      </div>
      {errors.following && (
        <span className="text-[10px] text-red-700">
          {errors.following.message}
        </span>
      )}

      <div className="flex gap-2">
        <div className="flex items-center gap-2">
          <Checkbox
            label={<Typography className="form_label truncate">noarchive</Typography>}
            color="deep-purple"
            crossOrigin={undefined}
            {...register("noarchive")}
          />
          <TooltipComponent content="با انتخاب این گزینه، موتورهای جستجو نسخه کش شده از صفحه را در دسترس قرار نمی‌دهند.">
            <Button className="p-0 bg-transparent">
              <InfoIcon className="h-4 w-4 stroke-primary-normal" />
            </Button>
          </TooltipComponent>
        </div>
        <div className="flex gap-2 items-center">
          <Checkbox
            label={<Typography className="form_label truncate">nosnippet</Typography>}
            color="deep-purple"
            crossOrigin={undefined}
            {...register("nosnippet")}
          />
          <TooltipComponent content="این گزینه مانع نمایش توضیحات یا متن صفحه در نتایج جستجو می‌شود.">
            <Button className="p-0 bg-transparent">
              <InfoIcon className="h-4 w-4 stroke-primary-normal" />
            </Button>
          </TooltipComponent>
        </div>
      </div>
    </div>
  );
});

export default SeoIndexingForm; 