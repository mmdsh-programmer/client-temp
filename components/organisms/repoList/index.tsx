import React, { useEffect } from "react";
import { repoAtom, repoGroupingAtom, repoSearchParamAtom } from "@atom/repository";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AccessRepoList from "./accessRepoList";
import BookmarkRepoList from "./bookmarkList";
import { ERepoGrouping } from "@interface/enums";
import HeaderListTemplate from "@components/templates/headerListTemplate";
import MyRepoList from "./myRepoList";
import RenderIf from "@components/atoms/renderIf";
import RepoCreateDialogStepper from "../dialogs/repository/repoCreateDialogStepper";
import PublishedRepoList from "./publishedRepoList";
import RepoMenu from "@components/molecules/repoMenu";
import RepoSearch from "@components/molecules/repoSearch";

const RepoList = () => {
  const setSearchParam = useSetRecoilState(repoSearchParamAtom);
  const getRepoGroup = useRecoilValue(repoGroupingAtom);
  const setRepo = useSetRecoilState(repoAtom);

  useEffect(() => {
    setSearchParam(null);
    setRepo(null);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 xs:gap-6 xs:p-0">
      <HeaderListTemplate
        header="مخزن‌ها"
        buttonText="ایجاد مخزن جدید"
        renderDialog={(close: () => void) => {
          return <RepoCreateDialogStepper close={close} />;
        }}
        renderSearch={<RepoSearch />}
        className="repo-list-header"
      />
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
      <RenderIf isTrue={getRepoGroup === ERepoGrouping.PUBLISHED_REPO}>
        <PublishedRepoList />
      </RenderIf>
      <RepoMenu showDrawer />
    </div>
  );
};

export default RepoList;
