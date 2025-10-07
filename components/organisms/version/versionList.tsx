import React from "react";
import { EEmptyList } from "@components/molecules/emptyList";
import HeaderListTemplate from "@components/templates/headerListTemplate";
import { IVersionView } from "@interface/version.interface";
import VersionCreateDialog from "../dialogs/version/versionCreateDialog";
import VersionMobileView from "../versionView/versionMobileView";
import VersionTableView from "@components/organisms/versionView/versionTableView";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import useGetVersionList from "@hooks/version/useGetVersionList";
import { usePathname, useSearchParams } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";
import useGetUser from "@hooks/auth/useGetUser";
import { useDocumentStore } from "@store/document";

const VersionList = () => {
  const repoId = useRepoId();
  const { selectedDocument: getSelectedDocument } = useDocumentStore();
  const currentPath = usePathname();

  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();

  const {
    data: versionList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetVersionList(
    repoId!,
    getSelectedDocument!.id,
    sharedDocuments === "true" ||
      currentPath === "/admin/sharedDocuments" ||
      (currentPath === "/admin/dashboard" &&
        getSelectedDocument?.repoId !== userInfo?.repository.id),
    30,
  );

  const { data: getLastVersion } = useGetLastVersion(
    repoId!,
    getSelectedDocument!.id,
    sharedDocuments === "true" ||
      currentPath === "/admin/sharedDocuments" ||
      (currentPath === "/admin/dashboard" &&
        getSelectedDocument?.repoId !== userInfo?.repository.id),
    !!repoId,
  );

  const order = [
    "accpted",
    "public",
    "private",
    "pending",
    "waitForDirectPublic",
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
    <div className="version-list flex flex-col gap-4 p-4 xs:gap-6 xs:p-0">
      <HeaderListTemplate
        header="لیست نسخه‌ها"
        buttonText="ایجاد نسخه جدید"
        renderDialog={(close: () => void) => {
          return <VersionCreateDialog close={close} />;
        }}
        className="version-list-header"
        disabled={!!sortedVersion?.[0].length}
      />
      <div className="hidden h-full min-h-[calc(100vh-200px)] overflow-y-auto xs:block">
        <VersionTableView {...commonProps} />
      </div>
      <div className="flex h-full min-h-[calc(100vh-100px)] flex-col gap-y-4 xs:hidden">
        <VersionMobileView {...commonProps} />
      </div>
    </div>
  );
};

export default VersionList;
