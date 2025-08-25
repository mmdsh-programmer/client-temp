import React from "react";
import {
  FolderArchiveIcon,
  FolderBookmarkIcon,
  FolderShareIcon,
  MyFolderIcon,
} from "@components/atoms/icons";
import { ERepoGrouping } from "@interface/enums";
import { Typography } from "@material-tailwind/react";
import { useRepositoryStore } from "@store/repository";

const RepoTypesMobileView = () => {
  const {
    repoGrouping: getRepoGroup,
    setRepoGrouping: setRepoGroup,
    setRepo,
  } = useRepositoryStore();

  return (
    <div className="repo-types-mobile-view absolute bottom-0 h-16 min-h-16 w-full border-normal bg-primary px-4 xs:hidden">
      <div className="flex h-full items-center justify-between">
        <div
          className={`repo-types-mobile-view__myRepo flex cursor-pointer flex-col items-center ${getRepoGroup === ERepoGrouping.MY_REPO ? "stroke-icon-active text-primary_normal" : "stroke-gray-400 text-gray-400"}`}
          onClick={() => {
            setRepoGroup(ERepoGrouping.MY_REPO);
            setRepo(null);
          }}
        >
          <MyFolderIcon className="h-6 w-6" />
          <Typography className="title_t4">مخزن‌های من</Typography>
        </div>
        <div
          className={`repo-types-mobile-view__bookmarkRepo flex cursor-pointer flex-col items-center ${getRepoGroup === ERepoGrouping.BOOKMARK_REPO ? "stroke-icon-active text-primary_normal" : "stroke-gray-400 text-gray-400"}`}
          onClick={() => {
            setRepoGroup(ERepoGrouping.BOOKMARK_REPO);
            setRepo(null);
          }}
        >
          <FolderBookmarkIcon className="h-6 w-6" />
          <Typography className="title_t4">نشان شده</Typography>
        </div>
        <div
          className={`repo-types-mobile-view__accessRepo flex cursor-pointer flex-col items-center ${getRepoGroup === ERepoGrouping.ACCESS_REPO ? "stroke-icon-active text-primary_normal" : "stroke-gray-400 text-gray-400"}`}
          onClick={() => {
            setRepoGroup(ERepoGrouping.ACCESS_REPO);
            setRepo(null);
          }}
        >
          <FolderShareIcon className="h-6 w-6" />
          <Typography className="title_t4">اشتراکی</Typography>
        </div>
        <div
          className={`repo-types-mobile-view__archiveRepo flex cursor-pointer flex-col items-center ${getRepoGroup === ERepoGrouping.ARCHIVE_REPO ? "stroke-icon-active text-primary_normal" : "stroke-gray-400 text-gray-400"}`}
          onClick={() => {
            setRepoGroup(ERepoGrouping.ARCHIVE_REPO);
            setRepo(null);
          }}
        >
          <FolderArchiveIcon className="h-6 w-6" />
          <Typography className="title_t4">بایگانی شده</Typography>
        </div>
      </div>
    </div>
  );
};

export default RepoTypesMobileView;
