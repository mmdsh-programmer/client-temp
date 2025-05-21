import React from "react";
import { Checkbox, Typography } from "@material-tailwind/react";
import { IDomainTheme } from "@interface/domain.interface";

interface AdvancedSettingsProps {
  domain: IDomainTheme;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdvancedSettings = ({ domain, onCheckboxChange }: AdvancedSettingsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        name="useDomainTag"
        checked={domain.useDomainTag}
        readOnly
        disabled
        color="deep-purple"
        crossOrigin=""
        containerProps={{ className: "p-1" }}
        labelProps={{ className: "mr-2" }}
        label={<Typography className="form_label">نمایش مدیریت تگ‌ها</Typography>}
      />
      <Checkbox
        name="accessToCreateRepo"
        checked={domain.accessToCreateRepo}
        onChange={onCheckboxChange}
        color="deep-purple"
        crossOrigin=""
        containerProps={{ className: "p-1" }}
        labelProps={{ className: "mr-2" }}
        label={<Typography className="form_label">دسترسی ایجاد مخزن</Typography>}
      />
      <Checkbox
        name="hasLikes"
        checked={domain.hasLikes}
        onChange={onCheckboxChange}
        color="deep-purple"
        crossOrigin=""
        containerProps={{ className: "p-1" }}
        labelProps={{ className: "mr-2" }}
        label={<Typography className="form_label">قابلیت نمایش لایک / دیسلایک</Typography>}
      />
      <div className="flex flex-col gap-4">
        <Checkbox
          name="hasComments"
          checked={domain.hasComments}
          onChange={onCheckboxChange}
          color="deep-purple"
          crossOrigin=""
          containerProps={{ className: "p-1" }}
          labelProps={{ className: "mr-2" }}
          label={<Typography className="form_label">نمایش قسمت نظرات</Typography>}
        />
        <div className="mr-8">
          <Checkbox
            name="needsAdminApprovalForComments"
            checked={domain.needsAdminApprovalForComments}
            onChange={onCheckboxChange}
            color="deep-purple"
            crossOrigin=""
            containerProps={{ className: "p-1" }}
            labelProps={{ className: "mr-2" }}
            label={<Typography className="form_label">آیا نیاز به تایید ادمین دارد؟</Typography>}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Checkbox
          name="hasQuestions"
          checked={domain.hasQuestions}
          onChange={onCheckboxChange}
          color="deep-purple"
          crossOrigin=""
          containerProps={{ className: "p-1" }}
          labelProps={{ className: "mr-2" }}
          label={<Typography className="form_label">نمایش قسمت سوالات</Typography>}
        />
        <div className="mr-8 flex flex-col gap-4">
          <Checkbox
            name="needsAdminApprovalForQuestions"
            checked={domain.needsAdminApprovalForQuestions}
            onChange={onCheckboxChange}
            color="deep-purple"
            crossOrigin=""
            containerProps={{ className: "p-1" }}
            labelProps={{ className: "mr-2" }}
            label={<Typography className="form_label">آیا نیاز به تایید ادمین دارد؟</Typography>}
          />
          <Checkbox
            name="allowQuestionReplies"
            checked={domain.allowQuestionReplies}
            onChange={onCheckboxChange}
            color="deep-purple"
            crossOrigin=""
            containerProps={{ className: "p-1" }}
            labelProps={{ className: "mr-2" }}
            label={
              <Typography className="form_label">آیا امکان پاسخ به سوال وجود دارد؟</Typography>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;
