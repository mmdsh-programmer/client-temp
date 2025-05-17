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
    <div className="flex flex-col gap-5">
      <ColorInput
        label="رنگ اصلی"
        color={domain.mainColor}
        fieldName="mainColor"
        description="استفاده در: دکمه‌های فرم‌ها، چک باکس‌ها، نوار منوی انتخاب شده، عناصر تعاملی"
        onColorChange={onColorChange}
      />

      <div className="mt-5">
        <Typography className="title_t2 mb-4">رنگ‌های پرکاربرد دیگر</Typography>
        <div className="grid grid-cols-1 gap-6">
          <ColorInput
            label="رنگ اصلی روشن"
            color={domain.primaryLight}
            fieldName="primaryLight"
            description="استفاده در: پس‌زمینه عناصر، حالت‌های هاور، بج‌ها"
            onColorChange={onColorChange}
          />

          <ColorInput
            label="رنگ خطا"
            color={domain.error}
            fieldName="error"
            description="استفاده در: پیام‌های خطا، حالت‌های ناموفق، اعلان‌های مهم"
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
            label="رنگ اطلاعات"
            color={domain.info}
            fieldName="info"
            description="استفاده در: پیام‌های اطلاع‌رسانی، راهنما، توضیحات"
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
            label="رنگ آیکون فعال"
            color={domain.iconActive}
            fieldName="iconActive"
            description="استفاده در: آیکون‌های فعال، نماد‌های منوی انتخاب شده"
            onColorChange={onColorChange}
          />

          <ColorInput
            label="رنگ متن اصلی"
            color={domain.textPrimary}
            fieldName="textPrimary"
            description="استفاده در: متن‌های اصلی، عناوین، محتوای مهم"
            onColorChange={onColorChange}
          />

          <ColorInput
            label="رنگ متن ثانویه"
            color={domain.textSecondary}
            fieldName="textSecondary"
            description="استفاده در: توضیحات، زیرمتن‌ها، محتوای کمتر مهم"
            onColorChange={onColorChange}
          />

          <ColorInput
            label="رنگ حاشیه"
            color={domain.borderNormal}
            fieldName="borderNormal"
            description="استفاده در: حاشیه کارت‌ها، جداکننده‌ها، فیلدهای ورودی"
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
    </div>
  );
};

export default ColorsSettings;
