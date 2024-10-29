import React from "react";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import { selectedDocumentAtom } from "@atom/document";
import { EEmptyList } from "@components/molecules/emptyList";
import VersionTableView from "@components/organisms/versionView/versionTableView";
import HeaderListTemplate from "@components/templates/headerListTemplate";
import useGetVersionList from "@hooks/version/useGetVersionList";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import { IVersionView } from "@interface/version.interface";
import VersionMobileView from "../versionView/versionMobileView";
import VersionCreateDialog from "../dialogs/version/versionCreateDialog";
import { selectedVersionAtom, versionDrawerAtom } from "@atom/version";
import VersionMenu from "@components/molecules/versionMenu";

const VersionList = () => {
  const getRepo = useRecoilValue(repoAtom);
  const getSelectedDocument = useRecoilValue(selectedDocumentAtom);
  const openVersionActionDrawer = useRecoilValue(versionDrawerAtom);
  const getSelectedVersion = useRecoilValue(selectedVersionAtom);

  const {
    data: versionList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetVersionList(getRepo!.id, getSelectedDocument!.id, 10);

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
      <div className="hidden xs:block">
        <VersionTableView {...commonProps} />
      </div>
      <div className="flex flex-col h-full min-h-[calc(100vh-100px)] xs:hidden gap-y-4 ">
        <VersionMobileView {...commonProps} />
      </div>

    </div>
  );
};

export default VersionList;
