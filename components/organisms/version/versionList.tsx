import React from "react";
import { EEmptyList } from "@components/molecules/emptyList";
import HeaderListTemplate from "@components/templates/headerListTemplate";
import { IVersionView } from "@interface/version.interface";
import VersionCreateDialog from "../dialogs/version/versionCreateDialog";
import VersionMobileView from "../versionView/versionMobileView";
import VersionTableView from "@components/organisms/versionView/versionTableView";
import { selectedDocumentAtom } from "@atom/document";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import useGetVersionList from "@hooks/version/useGetVersionList";
import { useRecoilValue } from "recoil";
import { usePathname, useSearchParams } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";

const VersionList = () => {
  const repoId = useRepoId();
  const getSelectedDocument = useRecoilValue(selectedDocumentAtom);
  const currentPath = usePathname();

  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const {
    data: versionList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetVersionList(
    repoId,
    getSelectedDocument!.id,
    sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
    30
  );

  const { data: getLastVersion } = useGetLastVersion(
    repoId,
    getSelectedDocument!.id,
    sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
    true
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
          if (a.newOne && !b.newOne) {
            return -1;
          }
          if (!a.newOne && b.newOne) {
            return 1;
          }
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
    <div className="version-list p-4 xs:p-0 flex flex-col gap-4 xs:gap-6">
      <HeaderListTemplate
        header="لیست نسخه‌ها"
        buttonText="ایجاد نسخه جدید"
        renderDialog={(close: () => void) => {
          return <VersionCreateDialog close={close} />;
        }}
        className="version-list-header"
      />
      <div className="hidden xs:block h-full min-h-[calc(100vh-200px)] overflow-y-auto">
        <VersionTableView {...commonProps} />
      </div>
      <div className="flex flex-col h-full min-h-[calc(100vh-100px)] xs:hidden gap-y-4 ">
        <VersionMobileView {...commonProps} />
      </div>
    </div>
  );
};

export default VersionList;
