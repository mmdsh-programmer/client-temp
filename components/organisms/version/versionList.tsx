import React, { useState } from "react";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import { selectedDocumentAtom } from "@atom/document";
import { IVersionMetadata } from "@interface/document.interface";
import { EEmptyList } from "@components/molecules/emptyList";
import VersionTableView from "@components/organisms/versionView/versionTableView";
import VersionMobileView from "@components/organisms/versionView/versionMobileView";
import HeaderListTemplate from "@components/templates/headerListTemplate";
import VersionCreateDialog from "@components/organisms/dialogs/version/versionCreateDialog";
import useGetVersionList from "@hooks/version/useGetVersionList";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { IVersion } from "@interface/version.interface";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import VersionMenu from "@components/molecules/versionMenu";

export interface IVersionView {
  isLoading: boolean;
  getVersionList?: IVersion[][];
  hasNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<IVersionMetadata | undefined, unknown>,
      Error
    >
  >;
  isFetchingNextPage: boolean;
  lastVersion?: IVersion,
  type: EEmptyList;
}

const VersionList = () => {
  const getRepo = useRecoilValue(repoAtom);
  const getSelectedDocument = useRecoilValue(selectedDocumentAtom);

  const [openCreateVersion, setOpenCreateVersion] = useState(false);

  const {
    data: versionList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetVersionList(getRepo!.id, getSelectedDocument!.id, 10);

  const { data: getLastVersion } = useGetLastVersion(
    getRepo!.id,
    getSelectedDocument!.id
  );

  const order = [
    "accpted",
    "public",
    "private",
    "pending",
    "rejected",
    "editing",
  ];

  const sortedVersion = versionList?.pages.map((page) => {
    return page
      ? [...page.list].sort((a, b) => {
          if (a.id === b.id) {
            return order.indexOf(a.status) - order.indexOf(b.status);
          }
          return a.id - b.id;
        })
      : [];
  });

  const commonProps: IVersionView = {
    isLoading,
    getVersionList: sortedVersion,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    lastVersion: getLastVersion,
    type: EEmptyList.VERSION,
  };

  return (
    <div className="p-4 xs:p-0 flex flex-col gap-4 xs:gap-6">
      <HeaderListTemplate
        header="لیست نسخه‌ها"
        buttonText="ایجاد نسخه جدید"
        onClick={() => setOpenCreateVersion(true)}
      />
      <div className="hidden xs:block">
        <VersionTableView {...commonProps} />
      </div>
      <div className="flex flex-col h-full min-h-[calc(100vh-100px)] xs:hidden gap-y-4 ">
        <VersionMobileView {...commonProps} />
      </div>
      {openCreateVersion ? (
        <VersionCreateDialog setOpen={setOpenCreateVersion} />
      ): null}
    </div>
  );
};

export default VersionList;
