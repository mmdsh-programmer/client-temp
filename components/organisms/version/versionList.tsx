import { EEmptyList } from "@components/molecules/emptyList";
import HeaderListTemplate from "@components/templates/headerListTemplate";
import { IVersionView } from "@interface/version.interface";
import React from "react";
import VersionCreateDialog from "../dialogs/version/versionCreateDialog";
import VersionMobileView from "../versionView/versionMobileView";
import VersionTableView from "@components/organisms/versionView/versionTableView";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import useGetVersionList from "@hooks/version/useGetVersionList";
import { useRecoilValue } from "recoil";

const VersionList = () => {
  const getRepo = useRecoilValue(repoAtom);
  const getSelectedDocument = useRecoilValue(selectedDocumentAtom);

  const {
    data: versionList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetVersionList(getRepo!.id, getSelectedDocument!.id, 30);

  const { data: getLastVersion } = useGetLastVersion(
    getRepo!.id,
    getSelectedDocument!.id,
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
    <div className="p-4 xs:p-0 flex flex-col gap-4 xs:gap-6">
      <HeaderListTemplate
        header="لیست نسخه‌ها"
        buttonText="ایجاد نسخه جدید"
        renderDialog={(close: () => void) => {
          return <VersionCreateDialog close={close} />;
        }}
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
