import React, { useState, useEffect } from "react";
import { Typography, Spinner } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import useUpdateDomain from "@hooks/domain/useUpdateDomain";
import { ContentType, IDomainTheme, ThemeColors } from "@interface/domain.interface";
import AdvancedSettings from "./advancedSettings";
import ColorsSettings from "./colorsSettings";
import LogoUploader from "./logoUploader";
import BasicInfo from "./basicInfo";
import LoadingButton from "@components/molecules/loadingButton";

const Settings = () => {
  const { data: getDomainInfo, isLoading } = useGetDomainInfo();
  const updateDomain = useUpdateDomain();
  const [originalContent, setOriginalContent] = useState<ContentType>({});
  const [uploadLoading] = useState(false);
  const [uploadProgress] = useState(0);

  const { register, handleSubmit, setValue, watch, reset } = useForm<IDomainTheme>({
    defaultValues: {
    name: "",
    description: "",
    logo: null,
      // colors
      mainColor: "",
      primaryLight: "",
      bgPrimaryColor: "",
      bgSecondaryColor: "",
      bgSecondaryLightColor: "",
      bgTertiaryColor: "",
      bgCardBackground: "",
      gray50: "",
      gray100: "",
      gray200: "",
      gray300: "",
      gray400: "",
      gray500: "",
      gray700: "",
      gray800: "",
      gray900: "",
      iconActive: "",
      iconHover: "",
      criticalNormal: "",
      error: "",
      successNormal: "",
      successSecondary: "",
      info: "",
      infoSecondary: "",
      textPrimary: "",
      textSecondary: "",
      textHint: "",
      textPlaceholder: "",
      textDisabled: "",
      textPrimaryNormal: "",
      textLink: "",
      borderNormal: "",
      orange100: "",
      blueGreen: "",

      // settings
      useDomainTag: false,
      hasLikes: false,
      hasComments: false,
      hasQuestions: false,
      needsAdminApprovalForComments: false,
      needsAdminApprovalForQuestions: false,
      allowQuestionReplies: false,
      accessToCreateRepo: false,
    },
  });

  const formValues = watch();

  useEffect(() => {
    if (getDomainInfo && !isLoading) {
      try {
        let content = {} as ContentType;
        if (typeof getDomainInfo?.content === "string") {
          content = JSON.parse(getDomainInfo?.content || "{}");
        } else if (typeof getDomainInfo?.content === "object") {
          content = getDomainInfo?.content || {};
        }

        setOriginalContent(content);

        const { logo, projectDescription, projectName, theme = {} } = content;

        let themeColors: ThemeColors = {};
        if (typeof theme === "string") {
          try {
            themeColors = JSON.parse(theme);
          } catch (e) {
            console.error("Error parsing theme string:", e);
          }
        } else if (typeof theme === "object" && theme !== null) {
          themeColors = theme as ThemeColors;
        }

        reset({
          name: projectName || "",
          description: projectDescription || "",
          logo: logo || null,

          // colors
          mainColor: themeColors?.["--primary-normal"] || "#7F46BF",
          primaryLight: themeColors?.["--primary-light"] || "#EFE9F8",
          bgPrimaryColor: themeColors?.["--bg-primary-color"] || "#F5F7FA",
          bgSecondaryColor: themeColors?.["--bg-secondary-color"] || "#F5F7FA",
          bgSecondaryLightColor: themeColors?.["--bg-secondary-light-color"] || "#c29ff1",
          bgTertiaryColor: themeColors?.["--bg-tertiary-color"] || "#7446B2",
          bgCardBackground: themeColors?.["--bg-card-background-color"] || "#FFFFFF",
          gray50: themeColors?.["--gray-50"] || "#F6F7F8",
          gray100: themeColors?.["--gray-100"] || "#EEF0F2",
          gray200: themeColors?.["--gray-200"] || "#ECECEE",
          gray300: themeColors?.["--gray-300"] || "#CED4D9",
          gray400: themeColors?.["--gray-400"] || "#9AA6B1",
          gray500: themeColors?.["--gray-500"] || "#71717A",
          gray700: themeColors?.["--gray-700"] || "#414147",
          gray800: themeColors?.["--gray-800"] || "#1B1B1D",
          gray900: themeColors?.["--gray-900"] || "#181C20",
          iconActive: themeColors?.["--icon-active"] || "#181C20",
          iconHover: themeColors?.["--icon-hover"] || "#667585",
          criticalNormal: themeColors?.["--critical-normal"] || "#E03E1A",
          error: themeColors?.["--error"] || "#E03E1A",
          successNormal: themeColors?.["--success-normal"] || "#1F7A37",
          successSecondary: themeColors?.["--success-secondary"] || "#F7FDF8",
          info: themeColors?.["--info"] || "#9c5df1",
          infoSecondary: themeColors?.["--info-secondary"] || "#E7F5FD",
          textPrimary: themeColors?.["--text-primary"] || "#7446B2",
          textSecondary: themeColors?.["--text-secondary"] || "#667585",
          textHint: themeColors?.["--text-hint"] || "#9AA6B1",
          textPlaceholder: themeColors?.["--text-placeholder"] || "#98A2B3",
          textDisabled: themeColors?.["--text-disabled"] || "#9AA6B1",
          textPrimaryNormal: themeColors?.["--text-primary-normal"] || "#0C0E10",
          textLink: themeColors?.["--text-link"] || "#667585",
          borderNormal: themeColors?.["--border-normal"] || "#EEF0F2",
          orange100: themeColors?.["--orange-100"] || "#FFF4ED",
          blueGreen: themeColors?.["--blue-green"] || "#EBF9F7",

          // settings
          useDomainTag: getDomainInfo?.useDomainTag,
          hasLikes: getDomainInfo?.hasLikes,
          hasComments: getDomainInfo?.hasComments,
          hasQuestions: getDomainInfo?.hasQuestions,
          needsAdminApprovalForComments: getDomainInfo?.needsAdminApprovalForComments,
          needsAdminApprovalForQuestions: getDomainInfo?.needsAdminApprovalForQuestions,
          allowQuestionReplies: getDomainInfo?.allowQuestionReplies,
          accessToCreateRepo: getDomainInfo?.accessToCreateRepo,
        });
      } catch (error) {
        console.error("Error processing domain info:", error);
      }
    }
  }, [getDomainInfo, isLoading, reset]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof IDomainTheme, value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setValue(name as keyof IDomainTheme, checked);
  };

  const handleColorChange = (color: string, field: keyof IDomainTheme) => {
    setValue(field, color);
  };

  const onSubmit = (data: IDomainTheme) => {
    try {
      let originalTheme = {} as ThemeColors;
      if (typeof originalContent.theme === "string") {
        try {
          originalTheme = JSON.parse(originalContent.theme);
        } catch (e) {
          console.error("Error parsing original theme:", e);
        }
      } else if (typeof originalContent.theme === "object" && originalContent.theme !== null) {
        originalTheme = originalContent.theme as ThemeColors;
      }

      const updatedContent = {
        ...originalContent,
        projectName: data.name,
        projectDescription: data.description,
        logo: data.logo,
        theme: {
          ...originalTheme,
          // colors
          "--primary-normal": data.mainColor,
          "--primary-light": data.primaryLight,
          "--bg-primary-color": data.bgPrimaryColor,
          "--bg-secondary-color": data.bgSecondaryColor,
          "--bg-secondary-light-color": data.bgSecondaryLightColor,
          "--bg-tertiary-color": data.bgTertiaryColor,
          "--bg-card-background-color": data.bgCardBackground,
          "--gray-50": data.gray50,
          "--gray-100": data.gray100,
          "--gray-200": data.gray200,
          "--gray-300": data.gray300,
          "--gray-400": data.gray400,
          "--gray-500": data.gray500,
          "--gray-700": data.gray700,
          "--gray-800": data.gray800,
          "--gray-900": data.gray900,
          "--icon-active": data.iconActive,
          "--icon-hover": data.iconHover,
          "--critical-normal": data.criticalNormal,
          "--error": data.error,
          "--success-normal": data.successNormal,
          "--success-secondary": data.successSecondary,
          "--info": data.info,
          "--info-secondary": data.infoSecondary,
          "--text-primary": data.textPrimary,
          "--text-secondary": data.textSecondary,
          "--text-hint": data.textHint,
          "--text-placeholder": data.textPlaceholder,
          "--text-disabled": data.textDisabled,
          "--text-primary-normal": data.textPrimaryNormal,
          "--text-link": data.textLink,
          "--border-normal": data.borderNormal,
          "--orange-100": data.orange100,
          "--blue-green": data.blueGreen,
        },
      };

      if (updatedContent.settings) {
        delete updatedContent.settings;
      }

      updateDomain.mutate({
        content: JSON.stringify(updatedContent),
        useDomainTag: data.useDomainTag,
        hasLikes: data.hasLikes,
        hasComments: data.hasComments,
        hasQuestions: data.hasQuestions,
        needsAdminApprovalForComments: data.needsAdminApprovalForComments,
        needsAdminApprovalForQuestions: data.needsAdminApprovalForQuestions,
        allowQuestionReplies: data.allowQuestionReplies,
        accessToCreateRepo: data.accessToCreateRepo,
      });
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
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
            <BasicInfo domain={formValues} onInputChange={handleInputChange} register={register} />
            <LogoUploader
              onInputChange={handleInputChange}
              register={register}
              logoHash={formValues.logo}
            />
            <ColorsSettings domain={formValues} onColorChange={handleColorChange} />
          </div>
        </div>
        <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-5">
          <Typography className="title_t2">تنظیمات پیشرفته</Typography>
            <AdvancedSettings domain={formValues} onCheckboxChange={handleCheckboxChange} />
              </div>
          <div className="flex w-full justify-end">
            <LoadingButton
              className="dialog-footer__submit-button bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
              onClick={handleSubmit(onSubmit)}
              loading={updateDomain.isPending || uploadLoading}
            >
              <Typography className="text__label__button text-white">ذخیره</Typography>
            </LoadingButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
