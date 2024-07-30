import { FolderEmptyIcon } from "@components/atoms/icons";
import { Typography } from "@material-tailwind/react";
import React from "react";

export enum EEmptyList {
  DASHBOARD = "dashboard",
  MY_REPO = "my_repo",
  ACCESS_REPO = "access_repo",
  BOOKMARK_REPO = "bookmark_repo",
  ARCHIVE_REPO = "archive_repo",
  CATEGORY = "category",
  VERSION = "version",
  RELEASE = "release",
  REPO_KEYS = "repo_keys",
}

interface IProps {
  type: EEmptyList;
}

const EmptyList = ({ type }: IProps) => {
  return (
    <div className="flex flex-col h-full mx-auto justify-center items-center p-4">
      <FolderEmptyIcon className="h-16 w-16 stroke-gray-300" />
      {type === EEmptyList.MY_REPO ||
        (type === EEmptyList.DASHBOARD && (
          <>
            <Typography
              placeholder=""
              className="text-primary text-base font-iranYekan"
            >
              شما در حال حاضر مخزنی ندارید.
            </Typography>
            <Typography
              placeholder=""
              className="text-sm text-secondary text-center mt-1 max-w-[300px] font-iranYekan"
            >
              برای ایجاد مخزن جدید می توانید روی دکمه ایجاد مخزن کلیک کنید و
              اطلاعات مخزن خود را وارد کنید.
            </Typography>
          </>
        ))}
      {type === EEmptyList.BOOKMARK_REPO && (
        <Typography
          placeholder=""
          className="text-primary text-base font-iranYekan"
        >
          شما در حال حاضر مخزن نشان شده‌ای ندارید.
        </Typography>
      )}
      {type === EEmptyList.ARCHIVE_REPO && (
        <Typography
          placeholder=""
          className="text-primary text-base font-iranYekan"
        >
          شما در حال حاضر مخزن بایگانی شده‌ای ندارید.
        </Typography>
      )}
      {type === EEmptyList.ACCESS_REPO && (
        <Typography
          placeholder=""
          className="text-primary text-base font-iranYekan"
        >
          شما در حال حاضر مخزن اشتراکی ندارید.
        </Typography>
      )}
      {type === EEmptyList.CATEGORY && (
        <>
          <Typography
            placeholder=""
            className="text-primary text-base font-iranYekan"
          >
            شما در حال حاضر دسته‌بندی یا سندی ندارید.
          </Typography>
          <Typography
            placeholder=""
            className="text-sm text-secondary text-center mt-1 max-w-[300px] font-iranYekan"
          >
            برای ایجاد دسته‌بندی یا سند جدید می توانید روی دکمه ایجاد کلیک کنید
            و اطلاعات دسته‌بندی یا سند خود را وارد کنید.
          </Typography>
        </>
      )}
      {type === EEmptyList.RELEASE && (
        <Typography
          placeholder=""
          className="text-primary text-base font-iranYekan"
        >
          شما در حال حاضر درخواست فعالی ندارید.
        </Typography>
      )}

      {type === EEmptyList.REPO_KEYS && (
        <Typography
          placeholder=""
          className="text-primary text-base font-iranYekan"
        >
          شما در حال حاضر کلیدی ندارید
        </Typography>
      )}
    </div>
  );
};

export default EmptyList;
