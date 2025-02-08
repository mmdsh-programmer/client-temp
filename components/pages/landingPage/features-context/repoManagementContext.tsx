import React from "react";

const RepoManagementContext = () => {
  return (
    <div className="clasor-attributes__item-content w-full">
      <h3 className="clasor-attributes__item-title">مدیریت مخزن</h3>
      <div className="overal-info">
        <p className="clasor-attributes__item-caption">از تفاوت‌های اصلی کلاسور با محصولات مشابه</p>
        <ul className="clasor-attributes__item-caption">
          <li>امکان مدیریت اسناد، دسته‌بندی‌ها، دسترسی‌ها و … متعلق به یک حوزه</li>
          <li>امکان تگ‌زدن، نشان‌کردن، افزودن عکس و توضیحات و مشاهده تغییرات</li>
          <li>امکان انتشار، حذف کامل و عمومی‌شدن</li>
        </ul>
      </div>
    </div>
  );
};

export default RepoManagementContext;
