import React from "react";
import { repoGrouping } from "@atom/repository";
import {
  FolderArchiveIcon,
  FolderBookmarkIcon,
  FolderShareIcon,
  MyFolderIcon,
} from "@components/atoms/icons";
import Text from "@components/atoms/typograghy/text";
import { ERepoGrouping } from "@interface/enums";
import { useRecoilState } from "recoil";

const RepoMobileCards = () => {
  const [getRepoGroup, setRepoGroup] = useRecoilState(repoGrouping);

  return (
    <div className="w-full px-4 absolute bottom-0 xs:hidden min-h-16 h-16 bg-primary border-normal">
      <div className="flex justify-between items-center h-full">
        <div
          className={`flex flex-col items-center cursor-pointer ${getRepoGroup === ERepoGrouping.MY_REPO ? "text-primary stroke-icon-active" : "text-gray-400 stroke-gray-400"}`}
          onClick={() => {
            setRepoGroup(ERepoGrouping.MY_REPO);
          }}
        >
          <MyFolderIcon className="h-6 w-6 " />
          <Text className="text-[12px] font-medium leading-[18px]">
            مخزن‌های من
          </Text>
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer ${getRepoGroup === ERepoGrouping.BOOKMARK_REPO ? "text-primary stroke-icon-active" : "text-gray-400 stroke-gray-400"}`}
          onClick={() => {
            setRepoGroup(ERepoGrouping.BOOKMARK_REPO);
          }}
        >
          <FolderBookmarkIcon className="h-6 w-6 " />
          <Text className="text-[12px] font-medium leading-[18px]">
            نشان شده
          </Text>
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer ${getRepoGroup === ERepoGrouping.ACCESS_REPO ? "text-primary stroke-icon-active" : "text-gray-400 stroke-gray-400"}`}
          onClick={() => {
            setRepoGroup(ERepoGrouping.ACCESS_REPO);
          }}
        >
          <FolderShareIcon className="h-6 w-6 " />
          <Text className=" text-[12px] font-medium leading-[18px]">
            اشتراکی
          </Text>
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer ${getRepoGroup === ERepoGrouping.ARCHIVE_REPO ? "text-primary stroke-icon-active" : "text-gray-400 stroke-gray-400"}`}
          onClick={() => {
            setRepoGroup(ERepoGrouping.ARCHIVE_REPO);
          }}
        >
          <FolderArchiveIcon className="h-6 w-6 " />
          <Text className=" text-[12px] font-medium leading-[18px]">
            بایگانی شده
          </Text>
        </div>
      </div>
    </div>
  );
};

export default RepoMobileCards;
