import React from "react";
import { IVersion } from "@interface/version.interface";
import VersionDeleteDialog from "@components/organisms/dialogs/version/versionDeleteDialog";
import VersionCloneDialog from "@components/organisms/dialogs/version/versionCloneDialog";
import DiffVersionDialog from "@components/organisms/dialogs/version/diffVersionDialog";
import VersionConfirmDialog from "@components/organisms/dialogs/version/versionConfirmDialog";
import VersionCancelConfirmDialog from "@components/organisms/dialogs/version/versionCancelConfirmDialog";
import VersionPublicDialog from "@components/organisms/dialogs/version/versionPublicDialog";
import VersionCancelPublicDialog from "@components/organisms/dialogs/version/versionCancelPublicDialog";
import LastVersionDialog from "@components/organisms/dialogs/version/lastVersionDialog";
import DiffVersionAlert from "../diffVersionAlert";
import { useRecoilState } from "recoil";
import { compareVersionAtom } from "@atom/version";

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
  };
  setModalState: (
    key: keyof IVersionDialogsProps["modals"],
    state: boolean
  ) => void;
  version?: IVersion;
}

const VersionDialogs = ({
  modals,
  setModalState,
  version,
}: IVersionDialogsProps) => {
  const [compareVersion, setCompareVersion] =
    useRecoilState(compareVersionAtom);

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
      {modals.confirm && version ? (
        <VersionConfirmDialog
          version={version}
          setOpen={() => {
            return setModalState("confirm", false);
          }}
        />
      ) : null}
      {modals.cancelConfirm && version ? (
        <VersionCancelConfirmDialog
          version={version}
          setOpen={() => {
            return setModalState("cancelConfirm", false);
          }}
        />
      ) : null}
      {modals.public && version ? (
        <VersionPublicDialog
          version={version}
          setOpen={() => {
            return setModalState("public", false);
          }}
        />
      ) : null}
      {modals.cancelPublic && version ? (
        <VersionCancelPublicDialog
          version={version}
          setOpen={() => {
            return setModalState("cancelPublic", false);
          }}
        />
      ) : null}
      {modals.lastVersion && version ? (
        <LastVersionDialog
          version={version}
          setOpen={() => {
            return setModalState("lastVersion", false);
          }}
        />
      ) : null}
      {compareVersion?.version && !compareVersion.compare ? (
        <DiffVersionAlert />
      ) : null}
    </>
  );
};

export default VersionDialogs;
