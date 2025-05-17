import React, { useState, useEffect } from "react";
import { Button, Checkbox, Typography } from "@material-tailwind/react";
import FormInput from "@components/atoms/input/formInput";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { useForm } from "react-hook-form";
import { UploadIcon } from "@components/atoms/icons";
import InputAtom from "@components/atoms/input";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";

interface IForm {
  name: string;
  description?: string;
  logo?: string | null;
  mainColor: string;
  useDomainTag: boolean;
  hasLikes: boolean;
  hasComments: boolean;
  hasQuestions: boolean;
  needsAdminApprovalForComments: boolean;
  needsAdminApprovalForQuestions: boolean;
  allowQuestionReplies: boolean;
}

const Settings = () => {
  const { register, reset } = useForm<IForm>();

  const [domain, setDomain] = useState<{
    name: string;
    description: string;
    logo: string | null;
    mainColor: string;
    useDomainTag: boolean;
    hasLikes: boolean;
    hasComments: boolean;
    hasQuestions: boolean;
    needsAdminApprovalForComments: boolean;
    needsAdminApprovalForQuestions: boolean;
    allowQuestionReplies: boolean;
  }>({
    name: "",
    description: "",
    logo: null,
    mainColor: "",
    useDomainTag: true,
    hasLikes: true,
    hasComments: true,
    hasQuestions: true,
    needsAdminApprovalForComments: false,
    needsAdminApprovalForQuestions: false,
    allowQuestionReplies: true,
  });
  const { data: getDomainInfo, isLoading } = useGetDomainInfo();

  useEffect(() => {
    if (getDomainInfo && !isLoading) {
      const content = JSON.parse(getDomainInfo?.content || "{}");
      const { logo, projectDescription, projectName, theme = "{}" } = content;

      let themeColors = {};
      try {
        themeColors = JSON.parse(theme);
      } catch (error) {
        console.error("Error parsing theme:", error);
      }

      const primaryNormal = themeColors?.["--primary-normal"] || "#7F46BF";

      const settings = content.settings || {};

      setDomain({
        name: projectName || "",
        description: projectDescription || "",
        logo: logo || null,
        mainColor: primaryNormal,
        useDomainTag: getDomainInfo?.useDomainTag ?? true,
        hasLikes: settings.hasLikes ?? true,
        hasComments: settings.hasComments ?? true,
        hasQuestions: settings.hasQuestions ?? true,
        needsAdminApprovalForComments: settings.needsAdminApprovalForComments ?? false,
        needsAdminApprovalForQuestions: settings.needsAdminApprovalForQuestions ?? false,
        allowQuestionReplies: settings.allowQuestionReplies ?? true,
      });

      reset({
        name: projectName || "",
        description: projectDescription || "",
        logo: logo || null,
        mainColor: primaryNormal,
        useDomainTag: getDomainInfo?.useDomainTag ?? true,
        hasLikes: settings.hasLikes ?? true,
        hasComments: settings.hasComments ?? true,
        hasQuestions: settings.hasQuestions ?? true,
        needsAdminApprovalForComments: settings.needsAdminApprovalForComments ?? false,
        needsAdminApprovalForQuestions: settings.needsAdminApprovalForQuestions ?? false,
        allowQuestionReplies: settings.allowQuestionReplies ?? true,
      });
    }
  }, [getDomainInfo, isLoading, reset]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDomain({ ...domain, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setDomain({ ...domain, [name]: checked });
  };

  const handleColorChange = (color: string) => {
    setDomain({ ...domain, mainColor: color });
  };

  return (
    <div className="w-full p-5">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <Typography className="title_t2">تنظیمات پایه</Typography>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Typography className="form_label">نام دامنه</Typography>
              <FormInput
                placeholder="نام دامنه"
                register={{
                  ...register("name"),
                }}
                className="domain-edit__form-name"
                value={domain.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="form_label">توضیحات دامنه</Typography>
              <TextareaAtom
                placeholder="توضیحات دامنه"
                register={{
                  ...register("description"),
                }}
                className="domain-edit__form-description"
                value={domain.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="form_label">لوگو</Typography>
              <div className="flex flex-col gap-4 ">
                <label
                  htmlFor="input-file"
                  className="flex h-[72px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-[1px] border-normal"
                >
                  <UploadIcon className="h-5 w-5 stroke-icon-active" />
                  <div className="flex gap-[3px]">
                    <Typography className="select_option__text text-[#0369CD]">
                      برای آپلود کلیک کنید
                    </Typography>
                  </div>
                  <input
                    type="file"
                    id="input-file"
                    className="domain__upload-file-input hidden"
                    // onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="form_label">رنگ اصلی</Typography>
              <div className="flex h-9 w-full flex-grow items-center gap-2 overflow-hidden rounded-lg border-[1px] border-normal bg-gray-50 pl-0 pr-2 ">
                <Typography className="ml-3 !w-full flex-grow ">{domain.mainColor}</Typography>
                <InputAtom
                  placeholder="جستجو ..."
                  type="color"
                  className="search-repo__input ml-3 !h-12 !w-12 !min-w-10 cursor-pointer !overflow-hidden border-none bg-gray-50 outline-none focus:border-none"
                  value={domain.mainColor}
                  onChange={(e) => {
                    handleColorChange(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-5">
            <Typography className="title_t2">تنظیمات پیشرفته</Typography>
            <div className="flex flex-col gap-4">
              <Checkbox
                name="useDomainTag"
                checked={domain.useDomainTag}
                onChange={handleCheckboxChange}
                color="purple"
                crossOrigin=""
                containerProps={{ className: "p-1" }}
                labelProps={{ className: "mr-2" }}
                label={<Typography className="form_label">نمایش مدیریت تگ‌ها</Typography>}
              />
              <Checkbox
                name="hasLikes"
                checked={domain.hasLikes}
                onChange={handleCheckboxChange}
                color="purple"
                crossOrigin=""
                containerProps={{ className: "p-1" }}
                labelProps={{ className: "mr-2" }}
                label={<Typography className="form_label">قابلیت نمایش لایک / دیسلایک</Typography>}
              />
              <div className="flex flex-col gap-4">
                <Checkbox
                  name="hasComments"
                  checked={domain.hasComments}
                  onChange={handleCheckboxChange}
                  color="purple"
                  crossOrigin=""
                  containerProps={{ className: "p-1" }}
                  labelProps={{ className: "mr-2" }}
                  label={<Typography className="form_label">نمایش قسمت نظرات</Typography>}
                />
                <div className="mr-8">
                  <Checkbox
                    name="needsAdminApprovalForComments"
                    checked={domain.needsAdminApprovalForComments}
                    onChange={handleCheckboxChange}
                    color="purple"
                    crossOrigin=""
                    containerProps={{ className: "p-1" }}
                    labelProps={{ className: "mr-2" }}
                    label={
                      <Typography className="form_label">آیا نیاز به تایید ادمین دارد؟</Typography>
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Checkbox
                  name="hasQuestions"
                  checked={domain.hasQuestions}
                  onChange={handleCheckboxChange}
                  color="purple"
                  crossOrigin=""
                  containerProps={{ className: "p-1" }}
                  labelProps={{ className: "mr-2" }}
                  label={<Typography className="form_label">نمایش قسمت سوالات</Typography>}
                />
                <div className="mr-8 flex flex-col gap-4">
                  <Checkbox
                    name="needsAdminApprovalForQuestions"
                    checked={domain.needsAdminApprovalForQuestions}
                    onChange={handleCheckboxChange}
                    color="purple"
                    crossOrigin=""
                    containerProps={{ className: "p-1" }}
                    labelProps={{ className: "mr-2" }}
                    label={
                      <Typography className="form_label">آیا نیاز به تایید ادمین دارد؟</Typography>
                    }
                  />
                  <Checkbox
                    name="allowQuestionReplies"
                    checked={domain.allowQuestionReplies}
                    onChange={handleCheckboxChange}
                    color="purple"
                    crossOrigin=""
                    containerProps={{ className: "p-1" }}
                    labelProps={{ className: "mr-2" }}
                    label={
                      <Typography className="form_label">
                        آیا امکان پاسخ به سوال وجود دارد؟
                      </Typography>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end">
            <Button className="w-fit bg-primary-normal text-white hover:bg-primary-normal ">
              ذخیره
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
