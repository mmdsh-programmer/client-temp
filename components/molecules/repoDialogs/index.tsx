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
import { useSetRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";

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
  const setRepo = useSetRecoilState(repoAtom);

  const handleClose = () => {
    if (window.location.pathname === "/admin/dashboard") {
      setRepo(null);
    }
  };

  return (
    <>
      {modals.edit ? (
        <RepoEditDialog
          setOpen={() => {
            setModalState("edit", false);
            handleClose();
          }}
        />
      ) : null}
      {modals.delete ? (
        <RepoDeleteDialog
          setOpen={() => {
            setModalState("delete", false);
            handleClose();
          }}
        />
      ) : null}
      {modals.archive ? (
        <RepoArchiveDialog
          setOpen={() => {
            setModalState("archive", false);
            handleClose();
          }}
        />
      ) : null}
      {modals.restore ? (
        <RepoRestoreDialog
          setOpen={() => {
            setModalState("restore", false);
            handleClose();
          }}
        />
      ) : null}
      {modals.bookmark ? (
        <RepoBookmarkDialog
          setOpen={() => {
            setModalState("bookmark", false);
            handleClose();
          }}
        />
      ) : null}
      {modals.share ? (
        <RepoShareDialog
          setOpen={() => {
            setModalState("share", false);
            handleClose();
          }}
        />
      ) : null}
      {modals.key ? (
        <RepoKeyDialog
          setOpen={() => {
            setModalState("key", false);
            handleClose();
          }}
        />
      ) : null}
      {modals.leave ? (
        <RepoLeaveDialog
          setOpen={() => {
            setModalState("leave", false);
            handleClose();
          }}
        />
      ) : null}
    </>
  );
};

export default RepoDialogs;
