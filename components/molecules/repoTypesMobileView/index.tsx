import {
  FolderArchiveIcon,
  FolderBookmarkIcon,
  FolderShareIcon,
  MyFolderIcon,
} from "@components/atoms/icons";

import { ERepoGrouping } from "@interface/enums";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { repoAtom, repoGroupingAtom } from "@atom/repository";
import { useRecoilState, useSetRecoilState } from "recoil";

const RepoTypesMobileView = () => {
  const [getRepoGroup, setRepoGroup] = useRecoilState(repoGroupingAtom);
  const setRepo = useSetRecoilState(repoAtom);

  return (
    <div className="w-full px-4 absolute bottom-0 xs:hidden min-h-16 h-16 bg-primary border-normal">
      <div className="flex justify-between items-center h-full">
        <div
          className={`flex flex-col items-center cursor-pointer ${getRepoGroup === ERepoGrouping.MY_REPO ? "text-primary stroke-icon-active" : "text-gray-400 stroke-gray-400"}`}
          onClick={() => {
            setRepoGroup(ERepoGrouping.MY_REPO);
            setRepo(null);
          }}
        >
          <MyFolderIcon className="h-6 w-6 " />
          <Typography className="title_t4">مخزن‌های من</Typography>
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer ${getRepoGroup === ERepoGrouping.BOOKMARK_REPO ? "text-primary stroke-icon-active" : "text-gray-400 stroke-gray-400"}`}
          onClick={() => {
            setRepoGroup(ERepoGrouping.BOOKMARK_REPO);
            setRepo(null);
          }}
        >
          <FolderBookmarkIcon className="h-6 w-6 " />
          <Typography className="title_t4">نشان شده</Typography>
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer ${getRepoGroup === ERepoGrouping.ACCESS_REPO ? "text-primary stroke-icon-active" : "text-gray-400 stroke-gray-400"}`}
          onClick={() => {
            setRepoGroup(ERepoGrouping.ACCESS_REPO);
            setRepo(null);
          }}
        >
          <FolderShareIcon className="h-6 w-6 " />
          <Typography className="title_t4">اشتراکی</Typography>
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer ${getRepoGroup === ERepoGrouping.ARCHIVE_REPO ? "text-primary stroke-icon-active" : "text-gray-400 stroke-gray-400"}`}
          onClick={() => {
            setRepoGroup(ERepoGrouping.ARCHIVE_REPO);
            setRepo(null);
          }}
        >
          <FolderArchiveIcon className="h-6 w-6 " />
          <Typography className="title_t4">بایگانی شده</Typography>
        </div>
      </div>
    </div>
  );
};

export default RepoTypesMobileView;
