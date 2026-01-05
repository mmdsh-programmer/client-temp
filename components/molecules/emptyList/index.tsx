import { FolderEmptyIcon } from "@components/atoms/icons";
import React from "react";
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
  QUESTION_LIST = "question_list",
  ANSWER_LIST = "answer_list",
  ACCESS_LIST = "access_list",
  FEED_LIST = "feed-list",
  BRANCH_INFO = "branch_info",
  BRANCH_GROUP = "branch_group",
  DOMAIN_PUBLICFEEDS = "domain-public-feeds",
  BRANCH_USERS = "branch_users",
  DOMAIN_USERS = "domain_users",
  FOLLOWING_REPO = "following-repo",
  WHITE_LIST_REQUESTS = "white_list_requests",
  SHARED_DOCUMENTS = "shared_documents",
  ATTACHMENT = "attachment",
  FORM_OUTPUT = "form_output",
  VERSION_HISTORY = "version_history",
  DOMAIN_DOCUMENTS = "domain-documents",
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
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              شما در حال حاضر مخزنی ندارید.
            </Typography>
            <Typography
              placeholder="empty-message"
              className="caption_c1 text-gray-500"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              برای ایجاد مخزن جدید می توانید روی دکمه ایجاد مخزن کلیک کنید و اطلاعات مخزن خود را
              وارد کنید.
            </Typography>
          </div>
        );
      case EEmptyList.BOOKMARK_REPO:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary_normal"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            شما در حال حاضر مخزن نشان شده‌ای ندارید.
          </Typography>
        );
      case EEmptyList.ARCHIVE_REPO:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary_normal"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            شما در حال حاضر مخزن بایگانی شده‌ای ندارید.
          </Typography>
        );
      case EEmptyList.PUBLISHED_REPO:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary_normal"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            شما در حال حاضر مخزن منتشر شده ای ندارید.
          </Typography>
        );
      case EEmptyList.ACCESS_REPO:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary_normal"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            شما در حال حاضر مخزن اشتراکی ندارید.
          </Typography>
        );
      case EEmptyList.CHILDREN:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              شما در حال حاضر دسته‌بندی یا سندی ندارید.
            </Typography>
            <Typography
              placeholder="empty-message"
              className="caption_c1 text-gray-500"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              برای ایجاد دسته‌بندی یا سند جدید می توانید روی دکمه ایجاد کلیک کنید و اطلاعات
              دسته‌بندی یا سند خود را وارد کنید.
            </Typography>
          </div>
        );
      case EEmptyList.SHARED_DOCUMENTS:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              در حال حاضر سندی با شما به اشتراک گذاشته نشده است.
            </Typography>
          </div>
        );
      case EEmptyList.CATEGORY:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              شما در حال حاضر دسته‌بندی ندارید.
            </Typography>
          </div>
        );
      case EEmptyList.RELEASE:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary_normal"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            شما در حال حاضر درخواست فعالی ندارید.
          </Typography>
        );
      case EEmptyList.FILTER:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary_normal"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            نتیجه‌ای یافت نشد.
          </Typography>
        );
      case EEmptyList.REPO_KEYS:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary_normal"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            شما در حال حاضر کلیدی ندارید
          </Typography>
        );
      case EEmptyList.GROUP:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary_normal"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            شما در حال حاضر گروهی ندارید
          </Typography>
        );
      case EEmptyList.TEMPLATE:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary_normal"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            شما در حال حاضر نمونه سندی ندارید
          </Typography>
        );
      case EEmptyList.BLOCKLIST:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary_normal"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            در حال حاضر کاربر مسدود شده‌ای روی این سند وجود ندارد
          </Typography>
        );
      case EEmptyList.DOC_TAGS:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary_normal"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            در حال حاضر تگی روی این سند وجود ندارد
          </Typography>
        );
      case EEmptyList.WHITE_LIST:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary_normal"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            در حال حاضر لیست سفیدی وجود ندارد
          </Typography>
        );
      case EEmptyList.BLACK_LIST:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary_normal"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            در حال حاضر لیست سیاهی وجود ندارد
          </Typography>
        );
      case EEmptyList.JOIN_REPO_REQUESTS:
        return (
          <Typography
            placeholder="empty-message"
            className="title_t3 text-primary_normal"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            شما در حال حاضر درخواست دعوت به مخزنی ندارید.
          </Typography>
        );
      case EEmptyList.FEEDBACK:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
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
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
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
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
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
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
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
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              شما در حال حاضر لیست نظراتی ندارید.
            </Typography>
          </div>
        );
      case EEmptyList.QUESTION_LIST:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              برای این سند سوالی وجود ندارد
            </Typography>
          </div>
        );
      case EEmptyList.ANSWER_LIST:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              برای این سوال، پاسخی وجود ندارد
            </Typography>
          </div>
        );
      case EEmptyList.ACCESS_LIST:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              شما در حال حاضر لیست مجازی ندارید.
            </Typography>
          </div>
        );
      case EEmptyList.FEED_LIST:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              خبرنامه ای برای نمایش وجود ندارد.
            </Typography>
          </div>
        );
      case EEmptyList.BRANCH_INFO:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              <div className="flex flex-col items-center justify-center">
                <Typography
                  placeholder="empty-message"
                  className="title_t3 text-primary_normal"
                  {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
                >
                  شما در حال حاضر شعبه‌ای را انتخاب نکرده‌اید.
                </Typography>
                <Typography
                  placeholder="empty-message"
                  className="caption_c1 text-gray-500"
                  {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
                >
                  برای نمایش اطلاعات شعبه، شعبه موردنظرتان را انتخاب کنید.
                </Typography>
              </div>
            </Typography>
          </div>
        );
      case EEmptyList.BRANCH_GROUP:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              گروهی برای نمایش وجود ندارد.
            </Typography>
          </div>
        );
      case EEmptyList.DOMAIN_PUBLICFEEDS:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              خبرنامه‌ای برای نمایش وجود ندارد
            </Typography>
          </div>
        );
      case EEmptyList.BRANCH_USERS:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              در شعبه موردنظر فردی دارای سمت وجود ندارد.
            </Typography>
          </div>
        );
      case EEmptyList.DOMAIN_USERS:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              در حال حاضر هیچ کاربری به دامنه دسترسی ندارد
            </Typography>
          </div>
        );
      case EEmptyList.FOLLOWING_REPO:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              شما در حال حاضر مخزنی را دنبال نکرده‌اید.
            </Typography>
          </div>
        );
      case EEmptyList.WHITE_LIST_REQUESTS:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              شما در حال حاضر درخواست دسترسی به سند وجود ندارد.
            </Typography>
          </div>
        );
      case EEmptyList.ATTACHMENT:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              فایلی برای این سند وجود ندارد.
            </Typography>
          </div>
        );
      case EEmptyList.FORM_OUTPUT:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              هنوز هیچ پاسخی برای این فرم ثبت نشده است.
            </Typography>
          </div>
        );
      case EEmptyList.VERSION_HISTORY:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              تا این لحظه هیچ ویرایشی برای این نسخه انجام نشده است.
            </Typography>
          </div>
        );
      case EEmptyList.DOMAIN_DOCUMENTS:
        return (
          <div className="flex flex-col items-center justify-center">
            <Typography
              placeholder="empty-message"
              className="title_t3 text-primary_normal"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              سندی در این مخزن وجود ندارد.
            </Typography>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
      <FolderEmptyIcon />
      {content()}
    </div>
  );
};

export default EmptyList;
