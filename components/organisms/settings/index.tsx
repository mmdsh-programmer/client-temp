import React, { useState, useEffect } from "react";
import { Button, Typography, Spinner } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import useUpdateDomain from "@hooks/domain/useUpdateDomain";
import useGetUser from "@hooks/auth/useGetUser";
import { ContentType, IDomainTheme, ThemeColors } from "@interface/domain.interface";
import AdvancedSettings from "./advancedSettings";
import ColorsSettings from "./colorsSettings";
import LogoUploader from "./logoUploader";
import BasicInfo from "./basicInfo";


const Settings = () => {
  const { data: getDomainInfo, isLoading } = useGetDomainInfo();
  const updateDomain = useUpdateDomain();
  const { data: userInfo } = useGetUser();
  const [originalContent, setOriginalContent] = useState<ContentType>({});
  const [uploadLoading] = useState(false);
  const [uploadProgress] = useState(0);

  const { register, reset, handleSubmit, watch } = useForm<IDomainTheme>();
  const formValues = watch();

  const [domain, setDomain] = useState<IDomainTheme>({
    name: "",
    description: "",
    logo: null,
    mainColor: "",
    primaryLight: "",
    error: "",
    successNormal: "",
    info: "",
    criticalNormal: "",
    iconActive: "",
    textPrimary: "",
    textSecondary: "",
    borderNormal: "",
    bgCardBackground: "",
    useDomainTag: false,
    hasLikes: false,
    hasComments: false,
    hasQuestions: false,
    needsAdminApprovalForComments: false,
    needsAdminApprovalForQuestions: false,
    allowQuestionReplies: false,
  });

  useEffect(() => {
    if (getDomainInfo && !isLoading) {
      const content = JSON.parse(getDomainInfo?.content || "{}");
      setOriginalContent(content);
      const { logo, projectDescription, projectName, theme = "{}" } = content;

      let themeColors: ThemeColors = {};
      try {
        themeColors = JSON.parse(theme);
      } catch (error) {
        console.error("Error parsing theme:", error);
      }

      const primaryNormal = themeColors?.["--primary-normal"] || "#7F46BF";
      const primaryLight = themeColors?.["--primary-light"] || "#EFE9F8";
      const error = themeColors?.["--error"] || "#F44336";
      const successNormal = themeColors?.["--success-normal"] || "#4CAF50";
      const info = themeColors?.["--info"] || "#2196F3";
      const criticalNormal = themeColors?.["--critical-normal"] || "#FF9800";
      const iconActive = themeColors?.["--icon-active"] || "#44354D";
      const textPrimary = themeColors?.["--text-primary"] || "#303030";
      const textSecondary = themeColors?.["--text-secondary"] || "#606060";
      const borderNormal = themeColors?.["--border-normal"] || "#E5E5E5";
      const bgCardBackground = themeColors?.["--bg-card-background-color"] || "#FFFFFF";

      const settings = content.settings || {};

      const formData = {
        name: projectName || "",
        description: projectDescription || "",
        logo: logo || null,
        mainColor: primaryNormal,
        primaryLight,
        error,
        successNormal,
        info,
        criticalNormal,
        iconActive,
        textPrimary,
        textSecondary,
        borderNormal,
        bgCardBackground,
        useDomainTag: getDomainInfo?.useDomainTag ?? false,
        hasLikes: settings.hasLikes ?? false,
        hasComments: settings.hasComments ?? false,
        hasQuestions: settings.hasQuestions ?? false,
        needsAdminApprovalForComments: settings.needsAdminApprovalForComments ?? false,
        needsAdminApprovalForQuestions: settings.needsAdminApprovalForQuestions ?? false,
        allowQuestionReplies: settings.allowQuestionReplies ?? false,
      };

      reset(formData);
      setDomain(formData);
    }
  }, [getDomainInfo, isLoading, reset, userInfo]);

  useEffect(() => {
    if (Object.keys(formValues).length > 0) {
      setDomain((prev) => {
        return {
          ...prev,
          ...formValues,
        };
      });
    }
  }, [formValues]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDomain({ ...domain, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setDomain({ ...domain, [name]: checked });
  };

  const handleColorChange = (color: string, field: keyof IDomainTheme) => {
    setDomain({ ...domain, [field]: color });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // setSelectedLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async () => {

    const updatedContent = {
      ...originalContent,
      projectName: domain.name,
      projectDescription: domain.description,
      logo: domain.logo,
      theme: JSON.stringify({
        ...JSON.parse(originalContent.theme || "{}"),
        "--primary-normal": domain.mainColor,
        "--primary-light": domain.primaryLight,
        "--error": domain.error,
        "--success-normal": domain.successNormal,
        "--info": domain.info,
        "--critical-normal": domain.criticalNormal,
        "--icon-active": domain.iconActive,
        "--text-primary": domain.textPrimary,
        "--text-secondary": domain.textSecondary,
        "--border-normal": domain.borderNormal,
        "--bg-card-background-color": domain.bgCardBackground,
      }),
      settings: {
        ...originalContent.settings,
        hasLikes: domain.hasLikes,
        hasComments: domain.hasComments,
        hasQuestions: domain.hasQuestions,
        needsAdminApprovalForComments: domain.needsAdminApprovalForComments,
        needsAdminApprovalForQuestions: domain.needsAdminApprovalForQuestions,
        allowQuestionReplies: domain.allowQuestionReplies,
      },
    };

    updateDomain.mutate({
      content: JSON.stringify(updatedContent),
      useDomainTag: domain.useDomainTag,
      hasLikes: domain.hasLikes,
      hasComments: domain.hasComments,
      hasQuestions: domain.hasQuestions,
      needsAdminApprovalForComments: domain.needsAdminApprovalForComments,
      needsAdminApprovalForQuestions: domain.needsAdminApprovalForQuestions,
      allowQuestionReplies: domain.allowQuestionReplies,
    });
  };

  if (isLoading || uploadLoading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Spinner className="h-8 w-8" color="deep-purple" />
        {uploadLoading && (
          <Typography className="mt-2">در حال آپلود لوگو... {uploadProgress}%</Typography>
        )}
      </div>
    );
  }

  return (
    <div className="w-full p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <Typography className="title_t2">تنظیمات پایه</Typography>
          <div className="flex flex-col gap-5">
            <BasicInfo domain={domain} onInputChange={handleInputChange} register={register} />
            <LogoUploader onChange={handleFileChange} />
            <ColorsSettings domain={domain} onColorChange={handleColorChange} />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-5">
            <Typography className="title_t2">تنظیمات پیشرفته</Typography>
            <AdvancedSettings domain={domain} onCheckboxChange={handleCheckboxChange} />
          </div>
          <div className="flex w-full justify-end">
            <Button
              className="w-fit bg-primary-normal text-white hover:bg-primary-normal "
              // disabled={updateDomain.isPending || uploadLoading}
              disabled
              type="submit"
            >
              {updateDomain.isPending || uploadLoading ? "در حال ذخیره..." : "ذخیره"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
