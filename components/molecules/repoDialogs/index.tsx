import React from "react";
import RepoArchiveDialog from "@components/organisms/dialogs/repository/repoArchiveDialog";
import RepoBookmarkDialog from "@components/organisms/dialogs/repository/repoBookmarkDialog";
import RepoDeleteDialog from "@components/organisms/dialogs/repository/repoDeleteDialog";
import RepoEditDialog from "@components/organisms/dialogs/repository/repoEditDialog";
import RepoKeyDialog from "@components/organisms/dialogs/repository/repoKey";
import RepoRestoreDialog from "@components/organisms/dialogs/repository/repoRestoreDialog";
import RepoShareDialog from "@components/organisms/dialogs/repository/repoShareDialog";
import RepoLeaveDialog from "@components/organisms/dialogs/repository/repoLeaveDialog";
import { IRepo } from "@interface/repo.interface";

interface IRepoDialogsProps {
  modals: {
    edit: boolean;
    delete: boolean;
    archive: boolean;
    restore: boolean;
    bookmark: boolean;
    share: boolean;
    key: boolean;
    leave: boolean;
  };
  setModalState: (
    key: keyof IRepoDialogsProps["modals"],
    state: boolean
  ) => void;
  repo?: IRepo;
}

const RepoDialogs = ({ modals, setModalState, repo }: IRepoDialogsProps) => {
  return (
    <>
      {modals.edit ? (
        <RepoEditDialog
          repo={repo}
          setOpen={() => {
            return setModalState("edit", false);
          }}
        />
      ): null}
      {modals.delete ? (
        <RepoDeleteDialog
          repo={repo}
          setOpen={() => {
            return setModalState("delete", false);
          }}
        />
      ): null}
      {modals.archive ? (
        <RepoArchiveDialog
          repo={repo}
          setOpen={() => {
            return setModalState("archive", false);
          }}
        />
      ): null}
      {modals.restore ? (
        <RepoRestoreDialog
          repo={repo}
          setOpen={() => {
            return setModalState("restore", false);
          }}
        />
      ): null}
      {modals.bookmark ? (
        <RepoBookmarkDialog
          repo={repo}
          setOpen={() => {
            return setModalState("bookmark", false);
          }}
        />
      ): null}
      {modals.share ? (
        <RepoShareDialog
          repo={repo}
          setOpen={() => {
            return setModalState("share", false);
          }}
        />
      ): null}
      {modals.key ? (
        <RepoKeyDialog
          repo={repo}
          setOpen={() => {
            return setModalState("key", false);
          }}
        />
      ): null}
      {modals.leave ? (
        <RepoLeaveDialog
          repo={repo}
          setOpen={() => {
            return setModalState("leave", false);
          }}
        />
      ): null}
    </>
  );
};

export default RepoDialogs;
