import * as yup from "yup";
import {
  EArticleSchemaType,
  EArticleSchemaAuthorType,
  EArticleSchemaPublisherType,
} from "@interface/enums";

const urlPattern = /^(https?:\/\/)([\w-]+(\.[\w-]+)*|localhost)(:\d+)?(\/.*)?$/;

// Base SEO validation schema
export const seoSchema = yup.object().shape({
  title: yup.string().required("عنوان الزامی است"),
  description: yup.string().required("توضیحات الزامی است"),
  keywords: yup.string().required("کلمات کلیدی الزامی است"),
  language: yup.string().required("زبان الزامی است"),
  canonicalUrl: yup
    .string()
    .matches(urlPattern, "لطفا یک آدرس URL معتبر وارد کنید")
    .nullable(),
});

// Open Graph validation schema
export const openGraphSchema = yup.object().shape({
  openGraph: yup.object({
    title: yup.string().required("عنوان الزامی است"),
    description: yup.string().required("توضیحات الزامی است"),
    URL: yup
      .string()
      .matches(urlPattern, "لطفا یک آدرس URL معتبر وارد کنید")
      .required("URL الزامی است"),
    author: yup.string().required("نویسنده الزامی است"),
  }).required(),
});

// SEO Indexing validation schema
export const indexingSchema = yup.object().shape({
  indexing: yup.string().required("انتخاب گزینه indexing الزامی است"),
  following: yup.string().required("انتخاب گزینه following الزامی است"),
  noarchive: yup.boolean().default(false),
  nosnippet: yup.boolean().default(false),
});

// Article Schema validation
export const articleSchemaSchema = yup.object().shape({
  "@type": yup
    .string()
    .oneOf(Object.values(EArticleSchemaType))
    .required("نوع مقاله الزامی است"),
  headline: yup.string().required("عنوان مقاله الزامی است"),
  description: yup.string().nullable().optional(),
  image: yup.object({
    url: yup
      .string()
      .url("فرمت URL معتبر نیست")
      .required("آدرس تصویر الزامی است"),
    width: yup
      .string()
      .test(
        "is-positive-number",
        "عرض تصویر باید یک عدد مثبت باشد",
        (value) => {
          if (!value) return true; // Optional field
          const num = Number(value);
          return !Number.isNaN(num) && num > 0;
        }
      )
      .nullable()
      .optional(),
    height: yup
      .string()
      .test(
        "is-positive-number",
        "ارتفاع تصویر باید یک عدد مثبت باشد",
        (value) => {
          if (!value) return true; // Optional field
          const num = Number(value);
          return !Number.isNaN(num) && num > 0;
        }
      )
      .nullable()
      .optional(),
  }),
  author: yup.object({
    "@type": yup
      .string()
      .oneOf(Object.values(EArticleSchemaAuthorType))
      .required("نوع نویسنده الزامی است"),
    name: yup.string().required("نام نویسنده الزامی است"),
  }),
  publisher: yup.object({
    "@type": yup
      .string()
      .oneOf(Object.values(EArticleSchemaPublisherType))
      .required("نوع ناشر الزامی است"),
    name: yup.string().required("نام ناشر الزامی است"),
    logo: yup.object({
      url: yup
        .string()
        .url("فرمت URL معتبر نیست")
        .required("آدرس لوگو الزامی است"),
      width: yup
        .string()
        .test(
          "is-positive-number",
          "عرض لوگو باید یک عدد مثبت باشد",
          (value) => {
            if (!value) return true; // Optional field
            const num = Number(value);
            return !Number.isNaN(num) && num > 0;
          }
        )
        .nullable()
        .optional(),
      height: yup
        .string()
        .test(
          "is-positive-number",
          "ارتفاع لوگو باید یک عدد مثبت باشد",
          (value) => {
            if (!value) return true; // Optional field
            const num = Number(value);
            return !Number.isNaN(num) && num > 0;
          }
        )
        .nullable()
        .optional(),
    }),
  }),
  datePublished: yup.string().required("تاریخ انتشار الزامی است"),
  dateModified: yup.string().nullable().optional(),
});

// Combined schema for the entire SEO dialog
export const combinedSeoSchema = yup.object().shape({
  ...seoSchema.fields,
  ...openGraphSchema.fields,
  ...indexingSchema.fields,
  ...articleSchemaSchema.fields,
}); 