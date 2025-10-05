import React from "react";
import DiffVersionAlert from "../diffVersionAlert";
import DiffVersionDialog from "@components/organisms/dialogs/version/diffVersionDialog";
import LastVersionDialog from "@components/organisms/dialogs/version/lastVersionDialog";
import VersionCancelConfirmDialog from "@components/organisms/dialogs/version/versionCancelConfirmDialog";
import VersionCancelPublicDialog from "@components/organisms/dialogs/version/versionCancelPublicDialog";
import VersionCloneDialog from "@components/organisms/dialogs/version/versionCloneDialog";
import VersionConfirmDialog from "@components/organisms/dialogs/version/versionConfirmDialog";
import VersionDeleteDialog from "@components/organisms/dialogs/version/versionDeleteDialog";
import VersionPublicDialog from "@components/organisms/dialogs/version/versionPublicDialog";
import ConfirmPublicDraftDialog from "@components/organisms/dialogs/version/confirmPublicDraftDialog";
import AcceptDraftDialog from "@components/organisms/dialogs/draftRequest/acceptDraftDialog";
import AcceptVersionDialog from "@components/organisms/dialogs/versionRequest/acceptVersionDialog";
import AcceptPublicDraftDialog from "@components/organisms/dialogs/draftRequest/acceptDraftPublicDialog";
import { useVersionStore } from "@store/version";
import FormVersionResponseListDialog from "@components/organisms/dialogs/version/formVersionResponseListDialog";

interface IVersionDialogsProps {
  activeModal: string | null;
  closeModal: () => void;
}

const VersionDialogs = ({ activeModal, closeModal }: IVersionDialogsProps) => {
  const { compareVersion, setCompareVersion } = useVersionStore();

  if (!activeModal) {
    return null;
  }

  return (
    <>
      {activeModal === "delete" ? <VersionDeleteDialog setOpen={closeModal} /> : null}
      {activeModal === "clone" ? <VersionCloneDialog setOpen={closeModal} /> : null}
      {activeModal === "compare" ? (
        <DiffVersionDialog
          setOpen={() => {
            closeModal();
            setCompareVersion(null);
          }}
        />
      ) : null}
      {activeModal === "confirm" ? <VersionConfirmDialog setOpen={closeModal} /> : null}
      {activeModal === "cancelConfirm" ? <VersionCancelConfirmDialog setOpen={closeModal} /> : null}
      {activeModal === "public" ? <VersionPublicDialog setOpen={closeModal} /> : null}
      {activeModal === "cancelPublic" ? <VersionCancelPublicDialog setOpen={closeModal} /> : null}
      {activeModal === "lastVersion" ? <LastVersionDialog setOpen={closeModal} /> : null}
      {activeModal === "publicDraft" ? <ConfirmPublicDraftDialog setOpen={closeModal} /> : null}
      {activeModal === "acceptConfirmDraft" ? <AcceptDraftDialog setOpen={closeModal} /> : null}
      {activeModal === "acceptPublicVersion" ? <AcceptVersionDialog setOpen={closeModal} /> : null}
      {activeModal === "acceptPublicDraft" ? (
        <AcceptPublicDraftDialog setOpen={closeModal} />
      ) : null}
      {activeModal === "rejectPublicDraft" ? (
        <VersionCancelConfirmDialog setOpen={closeModal} />
      ) : null}
      {compareVersion?.version && !compareVersion.compare ? <DiffVersionAlert /> : null}
      {activeModal === "formVersionExport" ? (
        <FormVersionResponseListDialog setOpen={closeModal} />
      ) : null}
    </>
  );
};

export default VersionDialogs;
