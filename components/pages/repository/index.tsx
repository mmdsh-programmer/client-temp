"use client";

import React from "react";
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
import { Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const Repository = () => {
  const router = useRouter();
  const { repo } = useRepositoryStore();
  const getShowVersionList = useVersionStore((state) => {
    return state.versionModalList;
  });
  const getBulkItems = useBulkStore((state) => {
    return state.bulkItems;
  });
  const { editorModal: getEditorModal, setEditorModal } = useEditorStore();

  const { data: userInfo } = useGetUser();

  const handleBackToDahsboard = () => {
    router.push("/admin/dashboard");
  };

  return userInfo?.repository.id === repo?.id ? (
    <div className="flex flex-col gap-4 h-full items-center justify-center">
      <Typography
        className="title_t1 !text-primary_normal"
        {...({} as React.ComponentProps<typeof Typography>)}
      >
        شما به این مخزن دسترسی ندارید.
      </Typography>
      <Button
        {...({} as React.ComponentProps<typeof Button>)}
        className="back-to-dashboard bg-primary-normal hover:bg-primary-normal active:bg-primary-normal h-10"
        onClick={handleBackToDahsboard}
      >
        <Typography
          {...({} as React.ComponentProps<typeof Typography>)}
          className="text__label__button text-white"
        >
          بازگشت به صفحه داشبورد
        </Typography>
      </Button>
    </div>
  ) : (
    <div className="flex flex-col gap-4 xs:gap-6">
      <RepoInfo />
      <CategoryList />
      {getShowVersionList ? <VersionDialogView /> : null}
      {getEditorModal ? (
        <Editor
          setOpen={() => {
            return setEditorModal(false);
          }}
        />
      ) : null}
      {getBulkItems.length ? <CategoryBulk /> : null}
    </div>
  );
};

export default Repository;
