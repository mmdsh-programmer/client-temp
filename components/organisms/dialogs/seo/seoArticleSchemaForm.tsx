import React, { useImperativeHandle, forwardRef, useEffect } from "react";
import InputAtom from "@components/atoms/input";
import {
  EArticleSchemaAuthorType,
  EArticleSchemaPublisherType,
  EArticleSchemaType,
} from "@interface/enums";
import { Option, Select, Typography } from "@material-tailwind/react";
import { DatePicker } from "zaman";
import { ISeo, ArticleSchemaFormData } from "@interface/social.interface";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { articleSchemaSchema } from "./validation.yup";

export interface ArticleSchemaFormRef {
  getFormValues: () => ArticleSchemaFormData;
  validateForm: () => Promise<boolean>;
}

interface IProps {
  defaultValues?: ISeo;
  onValidationError?: (hasError: boolean) => void;
}

const SeoArticleSchemaForm = forwardRef<ArticleSchemaFormRef, IProps>(({ defaultValues, onValidationError }, ref) => {
  // Format date string to a valid date format or empty string
  const formatDateString = (dateStr: string | undefined): string => {
    if (!dateStr) return "";
    
    try {
      // Try to parse the date
      const date = new Date(dateStr);
      
      // Check if date is valid
      if (Number.isNaN(date.getTime())) {
        return "";
      }
      
      // Return in YYYY-MM-DD format
      return date.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const defaultArticleSchema: ArticleSchemaFormData = {
    "@type": defaultValues?.articleSchema?.["@type"] || EArticleSchemaType.ARTICLE,
    headline: defaultValues?.articleSchema?.headline || "",
    description: defaultValues?.articleSchema?.description || "",
    image: {
      url: defaultValues?.articleSchema?.image?.url || "",
      width: defaultValues?.articleSchema?.image?.width || "",
      height: defaultValues?.articleSchema?.image?.height || "",
    },
    author: {
      "@type": defaultValues?.articleSchema?.author?.["@type"] || EArticleSchemaAuthorType.PERSON,
      name: defaultValues?.articleSchema?.author?.name || "",
    },
    publisher: {
      "@type": defaultValues?.articleSchema?.publisher?.["@type"] || EArticleSchemaPublisherType.ORGANIZATION,
      name: defaultValues?.articleSchema?.publisher?.name || "",
      logo: {
        url: defaultValues?.articleSchema?.publisher?.logo?.url || "",
        width: defaultValues?.articleSchema?.publisher?.logo?.width || "",
        height: defaultValues?.articleSchema?.publisher?.logo?.height || "",
      },
    },
    datePublished: formatDateString(defaultValues?.articleSchema?.datePublished),
    dateModified: formatDateString(defaultValues?.articleSchema?.dateModified),
  };

  const form = useForm<ArticleSchemaFormData>({
    defaultValues: defaultArticleSchema,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(articleSchemaSchema) as any,
    mode: "onChange"
  });

  const { register, setValue, formState: { errors }, watch, getValues, reset } = form;

  // Reset form with new default values when they change
  useEffect(() => {
    const updatedValues = {
      "@type": defaultValues?.articleSchema?.["@type"] || EArticleSchemaType.ARTICLE,
      headline: defaultValues?.articleSchema?.headline || "",
      description: defaultValues?.articleSchema?.description || "",
      image: {
        url: defaultValues?.articleSchema?.image?.url || "",
        width: defaultValues?.articleSchema?.image?.width || "",
        height: defaultValues?.articleSchema?.image?.height || "",
      },
      author: {
        "@type": defaultValues?.articleSchema?.author?.["@type"] || EArticleSchemaAuthorType.PERSON,
        name: defaultValues?.articleSchema?.author?.name || "",
      },
      publisher: {
        "@type": defaultValues?.articleSchema?.publisher?.["@type"] || EArticleSchemaPublisherType.ORGANIZATION,
        name: defaultValues?.articleSchema?.publisher?.name || "",
        logo: {
          url: defaultValues?.articleSchema?.publisher?.logo?.url || "",
          width: defaultValues?.articleSchema?.publisher?.logo?.width || "",
          height: defaultValues?.articleSchema?.publisher?.logo?.height || "",
        },
      },
      datePublished: formatDateString(defaultValues?.articleSchema?.datePublished),
      dateModified: formatDateString(defaultValues?.articleSchema?.dateModified),
    };
    
    reset(updatedValues);
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

  const handleDateChange = (field: "datePublished" | "dateModified") => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (selectedTime: any) => {
      if (selectedTime?.value) {
        try {
          const date = new Date(selectedTime.value);
          // Check if date is valid
          if (!Number.isNaN(date.getTime())) {
            const formattedDate = date.toISOString().split("T")[0];
            setValue(field, formattedDate, { shouldValidate: true });
          } else {
            setValue(field, "", { shouldValidate: true });
          }
        } catch {
          setValue(field, "", { shouldValidate: true });
        }
      } else {
        setValue(field, "", { shouldValidate: true });
      }
    };
  };

  return (
    <div className="flex flex-col gap-6 pt-6 px-2 w-full">
      <div className="flex flex-col gap-2">
        <Select
          className="custom-select"
          label="انتخاب نوع مقاله"
          variant="outlined"
          value={watch("@type")}
          onChange={(value) => {
            setValue("@type", value as EArticleSchemaType, { shouldValidate: true });
          }}
        >
          {Object.values(EArticleSchemaType).map((type) => {
            return (
              <Option key={type} value={type}>
                {type}
              </Option>
            );
          })}
        </Select>
        {errors["@type"] && (
          <span className="text-[10px] text-red-700">
            {errors["@type"].message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Typography className="form_label">عنوان مقاله</Typography>
        <InputAtom
          className="bg-white"
          placeholder="عنوان مقاله"
          register={{ ...register("headline") }}
        />
        {errors.headline && (
          <span className="text-[10px] text-red-700">
            {errors.headline.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Typography className="form_label">توضیحات</Typography>
        <InputAtom
          className="bg-white"
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
        <Typography className="form_label">تصویر URL</Typography>
        <InputAtom
          className="bg-white"
          placeholder="آدرس تصویر"
          type="url"
          register={{ ...register("image.url") }}
        />
        {errors.image?.url && (
          <span className="text-[10px] text-red-700">
            {errors.image.url.message}
          </span>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <Typography className="form_label">عرض تصویر</Typography>
          <InputAtom
            className="bg-white"
            placeholder="عرض"
            type="number"
            min={1}
            register={{ ...register("image.width") }}
          />
          {errors.image?.width && (
            <span className="text-[10px] text-red-700">
              {errors.image.width.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <Typography className="form_label">ارتفاع تصویر</Typography>
          <InputAtom
            className="bg-white"
            placeholder="ارتفاع"
            type="number"
            min={1}
            register={{ ...register("image.height") }}
          />
          {errors.image?.height && (
            <span className="text-[10px] text-red-700">
              {errors.image.height.message}
            </span>
          )}
        </div>
      </div>

      {/* Author fields */}
      <div className="flex flex-col gap-2">
        <Select
          className="custom-select"
          label="انتخاب نوع نویسنده"
          variant="outlined"
          value={watch("author.@type")}
          onChange={(value) => {
            setValue("author.@type", value as EArticleSchemaAuthorType, { shouldValidate: true });
          }}
        >
          {Object.values(EArticleSchemaAuthorType).map((type) => {
            return (
              <Option key={type} value={type}>
                {type}
              </Option>
            );
          })}
        </Select>
        {errors.author?.["@type"] && (
          <span className="text-[10px] text-red-700">
            {errors.author?.["@type"].message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Typography className="form_label">نام نویسنده</Typography>
        <InputAtom
          className="bg-white"
          placeholder="نام نویسنده"
          register={{ ...register("author.name") }}
        />
        {errors.author?.name && (
          <span className="text-[10px] text-red-700">
            {errors.author.name.message}
          </span>
        )}
      </div>

      {/* Publisher fields */}
      <div className="flex flex-col gap-2">
        <Select
          className="custom-select"
          label="انتخاب نوع ناشر"
          variant="outlined"
          value={watch("publisher.@type")}
          onChange={(value) => {
            setValue("publisher.@type", value as EArticleSchemaPublisherType, { shouldValidate: true });
          }}
        >
          {Object.values(EArticleSchemaPublisherType).map((type) => {
            return (
              <Option key={type} value={type}>
                {type}
              </Option>
            );
          })}
        </Select>
        {errors.publisher?.["@type"] && (
          <span className="text-[10px] text-red-700">
            {errors.publisher?.["@type"].message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Typography className="form_label">نام ناشر</Typography>
        <InputAtom
          className="bg-white"
          placeholder="نام ناشر"
          register={{ ...register("publisher.name") }}
        />
        {errors.publisher?.name && (
          <span className="text-[10px] text-red-700">
            {errors.publisher.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Typography className="form_label">لوگو ناشر URL</Typography>
        <InputAtom
          className="bg-white"
          placeholder="آدرس لوگو"
          type="url"
          register={{ ...register("publisher.logo.url") }}
        />
        {errors.publisher?.logo?.url && (
          <span className="text-[10px] text-red-700">
            {errors.publisher.logo.url.message}
          </span>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <Typography className="form_label">عرض لوگو</Typography>
          <InputAtom
            className="bg-white"
            placeholder="عرض"
            type="number"
            min={1}
            register={{ ...register("publisher.logo.width") }}
          />
          {errors.publisher?.logo?.width && (
            <span className="text-[10px] text-red-700">
              {errors.publisher.logo.width.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <Typography className="form_label">ارتفاع لوگو</Typography>
          <InputAtom
            className="bg-white"
            placeholder="ارتفاع"
            type="number"
            min={1}
            register={{ ...register("publisher.logo.height") }}
          />
          {errors.publisher?.logo?.height && (
            <span className="text-[10px] text-red-700">
              {errors.publisher.logo.height.message}
            </span>
          )}
        </div>
      </div>

      {/* Date fields */}
      <div className="flex flex-col gap-2">
        <Typography className="form_label">تاریخ انتشار</Typography>
        <div className="relative">
          <DatePicker
            locale="fa"
            direction="rtl"
            inputClass="w-full bg-white border border-blue-gray-200 rounded-md px-3 py-2.5 font-iranYekan"
            onChange={handleDateChange("datePublished")}
            defaultValue={watch("datePublished") || undefined}
            className="z-[9999]"
            customShowDateFormat="YYYY-MM-DD"
          />
        </div>
        {errors.datePublished && (
          <span className="text-[10px] text-red-700">
            {errors.datePublished.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Typography className="form_label">تاریخ آخرین ویرایش</Typography>
        <div className="relative">
          <DatePicker
            locale="fa"
            direction="rtl"
            inputClass="w-full bg-white border border-blue-gray-200 rounded-md px-3 py-2.5 font-iranYekan"
            onChange={handleDateChange("dateModified")}
            defaultValue={watch("dateModified") || undefined}
            className="z-[9999]"
            customShowDateFormat="YYYY-MM-DD"
          />
        </div>
        {errors.dateModified && (
          <span className="text-[10px] text-red-700">
            {errors.dateModified.message}
          </span>
        )}
      </div>
    </div>
  );
});

export default SeoArticleSchemaForm; 