import React from "react";
import { Typography } from "@material-tailwind/react";
import { IDomainTheme } from "@interface/domain.interface";
import ColorInput from "./colorInput";

interface ColorsSettingsProps {
  domain: IDomainTheme;
  onColorChange: (color: string, field: keyof IDomainTheme) => void;
}

const ColorsSettings = ({ domain, onColorChange }: ColorsSettingsProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <Typography className="title_t2 mb-4">رنگ‌های اصلی</Typography>
        <div className="grid grid-cols-1 gap-6">
          <ColorInput
            label="رنگ اصلی"
            color={domain.mainColor}
            fieldName="mainColor"
            description="استفاده در: دکمه‌های فرم‌ها، چک باکس‌ها، نوار منوی انتخاب شده، عناصر تعاملی"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="رنگ اصلی روشن"
            color={domain.primaryLight}
            fieldName="primaryLight"
            description="استفاده در: پس‌زمینه عناصر، حالت‌های هاور، بج‌ها"
            onColorChange={onColorChange}
          />
        </div>
      </div>
      <div>
        <Typography className="title_t2 mb-4">رنگ‌های پس‌زمینه</Typography>
        <div className="grid grid-cols-1 gap-6">
          <ColorInput
            label="پس‌زمینه اصلی"
            color={domain.bgPrimaryColor}
            fieldName="bgPrimaryColor"
            description="استفاده در: پس‌زمینه اصلی صفحات"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="پس‌زمینه ثانویه"
            color={domain.bgSecondaryColor}
            fieldName="bgSecondaryColor"
            description="استفاده در: پس‌زمینه بخش‌های ثانویه"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="پس‌زمینه ثانویه روشن"
            color={domain.bgSecondaryLightColor}
            fieldName="bgSecondaryLightColor"
            description="استفاده در: پس‌زمینه عناصر ثانویه با تن روشن‌تر"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="پس‌زمینه سوم"
            color={domain.bgTertiaryColor}
            fieldName="bgTertiaryColor"
            description="استفاده در: پس‌زمینه عناصر تکمیلی"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="پس‌زمینه کارت"
            color={domain.bgCardBackground}
            fieldName="bgCardBackground"
            description="استفاده در: پس‌زمینه کارت‌ها، پنل‌ها، کادرهای محتوا"
            onColorChange={onColorChange}
          />
        </div>
      </div>
      <div>
        <Typography className="title_t2 mb-4">رنگ‌های وضعیت</Typography>
        <div className="grid grid-cols-1 gap-6">
          <ColorInput
            label="رنگ خطا"
            color={domain.error}
            fieldName="error"
            description="استفاده در: پیام‌های خطا، حالت‌های ناموفق"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="رنگ هشدار"
            color={domain.criticalNormal}
            fieldName="criticalNormal"
            description="استفاده در: هشدارهای بحرانی، اخطارهای مهم"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="رنگ موفقیت"
            color={domain.successNormal}
            fieldName="successNormal"
            description="استفاده در: پیام‌های موفقیت، وضعیت‌های تایید شده"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="رنگ موفقیت روشن"
            color={domain.successSecondary}
            fieldName="successSecondary"
            description="استفاده در: پس‌زمینه پیام‌های موفقیت"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="رنگ اطلاعات"
            color={domain.info}
            fieldName="info"
            description="استفاده در: پیام‌های اطلاع‌رسانی، راهنما"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="رنگ اطلاعات روشن"
            color={domain.infoSecondary}
            fieldName="infoSecondary"
            description="استفاده در: پس‌زمینه پیام‌های اطلاع‌رسانی"
            onColorChange={onColorChange}
          />
        </div>
      </div>
      <div>
        <Typography className="title_t2 mb-4">رنگ‌های متن</Typography>
        <div className="grid grid-cols-1 gap-6">
          <ColorInput
            label="متن اصلی"
            color={domain.textPrimary}
            fieldName="textPrimary"
            description="استفاده در: متن‌های اصلی، عناوین"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="متن ثانویه"
            color={domain.textSecondary}
            fieldName="textSecondary"
            description="استفاده در: توضیحات، زیرمتن‌ها"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="متن راهنما"
            color={domain.textHint}
            fieldName="textHint"
            description="استفاده در: متن‌های راهنما و توضیحات اضافی"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="متن پیش‌فرض"
            color={domain.textPlaceholder}
            fieldName="textPlaceholder"
            description="استفاده در: متن پیش‌فرض فیلدهای ورودی"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="متن غیرفعال"
            color={domain.textDisabled}
            fieldName="textDisabled"
            description="استفاده در: متن‌های غیرفعال"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="متن اصلی نرمال"
            color={domain.textPrimaryNormal}
            fieldName="textPrimaryNormal"
            description="استفاده در: متن‌های اصلی با وزن معمولی"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="متن لینک"
            color={domain.textLink}
            fieldName="textLink"
            description="استفاده در: لینک‌ها و عناصر قابل کلیک"
            onColorChange={onColorChange}
          />
        </div>
      </div>
      <div>
        <Typography className="title_t2 mb-4">رنگ‌های آیکون</Typography>
        <div className="grid grid-cols-1 gap-6">
          <ColorInput
            label="آیکون فعال"
            color={domain.iconActive}
            fieldName="iconActive"
            description="استفاده در: آیکون‌های فعال، نمادهای منوی انتخاب شده"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="آیکون هاور"
            color={domain.iconHover}
            fieldName="iconHover"
            description="استفاده در: حالت هاور آیکون‌ها"
            onColorChange={onColorChange}
          />
        </div>
      </div>
      <div>
        <Typography className="title_t2 mb-4">رنگ‌های خاکستری</Typography>
        <div className="grid grid-cols-1 gap-6">
          <ColorInput
            label="خاکستری 50"
            color={domain.gray50}
            fieldName="gray50"
            description="استفاده در: پس‌زمینه لغو"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="خاکستری 100"
            color={domain.gray100}
            fieldName="gray100"
            description="استفاده در: پس‌زمینه‌های روشن"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="خاکستری 200"
            color={domain.gray200}
            fieldName="gray200"
            description="استفاده در: حاشیه‌ها، منوی فعال"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="خاکستری 300"
            color={domain.gray300}
            fieldName="gray300"
            description="استفاده در: جداکننده‌ها"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="خاکستری 400"
            color={domain.gray400}
            fieldName="gray400"
            description="استفاده در: متن راهنما، آیکون عادی"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="خاکستری 500"
            color={domain.gray500}
            fieldName="gray500"
            description="استفاده در: متن ثانویه، آیکون هاور"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="خاکستری 700"
            color={domain.gray700}
            fieldName="gray700"
            description="استفاده در: متن‌های تیره"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="خاکستری 800"
            color={domain.gray800}
            fieldName="gray800"
            description="استفاده در: آیکون فعال"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="خاکستری 900"
            color={domain.gray900}
            fieldName="gray900"
            description="استفاده در: متن اصلی"
            onColorChange={onColorChange}
          />
        </div>
      </div>
      <div>
        <Typography className="title_t2 mb-4">رنگ‌های اضافی</Typography>
        <div className="grid grid-cols-1 gap-6">
          <ColorInput
            label="نارنجی 100"
            color={domain.orange100}
            fieldName="orange100"
            description="استفاده در: عناصر نارنجی روشن"
            onColorChange={onColorChange}
          />
          <ColorInput
            label="آبی-سبز"
            color={domain.blueGreen}
            fieldName="blueGreen"
            description="استفاده در: عناصر با رنگ آبی-سبز"
            onColorChange={onColorChange}
          />
        </div>
      </div>
      <div>
        <Typography className="title_t2 mb-4">رنگ‌های حاشیه</Typography>
        <div className="grid grid-cols-1 gap-6">
          <ColorInput
            label="حاشیه معمولی"
            color={domain.borderNormal}
            fieldName="borderNormal"
            description="استفاده در: حاشیه کارت‌ها، جداکننده‌ها، فیلدهای ورودی"
            onColorChange={onColorChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorsSettings;
