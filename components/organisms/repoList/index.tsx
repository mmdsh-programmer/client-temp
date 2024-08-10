import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { repoAtom, repoGrouping, repoSearchParamAtom } from "@atom/repository";
import { ERepoGrouping } from "@interface/enums";
import RenderIf from "@components/renderIf";
import MyRepoList from "./myRepoList";
import AccessRepoList from "./accessRepoList";
import BookmarkRepoList from "./bookmarkList";
import AllRepoList from "./allRepoList";
import HeaderListTemplate from "@components/templates/headerListTemplate";
import RepoCreateDialogStepper from "../dialogs/repository/repoCreateDialogStepper";

const RepoList = () => {
  const setSearchParam = useSetRecoilState(repoSearchParamAtom);
  const getRepoGroup = useRecoilValue(repoGrouping);
  const setRepo = useSetRecoilState(repoAtom);
  const [openCreateRepo, setOpenCreateRepo] = useState(false);

  useEffect(() => {
    setSearchParam(null);
    setRepo(null);
  }, []);

  return (
    <div className="p-4 xs:p-0 flex flex-col gap-4 xs:gap-6">
      <HeaderListTemplate
        header="مخزن‌ها"
        buttonText="ایجاد مخزن جدید"
        onClick={() => setOpenCreateRepo(true)}
        listModeHide={getRepoGroup === ERepoGrouping.DASHBOARD}
      />
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
      {openCreateRepo && (
        <RepoCreateDialogStepper setOpen={setOpenCreateRepo} />
      )}
    </div>
  );
};

export default RepoList;
