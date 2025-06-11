import Checkbox from "@components/atoms/checkbox";
import { IDomainTheme } from "@interface/domain.interface";
import React from "react";

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
        disabled
        readOnly
        label="نمایش مدیریت تگ‌ها"
      />
      <Checkbox
        name="accessToCreateRepo"
        checked={domain.accessToCreateRepo}
        onChange={onCheckboxChange}
        label="دسترسی ایجاد مخزن"
      />
      <Checkbox
        name="hasLikes"
        checked={domain.hasLikes}
        onChange={onCheckboxChange}
        label="قابلیت نمایش لایک / دیسلایک"
      />
      <div className="flex flex-col gap-4">
        <Checkbox
          name="hasComments"
          checked={domain.hasComments}
          onChange={onCheckboxChange}
          label="نمایش قسمت نظرات"
        />
        <div className="mr-8">
          <Checkbox
            name="needsAdminApprovalForComments"
            checked={domain.needsAdminApprovalForComments}
            onChange={onCheckboxChange}
            label="آیا نیاز به تایید ادمین دارد؟"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Checkbox
          name="hasQuestions"
          checked={domain.hasQuestions}
          onChange={onCheckboxChange}
          label="نمایش قسمت سوالات"
        />
        <div className="mr-8 flex flex-col gap-4">
          <Checkbox
            name="needsAdminApprovalForQuestions"
            checked={domain.needsAdminApprovalForQuestions}
            onChange={onCheckboxChange}
            label="آیا نیاز به تایید ادمین دارد؟"
          />
          <Checkbox
            name="allowQuestionReplies"
            checked={domain.allowQuestionReplies}
            onChange={onCheckboxChange}
            label="آیا امکان پاسخ به سوال وجود دارد؟"
          />
        </div>
        <Checkbox
          name="enablePersonalDocs"
          checked={domain.enablePersonalDocs}
          onChange={onCheckboxChange}
          label="فعال سازی مستندات شخصی"
        />
      </div>
    </div>
  );
};

export default AdvancedSettings;
