import React, { useEffect } from "react";
import { useRepositoryStore } from "@store/repository";
import { useRepoSearchParamStore } from "@store/repoSearchParam";
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
  const { setRepoSearchParam } = useRepoSearchParamStore();
  const { repoGrouping, setRepo } = useRepositoryStore();

  useEffect(() => {
    setRepoSearchParam(null);
    setRepo(null);
  }, [setRepoSearchParam, setRepo]);

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
      <RenderIf isTrue={repoGrouping === ERepoGrouping.MY_REPO}>
        <MyRepoList archived={false} />
      </RenderIf>
      <RenderIf isTrue={repoGrouping === ERepoGrouping.ARCHIVE_REPO}>
        <MyRepoList archived />
      </RenderIf>
      <RenderIf isTrue={repoGrouping === ERepoGrouping.ACCESS_REPO}>
        <AccessRepoList />
      </RenderIf>
      <RenderIf isTrue={repoGrouping === ERepoGrouping.BOOKMARK_REPO}>
        <BookmarkRepoList />
      </RenderIf>
      <RenderIf isTrue={repoGrouping === ERepoGrouping.PUBLISHED_REPO}>
        <PublishedRepoList />
      </RenderIf>
      <RepoMenu showDrawer />
    </div>
  );
};

export default RepoList;
