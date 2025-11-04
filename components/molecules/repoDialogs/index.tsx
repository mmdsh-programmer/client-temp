import React from "react";
import RepoArchiveDialog from "@components/organisms/dialogs/repository/repoArchiveDialog";
import RepoBookmarkDialog from "@components/organisms/dialogs/repository/repoBookmarkDialog";
import RepoDeleteDialog from "@components/organisms/dialogs/repository/repoDeleteDialog";
import RepoEditDialog from "@components/organisms/dialogs/repository/repoEditDialog";
import RepoKeyDialog from "@components/organisms/dialogs/repository/repoKey";
import RepoRestoreDialog from "@components/organisms/dialogs/repository/repoRestoreDialog";
import RepoShareDialog from "@components/organisms/dialogs/repository/repoShareDialog";
import RepoLeaveDialog from "@components/organisms/dialogs/repository/repoLeaveDialog";
import Files from "@components/organisms/fileManagement";
import RepoVersionRequestsDialog from "@components/organisms/dialogs/repository/repoVersionRequestsDialog";
import { useRepositoryStore } from "@store/repository";
import PrivateFeedCreateDialog from "@components/organisms/dialogs/privateFeed/privateFeedCreateDialog";
import RepoWhiteListRequestsDialog from "@components/organisms/dialogs/repository/repoWhiteListRequestsDialog";
import MyNotificationSettingDialog from "@components/organisms/dialogs/repository/myNotificationSettingDialog";

interface IRepoDialogsProps {
  activeModal: string | null;
  closeModal: () => void;
}

const RepoDialogs = ({ activeModal, closeModal }: IRepoDialogsProps) => {
  const { repo: getRepo } = useRepositoryStore();

  if (!activeModal) {
    return null;
  }

  const handleClose = () => {
    closeModal();
  };

  return (
    <>
      {activeModal === "edit" ? <RepoEditDialog setOpen={handleClose} /> : null}
      {activeModal === "delete" ? <RepoDeleteDialog setOpen={handleClose} /> : null}
      {activeModal === "archive" ? <RepoArchiveDialog setOpen={handleClose} /> : null}
      {activeModal === "restore" ? <RepoRestoreDialog setOpen={handleClose} /> : null}
      {activeModal === "bookmark" ? <RepoBookmarkDialog setOpen={handleClose} /> : null}
      {activeModal === "share" ? <RepoShareDialog setOpen={handleClose} /> : null}
      {activeModal === "key" ? <RepoKeyDialog setOpen={handleClose} /> : null}
      {activeModal === "leave" ? <RepoLeaveDialog setOpen={handleClose} /> : null}
      {activeModal === "fileManagement" && getRepo ? (
        <Files
          type="public"
          userGroupHash={getRepo.userGroupHash}
          resourceId={getRepo?.id}
          dialogHeader="افزودن فایل"
          handleClose={handleClose}
        />
      ) : null}
      {activeModal === "versionRequests" ? (
        <RepoVersionRequestsDialog setOpen={handleClose} />
      ) : null}
      {activeModal === "privateFeed" ? <PrivateFeedCreateDialog setOpen={handleClose} /> : null}
      {activeModal === "documentWhiteList" ? (
        <RepoWhiteListRequestsDialog setOpen={handleClose} />
      ) : null}
      {activeModal === "myNotif" ? <MyNotificationSettingDialog setOpen={handleClose} /> : null}
    </>
  );
};

export default RepoDialogs;
