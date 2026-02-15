import React from "react";
import { FolderEmptyIcon } from "@components/atoms/icons";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

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
  ATTACHMENT_FILES = "attachment_files",
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
            <EmptyTitle className="title_t3 text-primary_normal">
              شما در حال حاضر مخزنی ندارید.
            </EmptyTitle>
            <EmptyDescription className="caption_c1 text-gray-500">
              برای ایجاد مخزن جدید می توانید روی دکمه ایجاد مخزن کلیک کنید و اطلاعات مخزن خود را
              وارد کنید.
            </EmptyDescription>
          </div>
        );
      case EEmptyList.BOOKMARK_REPO:
        return (
          <EmptyTitle className="title_t3 text-primary_normal">
            شما در حال حاضر مخزن نشان شده‌ای ندارید.
          </EmptyTitle>
        );
      case EEmptyList.ARCHIVE_REPO:
        return (
          <EmptyTitle className="title_t3 text-primary_normal">
            شما در حال حاضر مخزن بایگانی شده‌ای ندارید.
          </EmptyTitle>
        );
      case EEmptyList.PUBLISHED_REPO:
        return (
          <EmptyTitle className="title_t3 text-primary_normal">
            شما در حال حاضر مخزن منتشر شده ای ندارید.
          </EmptyTitle>
        );
      case EEmptyList.ACCESS_REPO:
        return (
          <EmptyTitle className="title_t3 text-primary_normal">
            شما در حال حاضر مخزن اشتراکی ندارید.
          </EmptyTitle>
        );
      case EEmptyList.CHILDREN:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              شما در حال حاضر دسته‌بندی یا سندی ندارید.
            </EmptyTitle>
            <EmptyDescription className="caption_c1 text-gray-500">
              برای ایجاد دسته‌بندی یا سند جدید می توانید روی دکمه ایجاد کلیک کنید و اطلاعات
              دسته‌بندی یا سند خود را وارد کنید.
            </EmptyDescription>
          </div>
        );
      case EEmptyList.SHARED_DOCUMENTS:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              در حال حاضر سندی با شما به اشتراک گذاشته نشده است.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.CATEGORY:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              شما در حال حاضر دسته‌بندی ندارید.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.RELEASE:
        return (
          <EmptyTitle className="title_t3 text-primary_normal">
            شما در حال حاضر درخواست فعالی ندارید.
          </EmptyTitle>
        );
      case EEmptyList.FILTER:
        return (
          <EmptyTitle className="title_t3 text-primary_normal">
            نتیجه‌ای یافت نشد.
          </EmptyTitle>
        );
      case EEmptyList.REPO_KEYS:
        return (
          <EmptyTitle className="title_t3 text-primary_normal">
            شما در حال حاضر کلیدی ندارید
          </EmptyTitle>
        );
      case EEmptyList.GROUP:
        return (
          <EmptyTitle className="title_t3 text-primary_normal">
            شما در حال حاضر گروهی ندارید
          </EmptyTitle>
        );
      case EEmptyList.TEMPLATE:
        return (
          <EmptyTitle className="title_t3 text-primary_normal">
            شما در حال حاضر نمونه سندی ندارید
          </EmptyTitle>
        );
      case EEmptyList.BLOCKLIST:
        return (
          <EmptyTitle className="title_t3 text-primary_normal">
            در حال حاضر کاربر مسدود شده‌ای روی این سند وجود ندارد
          </EmptyTitle>
        );
      case EEmptyList.DOC_TAGS:
        return (
          <EmptyTitle className="title_t3 text-primary_normal">
            در حال حاضر تگی روی این سند وجود ندارد
          </EmptyTitle>
        );
      case EEmptyList.WHITE_LIST:
        return (
          <EmptyTitle className="title_t3 text-primary_normal">
            در حال حاضر لیست سفیدی وجود ندارد
          </EmptyTitle>
        );
      case EEmptyList.BLACK_LIST:
        return (
          <EmptyTitle className="title_t3 text-primary_normal">
            در حال حاضر لیست سیاهی وجود ندارد
          </EmptyTitle>
        );
      case EEmptyList.JOIN_REPO_REQUESTS:
        return (
          <EmptyTitle className="title_t3 text-primary_normal">
            شما در حال حاضر درخواست دعوت به مخزنی ندارید.
          </EmptyTitle>
        );
      case EEmptyList.FEEDBACK:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              شما در حال حاضر لیست بازخوردی ندارید.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.VERSION:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              شما در حال حاضر نسخه‌ای ندارید.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.DRAFT_REQUESTS:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              شما در حال حاضر لیست درخواستی ندارید.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.VERSION_REQUESTS:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              شما در حال حاضر لیست درخواستی ندارید.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.COMMENTS:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              شما در حال حاضر لیست نظراتی ندارید.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.QUESTION_LIST:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              برای این سند سوالی وجود ندارد
            </EmptyTitle>
          </div>
        );
      case EEmptyList.ANSWER_LIST:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              برای این سوال، پاسخی وجود ندارد
            </EmptyTitle>
          </div>
        );
      case EEmptyList.ACCESS_LIST:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              شما در حال حاضر لیست مجازی ندارید.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.FEED_LIST:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              خبرنامه ای برای نمایش وجود ندارد.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.BRANCH_INFO:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              شما در حال حاضر شعبه‌ای را انتخاب نکرده‌اید.
            </EmptyTitle>
            <EmptyDescription className="caption_c1 text-gray-500">
              برای نمایش اطلاعات شعبه، شعبه موردنظرتان را انتخاب کنید.
            </EmptyDescription>
          </div>
        );
      case EEmptyList.BRANCH_GROUP:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              گروهی برای نمایش وجود ندارد.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.DOMAIN_PUBLICFEEDS:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              خبرنامه‌ای برای نمایش وجود ندارد
            </EmptyTitle>
          </div>
        );
      case EEmptyList.BRANCH_USERS:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              در شعبه موردنظر فردی دارای سمت وجود ندارد.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.DOMAIN_USERS:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              در حال حاضر هیچ کاربری به دامنه دسترسی ندارد
            </EmptyTitle>
          </div>
        );
      case EEmptyList.FOLLOWING_REPO:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              شما در حال حاضر مخزنی را دنبال نکرده‌اید.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.WHITE_LIST_REQUESTS:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              شما در حال حاضر درخواست دسترسی به سند وجود ندارد.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.ATTACHMENT:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              فایلی برای این سند وجود ندارد.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.FORM_OUTPUT:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              هنوز هیچ پاسخی برای این فرم ثبت نشده است.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.VERSION_HISTORY:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              تا این لحظه هیچ ویرایشی برای این نسخه انجام نشده است.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.DOMAIN_DOCUMENTS:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              سندی در این مخزن وجود ندارد.
            </EmptyTitle>
          </div>
        );
      case EEmptyList.ATTACHMENT_FILES:
        return (
          <div className="flex flex-col items-center justify-center">
            <EmptyTitle className="title_t3 text-primary_normal">
              فایل ضمیمه‌ای در این سند وجود ندارد.
            </EmptyTitle>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Empty className="mx-auto h-full gap-3 px-4 text-center">
      <EmptyHeader>
        <EmptyMedia variant="default">
          <FolderEmptyIcon />
        </EmptyMedia>
        {content()}
      </EmptyHeader>
    </Empty>
  );
};

export default EmptyList;
