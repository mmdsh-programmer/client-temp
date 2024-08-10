import React, { useMemo } from "react";
import { useRecoilState } from "recoil";
import { repoGrouping } from "@atom/repository";
import {
  ArchiveIcon,
  FolderBookmarkIcon,
  FolderShareIcon,
  MyFolderIcon,
} from "@components/atoms/icons";
import RepoTypeCard from "@components/molecules/repoTypeCard";
import { ERepoGrouping } from "@interface/enums";

const RepoTypesCards = () => {
  const [getRepoGroup, setRepoGroup] = useRecoilState(repoGrouping);

  const repoTypeData = useMemo(() => [
    {
      cardTitle: "مخزن‌های من",
      icon: <MyFolderIcon className="h-full w-full stroke-icon-active" />,
      onClick: () => setRepoGroup(ERepoGrouping.MY_REPO),
      repoNumber: 0,
    },
    {
      cardTitle: "مخزن‌های اشتراکی",
      icon: <FolderShareIcon className="h-full w-full stroke-icon-active" />,
      onClick: () => setRepoGroup(ERepoGrouping.ACCESS_REPO),
      repoNumber: 0,
    },
    {
      cardTitle: "مخزن‌های نشان‌شده",
      icon: <FolderBookmarkIcon className="h-full w-full stroke-icon-active" />,
      onClick: () => setRepoGroup(ERepoGrouping.BOOKMARK_REPO),
      repoNumber: 0,
    },
    {
      cardTitle: "مخزن‌های بایگانی‌شده",
      icon: <ArchiveIcon className="h-full w-full stroke-icon-active" />,
      onClick: () => setRepoGroup(ERepoGrouping.ARCHIVE_REPO),
      repoNumber: 0,
    },
  ], [setRepoGroup]);

  return (
    <div className="hidden xs:flex gap-4 flex-wrap min-w-full">
      {repoTypeData.map((item) => (
        <RepoTypeCard
          key={item.cardTitle}
          cardTitle={item.cardTitle}
          icon={item.icon}
          repoNumber={item.repoNumber}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

export default React.memo(RepoTypesCards);
