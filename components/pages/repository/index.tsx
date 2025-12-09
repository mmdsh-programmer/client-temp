"use client";

import React, { useEffect, useState } from "react";
import CategoryBulk from "@components/molecules/categoryBulk";
import RepoInfo from "@components/organisms/repoInfo";
import CategoryList from "@components/organisms/category";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";
import Editor from "@components/organisms/dialogs/editor";
import { useVersionStore } from "@store/version";
import { useBulkStore } from "@store/bulk";
import { useEditorStore } from "@store/editor";
import useGetUser from "@hooks/auth/useGetUser";
import { useRepositoryStore } from "@store/repository";
import { useRouter } from "next/navigation";

const Repository = () => {
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { repo } = useRepositoryStore();
  const getShowVersionList = useVersionStore((state) => {
    return state.versionModalList;
  });
  const getBulkItems = useBulkStore((state) => {
    return state.bulkItems;
  });
  const { editorModal: getEditorModal, setEditorModal } = useEditorStore();

  const { data: userInfo } = useGetUser();

  useEffect(() => {
    if (userInfo?.repository.id === repo?.id) {
      setShouldRedirect(true);
      router.push("/admin/myDocuments");
    }
  }, [userInfo, repo]);

  if (shouldRedirect) return null;

  return (
    <div className="flex flex-col gap-4 xs:gap-6">
      <RepoInfo />
      <CategoryList />
      {getShowVersionList ? <VersionDialogView /> : null}
      {getEditorModal ? (
        <Editor
          setOpen={() => {
            window.metrics?.track("close-editor-dialog");
            setEditorModal(false);
          }}
        />
      ) : null}
      {getBulkItems.length ? <CategoryBulk /> : null}
    </div>
  );
};

export default Repository;
