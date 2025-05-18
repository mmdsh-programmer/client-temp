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
import { compareVersionAtom } from "@atom/version";
import { useRecoilState } from "recoil";
import ConfirmPublicDraftDialog from "@components/organisms/dialogs/version/confirmPublicDraftDialog";
import AcceptDraftDialog from "@components/organisms/dialogs/draftRequest/acceptDraftDialog";
import AcceptVersionDialog from "@components/organisms/dialogs/versionRequest/acceptVersionDialog";
import AcceptPublicDraftDialog from "@components/organisms/dialogs/draftRequest/acceptDraftPublicDialog";

interface IVersionDialogsProps {
  modals: {
    compare: boolean;
    delete: boolean;
    edit: boolean;
    clone: boolean;
    confirm: boolean;
    cancelConfirm: boolean;
    public: boolean;
    cancelPublic: boolean;
    lastVersion: boolean;
    publicDraft: boolean;
    acceptConfirmDraft: boolean;
    acceptPublicVersion: boolean;
    acceptPublicDraft: boolean;
    rejectPublicDraft: boolean;
  };
  setModalState: (key: keyof IVersionDialogsProps["modals"], state: boolean) => void;
}

const VersionDialogs = ({ modals, setModalState }: IVersionDialogsProps) => {
  const [compareVersion, setCompareVersion] = useRecoilState(compareVersionAtom);

  return (
    <>
      {modals.delete ? (
        <VersionDeleteDialog
          setOpen={() => {
            return setModalState("delete", false);
          }}
        />
      ) : null}
      {modals.clone ? (
        <VersionCloneDialog
          setOpen={() => {
            return setModalState("clone", false);
          }}
        />
      ) : null}
      {modals.compare ? (
        <DiffVersionDialog
          setOpen={() => {
            setModalState("compare", false);
            setCompareVersion(null);
          }}
        />
      ) : null}
      {modals.confirm ? (
        <VersionConfirmDialog
          setOpen={() => {
            return setModalState("confirm", false);
          }}
        />
      ) : null}
      {modals.cancelConfirm ? (
        <VersionCancelConfirmDialog
          setOpen={() => {
            return setModalState("cancelConfirm", false);
          }}
        />
      ) : null}
      {modals.public ? (
        <VersionPublicDialog
          setOpen={() => {
            return setModalState("public", false);
          }}
        />
      ) : null}
      {modals.cancelPublic ? (
        <VersionCancelPublicDialog
          setOpen={() => {
            return setModalState("cancelPublic", false);
          }}
        />
      ) : null}
      {modals.lastVersion ? (
        <LastVersionDialog
          setOpen={() => {
            return setModalState("lastVersion", false);
          }}
        />
      ) : null}
      {modals.publicDraft ? (
        <ConfirmPublicDraftDialog
          setOpen={() => {
            return setModalState("publicDraft", false);
          }}
        />
      ) : null}
      {modals.acceptConfirmDraft ? (
        <AcceptDraftDialog
          setOpen={() => {
            return setModalState("acceptConfirmDraft", false);
          }}
        />
      ) : null}
      {modals.acceptPublicVersion ? (
        <AcceptVersionDialog
          setOpen={() => {
            return setModalState("acceptPublicVersion", false);
          }}
        />
      ) : null}
      {modals.acceptPublicDraft ? (
        <AcceptPublicDraftDialog
          setOpen={() => {
            return setModalState("acceptPublicDraft", false);
          }}
        />
      ) : null}
      {modals.rejectPublicDraft ? (
        <VersionCancelConfirmDialog
          setOpen={() => {
            return setModalState("rejectPublicDraft", false);
          }}
        />
      ) : null}
      {compareVersion?.version && !compareVersion.compare ? <DiffVersionAlert /> : null}
    </>
  );
};

export default VersionDialogs;
