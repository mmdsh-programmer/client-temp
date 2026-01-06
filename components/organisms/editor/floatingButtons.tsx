import React, { useState } from "react";
import {
  CancelVersionIcon,
  ConfirmationVersionIcon,
  GlobeIcon,
  ListIcon,
  SpeedDialIcon,
} from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";
import LikeAndDislike from "../like&dislike";
import RenderIf from "@components/atoms/renderIf";
import VersionConfirmDialog from "../dialogs/version/versionConfirmDialog";
import VersionPublicDialog from "../dialogs/version/versionPublicDialog";
import VersionCancelConfirmDialog from "../dialogs/version/versionCancelConfirmDialog";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";
import AcceptDraftDialog from "../dialogs/draftRequest/acceptDraftDialog";
import VersionCancelPublicDialog from "../dialogs/version/versionCancelPublicDialog";
import AcceptVersionDialog from "../dialogs/versionRequest/acceptVersionDialog";
import AcceptPublicDraftDialog from "../dialogs/draftRequest/acceptPublicDraftDialog";
import ConfirmPublicDraftDialog from "../dialogs/version/confirmPublicDraftDialog";
import { ERoles, EDocumentTypes } from "@interface/enums";
import DownloadPDF from "@components/molecules/downloadPDF";
import DownloadExcel from "@components/molecules/downloadExcel";
import { IRemoteEditorRef } from "clasor-remote-editor";
import { useEditorStore } from "@store/editor";
import { useVersionStore } from "@store/version";
import { useDocumentStore } from "@store/document";
import { useRepositoryStore } from "@store/repository";

interface IProps {
  editorRef: React.RefObject<IRemoteEditorRef>;
}

const FloatingButtons = ({ editorRef }: IProps) => {
  const currentPath = usePathname();
  const { repo: getRepo } = useRepositoryStore();
  const { selectedDocument: getDocument } = useDocumentStore();
  const { selectedVersion: getVersion } = useVersionStore();
  const { editorListDrawer: getListDrawer, setEditorListDrawer: setListDrawer } = useEditorStore();
  const { editorMode } = useEditorStore();

  const [draftConfirmModal, setDraftConfirmModal] = useState(false);
  const [draftAcceptConfirmModal, setDraftAcceptConfirmModal] = useState(false);
  const [draftRejectConfirmModal, setDraftRejectConfirmModal] = useState(false);
  const [versionPublicModal, setVersionPublicModal] = useState(false);
  const [versionRejectPublicModal, setVersionRejectPublicModal] = useState(false);
  const [versionAcceptPublicModal, setVersionAcceptPublicModal] = useState(false);
  const [publicDraftModal, setPublicDraftModal] = useState(false);
  const [acceptPublicDraftModal, setAcceptPublicDraftModal] = useState(false);
  const [openSpeedDial, setOpenSpeedDial] = useState(false);

  const { data: userInfo } = useGetUser();

  const renderLike = getVersion?.state !== "draft" && getVersion?.status === "accepted";

  const adminOrOwnerRole = () => {
    if (
      currentPath === "/admin/myDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id === getDocument?.repoId)
    ) {
      return true;
    }
    if (
      currentPath === "/admin/sharedDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getDocument?.repoId)
    ) {
      return getDocument?.accesses?.[0] === "admin";
    }
    if (currentPath === "/admin/dashboard" && getDocument?.accesses?.[0] === "admin") {
      return true;
    }
    if (getRepo) {
      return getRepo?.roleName === "admin" || getRepo?.roleName === "owner";
    }
  };

  const viewerRole = () => {
    if (currentPath === "/admin/sharedDocuments") {
      return getDocument?.accesses?.[0] === "viewer" || getDocument?.accesses?.[0] === "writer";
    }
    if (getRepo) {
      return getRepo?.roleName === "viewer" || getRepo?.roleName === "writer";
    }
  };

  return (
    <>
      <div
        className={`${getListDrawer ? "right-[3%] sm:right-[310px]" : "right-[3%]"} absolute bottom-[20px] flex items-center gap-2 rounded-full bg-[#222] p-2 shadow-xl`}
      >
        <Button
          {...({} as React.ComponentProps<typeof Button>)}
          className="h-8 w-8 rounded-full bg-transparent p-0 hover:bg-gray-700"
          onClick={() => {
            setOpenSpeedDial(!openSpeedDial);
          }}
        >
          <SpeedDialIcon className="h-4 w-4" />
        </Button>
        {openSpeedDial ? (
          <>
            {(editorMode === "preview" || editorMode === "temporaryPreview") &&
              (getDocument?.contentType === EDocumentTypes.excel && getVersion ? (
                <DownloadExcel editorRef={editorRef} version={getVersion} />
              ) : (
                <DownloadPDF />
              ))}
            <Button
              {...({} as React.ComponentProps<typeof Button>)}
              className="h-8 w-8 rounded-full bg-transparent p-0 hover:bg-gray-700"
              onClick={() => {
                setListDrawer(!getListDrawer);
              }}
            >
              <ListIcon className="h-5 w-5" />
            </Button>
            <RenderIf isTrue={getVersion?.state === "draft" && getVersion?.status === "editing"}>
              <>
                <Button
                  {...({} as React.ComponentProps<typeof Button>)}
                  className="h-8 w-8 rounded-full bg-transparent p-0 hover:bg-gray-700"
                  onClick={() => {
                    setDraftConfirmModal(true);
                  }}
                  disabled={viewerRole()}
                  title={adminOrOwnerRole() ? "تایید پیش نویس" : "ارسال درخواست تایید نسخه به مدیر"}
                >
                  <ConfirmationVersionIcon className="h-4 w-4 fill-white" />
                </Button>
                <Button
                  {...({} as React.ComponentProps<typeof Button>)}
                  className="h-8 w-8 rounded-full bg-transparent p-0 hover:bg-gray-700"
                  onClick={() => {
                    setPublicDraftModal(true);
                  }}
                  disabled={viewerRole()}
                  title="تایید و عمومی‌سازی پیش‌نویس"
                >
                  <ConfirmationVersionIcon className="h-4 w-4 fill-white" />
                </Button>
              </>
            </RenderIf>
            <RenderIf isTrue={getVersion?.state === "draft" && getVersion?.status === "pending"}>
              <>
                <Button
                  {...({} as React.ComponentProps<typeof Button>)}
                  className="h-8 w-8 rounded-full bg-transparent p-0 hover:bg-gray-700"
                  onClick={() => {
                    setDraftAcceptConfirmModal(true);
                  }}
                  title="تایید درخواست تایید پیش نویس"
                  disabled={viewerRole()}
                >
                  <ConfirmationVersionIcon className="h-4 w-4 fill-white" />
                </Button>
                <Button
                  {...({} as React.ComponentProps<typeof Button>)}
                  className="h-8 w-8 rounded-full bg-transparent p-0 hover:bg-gray-700"
                  onClick={() => {
                    setDraftRejectConfirmModal(true);
                  }}
                  disabled={viewerRole()}
                  title={
                    adminOrOwnerRole() ? "عدم تایید پیش نویس" : "لغوارسال درخواست تایید پیش نویس"
                  }
                >
                  <CancelVersionIcon className="h-4 w-4 stroke-white" />
                </Button>
              </>
            </RenderIf>
            <RenderIf
              isTrue={
                getVersion?.state === "version" &&
                getVersion?.status === "private" &&
                Boolean(adminOrOwnerRole())
              }
            >
              <Button
                {...({} as React.ComponentProps<typeof Button>)}
                className="h-8 w-8 rounded-full bg-transparent p-0 hover:bg-gray-700"
                onClick={() => {
                  setVersionPublicModal(true);
                }}
                title="ارسال درخواست عمومی شدن نسخه"
              >
                <ConfirmationVersionIcon className="h-4 w-4 fill-white" />
              </Button>
            </RenderIf>
            <RenderIf
              isTrue={
                getVersion?.state === "version" &&
                getVersion?.status === "pending" &&
                Boolean(adminOrOwnerRole())
              }
            >
              <>
                <Button
                  {...({} as React.ComponentProps<typeof Button>)}
                  className="h-8 w-8 rounded-full bg-transparent p-0 hover:bg-gray-700"
                  onClick={() => {
                    setVersionRejectPublicModal(true);
                  }}
                  title="لغو درخواست عمومی شدن نسخه"
                >
                  <CancelVersionIcon className="h-5 w-5 stroke-white" />
                </Button>
                <Button
                  {...({} as React.ComponentProps<typeof Button>)}
                  className="h-8 w-8 rounded-full bg-transparent p-0 hover:bg-gray-700"
                  onClick={() => {
                    setVersionAcceptPublicModal(true);
                  }}
                  title="تایید درخواست عمومی شدن نسخه"
                >
                  <GlobeIcon className="h-5 w-5 fill-white" />
                </Button>
              </>
            </RenderIf>
            <RenderIf
              isTrue={
                getVersion?.status === "waitForDirectPublic" &&
                (getRepo?.roleName === ERoles.owner ||
                  currentPath === "/admin/myDocuments" ||
                  (currentPath === "/admin/dashboard" &&
                    userInfo?.repository.id === getDocument?.repoId))
              }
            >
              <>
                <Button
                  {...({} as React.ComponentProps<typeof Button>)}
                  className="h-8 w-8 rounded-full bg-transparent p-0 hover:bg-gray-700"
                  onClick={() => {
                    setAcceptPublicDraftModal(true);
                  }}
                  title="تایید درخواست عمومی شدن پیش نویس"
                >
                  <ConfirmationVersionIcon className="h-4 w-4 fill-white" />
                </Button>
                <Button
                  {...({} as React.ComponentProps<typeof Button>)}
                  className="h-8 w-8 rounded-full bg-transparent p-0 hover:bg-gray-700"
                  onClick={() => {
                    setDraftRejectConfirmModal(true);
                  }}
                  title="لغو درخواست عمومی شدن پیش نویس"
                >
                  <CancelVersionIcon className="h-4 w-4 stroke-white" />
                </Button>
              </>
            </RenderIf>
            <RenderIf isTrue={renderLike}>
              <LikeAndDislike document={getDocument} />
            </RenderIf>
          </>
        ) : null}
      </div>
      {draftConfirmModal && getVersion ? (
        <VersionConfirmDialog
          setOpen={() => {
            return setDraftConfirmModal(false);
          }}
        />
      ) : null}
      {draftAcceptConfirmModal && getVersion ? (
        <AcceptDraftDialog
          setOpen={() => {
            return setDraftAcceptConfirmModal(false);
          }}
        />
      ) : null}
      {draftRejectConfirmModal && getVersion ? (
        <VersionCancelConfirmDialog
          setOpen={() => {
            return setDraftRejectConfirmModal(false);
          }}
        />
      ) : null}
      {versionPublicModal && getVersion ? (
        <VersionPublicDialog
          setOpen={() => {
            return setVersionPublicModal(false);
          }}
        />
      ) : null}
      {versionRejectPublicModal && getVersion ? (
        <VersionCancelPublicDialog
          setOpen={() => {
            return setVersionRejectPublicModal(false);
          }}
        />
      ) : null}
      {versionAcceptPublicModal && getVersion ? (
        <AcceptVersionDialog
          setOpen={() => {
            return setVersionAcceptPublicModal(false);
          }}
        />
      ) : null}
      {acceptPublicDraftModal && getVersion ? (
        <AcceptPublicDraftDialog
          setOpen={() => {
            return setAcceptPublicDraftModal(false);
          }}
        />
      ) : null}
      {publicDraftModal && getVersion ? (
        <ConfirmPublicDraftDialog
          setOpen={() => {
            return setPublicDraftModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default FloatingButtons;
