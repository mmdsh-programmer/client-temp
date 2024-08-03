import { FolderEmptyIcon } from "@components/atoms/icons";
import { Typography } from "@material-tailwind/react";
import React, { useMemo } from "react";

export enum EEmptyList {
  DASHBOARD = "dashboard",
  MY_REPO = "my_repo",
  ACCESS_REPO = "access_repo",
  BOOKMARK_REPO = "bookmark_repo",
  ARCHIVE_REPO = "archive_repo",
  CATEGORY = "category",
  VERSION = "version",
  RELEASE = "release",
  FILTER = "filter",
}

interface IProps {
  type: EEmptyList;
}

const EmptyList = ({ type }: IProps) => {
  const content = useMemo(() => {
    switch (type) {
      case EEmptyList.DASHBOARD:
      case EEmptyList.MY_REPO:
        return (
          <>
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary"
            >
              شما در حال حاضر مخزنی ندارید.
            </Typography>
            <Typography
              placeholder="empty-message"
              className="text-secondary caption_c1"
            >
              برای ایجاد مخزن جدید می توانید روی دکمه ایجاد مخزن کلیک کنید و
              اطلاعات مخزن خود را وارد کنید.
            </Typography>
          </>
        );
      case EEmptyList.BOOKMARK_REPO:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary"
          >
            شما در حال حاضر مخزن نشان شده‌ای ندارید.
          </Typography>
        );
      case EEmptyList.ARCHIVE_REPO:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary"
          >
            شما در حال حاضر مخزن بایگانی شده‌ای ندارید.
          </Typography>
        );
      case EEmptyList.ACCESS_REPO:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary"
          >
            شما در حال حاضر مخزن اشتراکی ندارید.
          </Typography>
        );
      case EEmptyList.CATEGORY:
        return (
          <>
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary"
            >
              شما در حال حاضر دسته‌بندی یا سندی ندارید.
            </Typography>
            <Typography
              placeholder="empty-message"
              className="text-secondary caption_c1"
            >
              برای ایجاد دسته‌بندی یا سند جدید می توانید روی دکمه ایجاد کلیک
              کنید و اطلاعات دسته‌بندی یا سند خود را وارد کنید.
            </Typography>
          </>
        );
      case EEmptyList.RELEASE:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary"
          >
            شما در حال حاضر درخواست فعالی ندارید.
          </Typography>
        );
      case EEmptyList.FILTER:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary"
          >
            نتیجه‌ای یافت نشد.
          </Typography>
        );
      default:
        return null;
    }
  }, [type]);

  return (
    <div className="flex flex-col h-full mx-auto justify-center items-center gap-3">
      <FolderEmptyIcon className="h-16 w-16 stroke-gray-300" />
      <div className="flex flex-col gap-1">{content}</div>
    </div>
  );
};

export default React.memo(EmptyList);
