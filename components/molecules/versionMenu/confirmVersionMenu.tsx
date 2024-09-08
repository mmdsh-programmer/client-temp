import React, { useState } from "react";
import { IVersion } from "@interface/version.interface";
import { useRecoilState, useRecoilValue } from "recoil";
import MenuTemplate from "@components/templates/menuTemplate";
import {
  ComparisionIcon,
  ConfirmationVersionIcon,
  CopyIcon,
  DeleteIcon,
  DuplicateIcon,
  EditIcon,
  EditVersionIcon,
  LastVersionIcon,
  MoreDotIcon,
  ShareIcon,
} from "@components/atoms/icons";
import VersionDeleteDialog from "@components/organisms/dialogs/version/versionDeleteDialog";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { repoAtom } from "@atom/repository";
import VersionCloneDialog from "@components/organisms/dialogs/version/versionCloneDialog";
import VersionPublicDialog from "@components/organisms/dialogs/version/versionPublicDialog";
import VersionCancelPublicDialog from "@components/organisms/dialogs/version/versionCancelPublicDialog";
import DrawerTemplate from "@components/templates/drawerTemplate";
import { EVersionStatus } from "@interface/enums";
import LastVersionDialog from "@components/organisms/dialogs/version/lastVersionDialog";
import DiffVersionAlert from "../diffVersionAlert";
import DiffVersionDialog from "@components/organisms/dialogs/version/diffVersionDialog";
import { selectedDocumentAtom } from "@atom/document";
import { compareVersionAtom } from "@atom/version";

interface IProps {
  version?: IVersion;
  lastVersion?: IVersion;
}

const ConfirmVersionMenu = ({ version, lastVersion }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const [compareVersion, setCompareVersion] =
    useRecoilState(compareVersionAtom);

  const [editVersionModal, setEditVersionModal] = useState(false);
  const [deleteVersionModal, setDeleteVersionModal] = useState(false);
  const [cloneVersion, setCloneVersion] = useState(false);
  const [versionPublicModal, setVersionPublicModal] = useState(false);
  const [versionCancelPublicModal, setVersionCancelPublicModal] =
    useState(false);
  const [diffVersionModal, setDiffVersionModal] = useState(false);
  const [lastVersionModal, setLastVersionModal] = useState(false);
  const [openVersionActionDrawer, setOpenVersionActionDrawer] = useState<
    boolean | null
  >(false);

  const adminOrOwner =
    getRepo?.roleName === "admin" || getRepo?.roleName === "owner";

  const menuList: {
    text: string;
    icon?: React.JSX.Element;
    onClick: () => void;
  }[] = [
    {
      text: "ایجاد نسخه جدید از این نسخه",
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
          toast.success("هش مربوط به نسخه کپی شد.");
        }
      },
    },
    {
      text: "ویرایش",
      icon: <EditIcon className="h-4 w-4" />,
      onClick: () => {
        setEditVersionModal(true);
      },
    },
    {
      text: (() => {
        if (version?.status === "private" && adminOrOwner) {
          return "ارسال درخواست عمومی شدن";
        } else {
          return "لغو درخواست عمومی شدن نسخه";
        }
      })(),
      onClick: () => {
        if (version?.status === "private" && adminOrOwner) {
          setVersionPublicModal(true);
        } else if (version?.status === "pending" && adminOrOwner) {
          return "لغو درخواست عمومی شدن نسخه";
        }
      },
    },
    version?.status !== EVersionStatus.pending &&
    version?.status !== EVersionStatus.rejected &&
    version?.id !== lastVersion?.id
      ? {
          text: "انتخاب به عنوان آخرین نسخه",
          icon: <LastVersionIcon className="h-4 w-4 fill-icon-active" />,
          onClick: () => {
            setLastVersionModal(true);
          },
        }
      : null,
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
      text: "حذف نسخه",
      icon: <DeleteIcon className="h-4 w-4" />,
      onClick: () => {
        setDeleteVersionModal(true);
      },
    },
  ].filter(
    (
      item
    ): item is {
      text: string;
      icon: React.JSX.Element;
      onClick: () => void;
    } => Boolean(item)
  );

  return (
    <>
      <MenuTemplate
        setOpenDrawer={() => {
          setOpenVersionActionDrawer(true);
        }}
        menuList={menuList}
        icon={
          <div className="rounded-lg bg-white p-1 shadow-none border-2 border-gray-50 flex justify-center items-center h-8 w-8">
            <MoreDotIcon className="w-4 h-4" />
          </div>
        }
      />
      <DrawerTemplate
        openDrawer={openVersionActionDrawer}
        setOpenDrawer={setOpenVersionActionDrawer}
        menuList={menuList}
      />
      {versionPublicModal && version && (
        <VersionPublicDialog
          version={version}
          setOpen={() => setVersionPublicModal(false)}
        />
      )}
      {versionCancelPublicModal && version && (
        <VersionCancelPublicDialog
          version={version}
          setOpen={() => setVersionCancelPublicModal(false)}
        />
      )}
      {cloneVersion && version && (
        <VersionCloneDialog
          version={version}
          setOpen={() => setCloneVersion(false)}
        />
      )}
      {deleteVersionModal && version && (
        <VersionDeleteDialog
          version={version}
          setOpen={() => setDeleteVersionModal(false)}
        />
      )}
      {lastVersionModal && version && (
        <LastVersionDialog
          version={version}
          setOpen={() => setLastVersionModal(false)}
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

export default ConfirmVersionMenu;
