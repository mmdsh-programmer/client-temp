import React from "react";

const LandingDocManagementContext = () => {
  return (
    <div className="clasor-attributes__item-content w-full">
      <h3 className="clasor-attributes__item-title">مدیریت اسناد</h3>
      <ul className="mt-5">
        <li>مدیریت دسته‌بندی: امکان ایجاد دسته‌بندی برای اسناد داخل مخزن</li>
        <li>مدیریت اسناد: امکان ساخت و مدیریت اسناد بدون هرگونه محدودیت</li>
        <li>مدیریت نسخه‌ها: امکان نگهداری نسخه‌های متفاوت به ازای هر سند</li>
      </ul>
    </div>
  );
};

export default LandingDocManagementContext;
