"use client";

import React, { useMemo } from "react";
import {
  ArchiveCardIcon,
  BookmarkRepoIcon,
  FolderShareIcon,
  MyFolderIcon,
} from "@components/atoms/icons";
import { ERepoGrouping } from "@interface/enums";
import RepoTypeCard from "@components/molecules/repoTypeCard";
import { repoGroupingAtom } from "@atom/repository";
import useGetMyInfo from "@hooks/useGetMyInfo";
import { useSetRecoilState } from "recoil";

const RepoTypesCards = () => {
  const setRepoGroup = useSetRecoilState(repoGroupingAtom);

  const { data: getMyInfo } = useGetMyInfo();

  const repoTypeData = useMemo(() => {
    return [
      {
        cardTitle: "مخزن‌های من",
        icon: <MyFolderIcon className="h-full w-full stroke-icon-active" />,
        onClick: () => {
          return setRepoGroup(ERepoGrouping.MY_REPO);
        },
        repoNumber: getMyInfo?.owner || 0,
      },
      {
        cardTitle: "مخزن‌های اشتراکی",
        icon: <FolderShareIcon className="h-full w-full fill-icon-active" />,
        onClick: () => {
          return setRepoGroup(ERepoGrouping.ACCESS_REPO);
        },
        repoNumber: getMyInfo?.access || 0,
      },
      {
        cardTitle: "مخزن‌های نشان‌شده",
        icon: (
          <BookmarkRepoIcon className="h-full w-full fill-icon-active" />
        ),
        onClick: () => {
          return setRepoGroup(ERepoGrouping.BOOKMARK_REPO);
        },
        repoNumber: getMyInfo?.bookmark || 0,
      },
      {
        cardTitle: "مخزن‌های بایگانی‌شده",
        icon: <ArchiveCardIcon className="h-full w-full fill-icon-active" />,
        onClick: () => {
          return setRepoGroup(ERepoGrouping.ARCHIVE_REPO);
        },
        repoNumber: getMyInfo?.archived || 0,
      },
    ];
  }, [getMyInfo]);

  
  return (
    <div className="hidden xs:flex gap-4 flex-wrap min-w-full">
      {repoTypeData.map((item) => {
        return (
          <RepoTypeCard
            key={item.cardTitle}
            cardTitle={item.cardTitle}
            icon={item.icon}
            repoNumber={item.repoNumber}
            onClick={item.onClick}
          />
        );
      })}
    </div>
  );
};

export default React.memo(RepoTypesCards);
