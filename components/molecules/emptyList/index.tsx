import React from "react";
import { FolderEmptyIcon } from "@components/atoms/icons";
import { Typography } from "@material-tailwind/react";

export enum EEmptyList {
  DASHBOARD = "dashboard",
  MY_REPO = "my_repo",
  ACCESS_REPO = "access_repo",
  BOOKMARK_REPO = "bookmark_repo",
  ARCHIVE_REPO = "archive_repo",
  PUBLISHED_REPO = "published_repo",
  CHILDREN = "children",
  CATEGORY = "category",
  VERSION = "version",
  RELEASE = "release",
  FILTER = "filter",
  REPO_KEYS = "repo_keys",
  GROUP = "group",
  TEMPLATE = "template",
  BLOCKLIST = "blocklist",
  DOC_TAGS = "doc_tags",
  WHITE_LIST = "white_list",
  BLACK_LIST = "black_list",
  JOIN_REPO_REQUESTS = "join_repo_requests",
  FEEDBACK = "feedback",
  DRAFT_REQUESTS = "draft_requests",
  VERSION_REQUESTS = "version_requests",
  COMMENTS = "comments",
}

interface IProps {
  type: EEmptyList;
}

const EmptyList = ({ type }: IProps) => {
  const content = () => {
    switch (type) {
      case EEmptyList.DASHBOARD:
      case EEmptyList.MY_REPO:
        return (
          <div className="flex flex-col items-center justify-center">
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
          </div>
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
      case EEmptyList.PUBLISHED_REPO:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary"
          >
            شما در حال حاضر مخزن منتشر شده ای ندارید.
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
      case EEmptyList.CHILDREN:
        return (
          <div className="flex flex-col items-center justify-center">
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
          </div>
        );
      case EEmptyList.CATEGORY:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary"
            >
              شما در حال حاضر دسته‌بندی ندارید.
            </Typography>
          </div>
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
      case EEmptyList.REPO_KEYS:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary"
          >
            شما در حال حاضر کلیدی ندارید
          </Typography>
        );
      case EEmptyList.GROUP:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary"
          >
            شما در حال حاضر گروهی ندارید
          </Typography>
        );
      case EEmptyList.TEMPLATE:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary"
          >
            شما در حال حاضر نمونه سندی ندارید
          </Typography>
        );
      case EEmptyList.BLOCKLIST:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary"
          >
            در حال حاضر کاربر مسدود شده‌ای روی این سند وجود ندارد
          </Typography>
        );
      case EEmptyList.DOC_TAGS:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary"
          >
            در حال حاضر تگی روی این سند وجود ندارد
          </Typography>
        );
      case EEmptyList.WHITE_LIST:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary"
          >
            در حال حاضر لیست سفیدی وجود ندارد
          </Typography>
        );
      case EEmptyList.BLACK_LIST:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary"
          >
            در حال حاضر لیست سیاهی وجود ندارد
          </Typography>
        );
      case EEmptyList.JOIN_REPO_REQUESTS:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary"
          >
            شما در حال حاضر درخواست دعوت به مخزنی ندارید.
          </Typography>
        );
      case EEmptyList.FEEDBACK:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary"
            >
              شما در حال حاضر لیست بازخوردی ندارید.
            </Typography>
          </div>
        );
      case EEmptyList.VERSION:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary"
            >
              شما در حال حاضر نسخه‌ای ندارید.
            </Typography>
          </div>
        );
      case EEmptyList.DRAFT_REQUESTS:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary"
            >
              شما در حال حاضر لیست درخواستی ندارید.
            </Typography>
          </div>
        );
      case EEmptyList.VERSION_REQUESTS:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary"
            >
              شما در حال حاضر لیست درخواستی ندارید.
            </Typography>
          </div>
        );
      case EEmptyList.COMMENTS:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary"
            >
              شما در حال حاضر لیست نظراتی ندارید.
            </Typography>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full mx-auto justify-center items-center gap-3 px-4 text-center">
      <FolderEmptyIcon />
      {content()}
    </div>
  );
};

export default EmptyList;
