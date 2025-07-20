import React from "react";
import RepoArchiveDialog from "@components/organisms/dialogs/repository/repoArchiveDialog";
import RepoBookmarkDialog from "@components/organisms/dialogs/repository/repoBookmarkDialog";
import RepoDeleteDialog from "@components/organisms/dialogs/repository/repoDeleteDialog";
import RepoEditDialog from "@components/organisms/dialogs/repository/repoEditDialog";
import RepoKeyDialog from "@components/organisms/dialogs/repository/repoKey";
import RepoRestoreDialog from "@components/organisms/dialogs/repository/repoRestoreDialog";
import RepoShareDialog from "@components/organisms/dialogs/repository/repoShareDialog";
import RepoLeaveDialog from "@components/organisms/dialogs/repository/repoLeaveDialog";
import { useRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";
import Files from "@components/organisms/fileManagement";
import RepoVersionRequestsDialog from "@components/organisms/dialogs/repository/repoVersionRequestsDialog";
import PrivateFeedCreateDialog from "@components/organisms/dialogs/privateFeed/privateFeedCreateDialog";

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
    fileManagement: boolean;
    versionRequests: boolean;
    privateFeed: boolean;
  };
  setModalState: (key: keyof IRepoDialogsProps["modals"], state: boolean) => void;
}

const RepoDialogs = ({ modals, setModalState }: IRepoDialogsProps) => {
  const [getRepo, setRepo] = useRecoilState(repoAtom);

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
      {modals.bookmark && getRepo ? (
        <RepoBookmarkDialog
          repo={getRepo}
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
      {modals.fileManagement && getRepo ? (
        <Files
          type="public"
          userGroupHash={getRepo.userGroupHash}
          resourceId={getRepo?.id}
          dialogHeader="افزودن فایل"
          handleClose={() => {
            setModalState("fileManagement", false);
            handleClose();
          }}
        />
      ) : null}
      {modals.versionRequests ? (
        <RepoVersionRequestsDialog
          setOpen={() => {
            setModalState("versionRequests", false);
            handleClose();
          }}
        />
      ) : null}
      {modals.privateFeed ? (
        <PrivateFeedCreateDialog
          setOpen={() => {
            setModalState("privateFeed", false);
            handleClose();
          }}
        />
      ) : null}
    </>
  );
};

export default RepoDialogs;
