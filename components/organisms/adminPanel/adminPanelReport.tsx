import {
  DocIcon,
  FolderIcon,
  StorageIcon,
  UserGroupIcon,
} from "@components/atoms/icons";

import React from "react";
import ReportCard from "@components/molecules/reportCard";
import useGetAdminReport from "@hooks/admin/useGetAdminReport";

const AdminPanelReport = () => {
  const { data: getReport } = useGetAdminReport();

  const unUsed =
    getReport?.podSpaceStatus?.storageLimit &&
    getReport?.podSpaceStatus?.storageUsage
      ? getReport.podSpaceStatus.storageLimit -
        getReport.podSpaceStatus.storageUsage
      : 0;

  const reportList = [
    {
      title: "مخزن‌ها",
      icon: <FolderIcon className="w-[18px] h-[18px] stroke-primary-normal " />,
      description: [
        {
          label: "تعداد کل مخزن‌ها",
          value: getReport?.repoCount || 0,
        },
        {
          label: "تعداد کل سوپر مخزن‌ها",
          value: 0,
        },
      ],
    },
    {
      title: "فضاهای ذخیره‌سازی",
      icon: <StorageIcon className="w-[18px] h-[18px] fill-purple-normal" />,
      description: [
        {
          label: "استفاده شده",
          value: `${
            getReport?.podSpaceStatus
              ? (
                  getReport.podSpaceStatus.storageUsage /
                  (1024 * 1024 * 1024)
                ).toFixed(2)
              : 0
          } گیگابایت`,
        },
        {
          label: "مانده",
          value: `${(unUsed / (1024 * 1024 * 1024)).toFixed(2)} گیگابایت`,
        },
        {
          label: "حجم کل",
          value: `${
            getReport?.podSpaceStatus
              ? (
                  getReport.podSpaceStatus.storageLimit /
                  (1024 * 1024 * 1024)
                ).toFixed(2)
              : 0
          } گیگابایت`,
        },
      ],
    },
    {
      title: "تعداد کاربران",
      icon: (
        <UserGroupIcon className="w-[18px] h-[18px] stroke-primary-normal" />
      ),
      description: [
        {
          label: "کاربران فعال",
          value: 0,
        },
        {
          label: "کاربران غیر فعال",
          value: 0,
        },
        {
          label: "مجموع کاربران",
          value: 0,
        },
      ],
    },
    {
      title: "تعداد اسناد",
      icon: <DocIcon className="w-[18px] h-[18px] fill-purple-normal" />,
      description: [
        {
          label: "اسناد عمومی",
          value: 0,
        },
        {
          label: "پیش نویس‌ها",
          value: 0,
        },
        {
          label: "مجموع اسناد",
          value: getReport?.documentCount || 0,
        },
      ],
    },
  ];

  return (
    <div className="!p-4 xs:!p-0 h-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-rows-[min-content] gap-4 flex-wrap">
      {reportList.map((item) => {
        return (
          <ReportCard
            key={item.title}
            title={item.title}
            icon={item.icon}
            description={item.description}
          />
        );
      })}
    </div>
  );
};

export default AdminPanelReport;
