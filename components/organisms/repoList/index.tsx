import React, { useEffect } from "react";
import {
  repoAtom,
  repoGroupingAtom,
  repoSearchParamAtom,
} from "@atom/repository";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AccessRepoList from "./accessRepoList";
import AllRepoList from "./allRepoList";
import BookmarkRepoList from "./bookmarkList";
import MyRepoList from "./myRepoList";
import { ERepoGrouping } from "@interface/enums";
import HeaderListTemplate from "@components/templates/headerListTemplate";
import ListMode from "@components/molecules/listMode";
import RenderIf from "@components/atoms/renderIf";
import RepoCreateDialogStepper from "../dialogs/repository/repoCreateDialogStepper";
import RepoMenu from "@components/molecules/repoMenu";

const RepoList = () => {
  const setSearchParam = useSetRecoilState(repoSearchParamAtom);
  const getRepoGroup = useRecoilValue(repoGroupingAtom);
  const setRepo = useSetRecoilState(repoAtom);

  useEffect(() => {
    setSearchParam(null);
    setRepo(null);
  }, []);

  return (
    <div className="p-4 xs:p-0 flex flex-col gap-4 xs:gap-6">
      <HeaderListTemplate
        header="مخزن‌ها"
        buttonText="ایجاد مخزن جدید"
        renderList={() => {
          return (
            <RenderIf isTrue={getRepoGroup !== ERepoGrouping.DASHBOARD}>
              <ListMode />
            </RenderIf>
          );
        }}
        renderDialog={(close: () => void) => {
          return <RepoCreateDialogStepper close={close} />;
        }}
      />
      <RenderIf isTrue={getRepoGroup === ERepoGrouping.DASHBOARD}>
        <AllRepoList />
      </RenderIf>
      <RenderIf isTrue={getRepoGroup === ERepoGrouping.MY_REPO}>
        <MyRepoList archived={false} />
      </RenderIf>
      <RenderIf isTrue={getRepoGroup === ERepoGrouping.ARCHIVE_REPO}>
        <MyRepoList archived />
      </RenderIf>
      <RenderIf isTrue={getRepoGroup === ERepoGrouping.ACCESS_REPO}>
        <AccessRepoList />
      </RenderIf>
      <RenderIf isTrue={getRepoGroup === ERepoGrouping.BOOKMARK_REPO}>
        <BookmarkRepoList />
      </RenderIf>
      <RepoMenu showDrawer />
    </div>
  );
};

export default RepoList;
