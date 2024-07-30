import React from "react";
import { useRecoilValue } from "recoil";
import { repoGrouping } from "@atom/repository";
import { ERepoGrouping } from "@interface/enums";
import RenderIf from "@components/renderIf";
import MyRepoList from "./myRepoList";
import AccessRepoList from "./accessRepoList";
import BookmarkRepoList from "./bookmarkList";
import AllRepoList from "./allRepoList";

const RepoList = () => {
  const getRepoGroup = useRecoilValue(repoGrouping);

  return (
    <>
      <RenderIf isTrue={getRepoGroup === ERepoGrouping.DASHBOARD}>
        <AllRepoList />
      </RenderIf>
      <RenderIf isTrue={getRepoGroup === ERepoGrouping.MY_REPO}>
        <MyRepoList archived={false} />
      </RenderIf>
      <RenderIf isTrue={getRepoGroup === ERepoGrouping.ARCHIVE_REPO}>
        <MyRepoList archived={true} />
      </RenderIf>
      <RenderIf isTrue={getRepoGroup === ERepoGrouping.ACCESS_REPO}>
        <AccessRepoList />
      </RenderIf>
      <RenderIf isTrue={getRepoGroup === ERepoGrouping.BOOKMARK_REPO}>
        <BookmarkRepoList />
      </RenderIf>
    </>
  );
};

export default RepoList;
