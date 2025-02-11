import React from "react";

const LandingAccessManagementContext = () => {
  return (
    <div className="clasor-attributes__item-content w-full">
      <h3 className="clasor-attributes__item-title">
        مدیریت پیشرفته دسترسی ها
      </h3>
      <ul className="mt-6">
        <li>
          امکان تعیین نقش و سطوح دسترسی برای کاربران به منظور استفاده از مخزن،
          دسته‌بندی‌ها و اسناد
        </li>
        <li>
          امکان ساخت گروه‌های کاربری و اعمال دسترسی‌ها در اسناد و دسته‌بندی‌ها
        </li>
        <li>
          امکان به‌اشتراک‌گذاری نسخه‌ها با کاربران دیگر از طریق لینک و اکانت
          پادی
        </li>
        <li>امکان ایجاد لینک عمومی برای دسترسی همه کاربران</li>
        <li>امکان ایجاد دسترسی محدود از طریق لینک رمزدار و یا مدت‌دار</li>
        <li>امکان انتقال مالکیت به کاربران دیگر</li>
      </ul>
    </div>
  );
};

export default LandingAccessManagementContext;
