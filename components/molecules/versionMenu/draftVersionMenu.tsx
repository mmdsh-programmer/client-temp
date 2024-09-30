import {
  ComparisionIcon,
  ConfirmationVersionIcon,
  CopyIcon,
  DeleteIcon,
  DuplicateIcon,
  EditIcon,
  MoreDotIcon,
  ShareIcon,
} from "@components/atoms/icons";
import React, { useState } from "react";
import {
  compareVersionAtom,
  selectedVersionAtom,
  versionDrawerAtom,
} from "@atom/version";
import {
 useRecoilState, useRecoilValue, useSetRecoilState 
} from "recoil";

import DiffVersionAlert from "../diffVersionAlert";
import DiffVersionDialog from "@components/organisms/dialogs/version/diffVersionDialog";
import DrawerTemplate from "@components/templates/drawerTemplate";
import Editor from "@components/organisms/dialogs/editor";
import { IVersion } from "@interface/version.interface";
import MenuTemplate from "@components/templates/menuTemplate";
import VersionCancelConfirmDialog from "@components/organisms/dialogs/version/versionCancelConfirmDialog";
import VersionCloneDialog from "@components/organisms/dialogs/version/versionCloneDialog";
import VersionConfirmDialog from "@components/organisms/dialogs/version/versionConfirmDialog";
import VersionDeleteDialog from "@components/organisms/dialogs/version/versionDeleteDialog";
import copy from "copy-to-clipboard";
import { editorModeAtom } from "@atom/editor";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";

interface IProps {
  version?: IVersion;
  showDrawer?: boolean;
}

const DraftVersionMenu = ({
 version, showDrawer 
}: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const setVersion = useSetRecoilState(selectedVersionAtom);
  const [compareVersion, setCompareVersion] =
    useRecoilState(compareVersionAtom);
  const setEditorMode = useSetRecoilState(editorModeAtom);

  const [diffVersionModal, setDiffVersionModal] = useState(false);
  const [editVersionModal, setEditVersionModal] = useState(false);
  const [deleteVersionModal, setDeleteVersionModal] = useState(false);
  const [cloneVersion, setCloneVersion] = useState(false);
  const [versionConfirmModal, setVersionConfirmModal] = useState(false);
  const [versionCancelConfirmModal, setVersionCancelConfirmModal] =
    useState(false);
  const [openVersionActionDrawer, setOpenVersionActionDrawer] =
    useRecoilState(versionDrawerAtom);

  const adminOrOwner =
    getRepo?.roleName === "admin" || getRepo?.roleName === "owner";

  const menuList: {
    text: string;
    icon?: React.JSX.Element;
    onClick: () => void;
  }[] = [
    {
      text: "ایجاد نسخه جدید از نسخه",
      icon: <DuplicateIcon className="h-4 w-4 stroke-icon-active" />,
      onClick: () => {
        setCloneVersion(true);
      },
    },
    {
      text: compareVersion?.version ? "مقایسه با نسخه مورد نظر" : "مقایسه",
      icon: <ComparisionIcon className="h-4 w-4 stroke-icon-active" />,
      onClick: () => {
        if (getRepo && getDocument && version && compareVersion?.version) {
          setCompareVersion({
            ...compareVersion,
            compare: {
              data: version,
              repo: getRepo,
              document: getDocument,
            },
          });
          setDiffVersionModal(true);
        } else if (getRepo && getDocument && version) {
          setCompareVersion({
            version: {
              data: version,
              repo: getRepo,
              document: getDocument,
            },
            compare: null,
          });
        }
      },
    },
    {
      text: "کپی هش فایل",
      icon: <CopyIcon className="h-4 w-4 fill-icon-active stroke-[1.5]" />,
      onClick: () => {
        if (version) {
          copy(version.hash);
          toast.success("هش مربوط به پیش نویس کپی شد.");
        }
      },
    },
    {
      text: "ویرایش",
      icon: <EditIcon className="h-4 w-4" />,
      onClick: () => {
        setEditVersionModal(true);
        setEditorMode("edit");
      },
    },
    {
      text: (() => {
        if (version?.status === "editing") {
          return adminOrOwner
            ? "تایید نسخه"
            : "ارسال درخواست تایید نسخه به مدیر";
        }
        return adminOrOwner ? "عدم تایید نسخه" : "لغوارسال درخواست تایید نسخه";
      })(),
      icon: <ConfirmationVersionIcon className="h-4 w-4 fill-icon-active" />,
      onClick: () => {
        if (version?.status === "editing" && adminOrOwner) {
          setVersionConfirmModal(true);
        } else if (version?.status === "pending" && adminOrOwner) {
          setVersionCancelConfirmModal(true);
        }
      },
    },
    {
      text: "کپی آدرس اشتراک‌ گذاری",
      icon: <ShareIcon className="h-4 w-4" />,
      onClick: () => {
        if (version) {
          copy(
            `${window.location.href}&versionId=${version.id}&versionState=${version.state}`
          );
          toast.success("آدرس کپی شد.");
        }
      },
    },
    {
      text: "حذف پیش نویس",
      icon: <DeleteIcon className="h-4 w-4" />,
      onClick: () => {
        setDeleteVersionModal(true);
      },
    },
  ];

  return (
    <>
      {showDrawer ? (
        <div className="xs:hidden flex">
          <DrawerTemplate
            openDrawer={openVersionActionDrawer}
            setOpenDrawer={setOpenVersionActionDrawer}
            menuList={menuList}
          />
        </div>
      ) : (
        <MenuTemplate
          setOpenDrawer={() => {
            setOpenVersionActionDrawer(true);
            if (version) {
              setVersion(version);
            }
          }}
          menuList={menuList}
          icon={
            <div className="rounded-lg bg-white p-1 shadow-none border-2 border-gray-50 flex justify-center items-center h-8 w-8">
              <MoreDotIcon className="w-4 h-4" />
            </div>
          }
        />
      )}
      {versionConfirmModal && version && (
        <VersionConfirmDialog
          version={version}
          setOpen={() => {
            return setVersionConfirmModal(false);
          }}
        />
      )}
      {versionCancelConfirmModal && version && (
        <VersionCancelConfirmDialog
          version={version}
          setOpen={() => {
            return setVersionCancelConfirmModal(false);
          }}
        />
      )}
      {cloneVersion && version && (
        <VersionCloneDialog
          version={version}
          setOpen={() => {
            return setCloneVersion(false);
          }}
        />
      )}
      {editVersionModal && version && (
        <Editor
          setOpen={() => {
            return setEditVersionModal(false);
          }}
        />
      )}
      {deleteVersionModal && version && (
        <VersionDeleteDialog
          version={version}
          setOpen={() => {
            return setDeleteVersionModal(false);
          }}
        />
      )}
      {compareVersion?.version && !compareVersion.compare && (
        <DiffVersionAlert />
      )}
      {diffVersionModal && (
        <DiffVersionDialog
          setOpen={() => {
            setDiffVersionModal(false);
            setCompareVersion(null);
          }}
        />
      )}
    </>
  );
};

export default DraftVersionMenu;
