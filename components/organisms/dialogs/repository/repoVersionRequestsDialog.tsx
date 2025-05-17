import React, { useState } from "react";
import TabComponent from "@components/molecules/tab";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { DialogBody } from "@material-tailwind/react";
import DraftRequests from "@components/organisms/versionRequests/draftRequests";
import VersionRequests from "@components/organisms/versionRequests/versionRequests";
import DraftRequestMenu from "@components/molecules/draftRequestMenu";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { acceptVersionAtom, rejectVersionAtom, selectedRequestAtom } from "@atom/releaseDocs";
import AcceptDraftDialog from "../draftRequest/acceptDraftDialog";
import RejectDraftDialog from "../draftRequest/rejectDraftDialog";
import AcceptVersionDialog from "../versionRequest/acceptVersionDialog";
import RejectVersionDialog from "../versionRequest/rejectVersionDialog";
import { repoAtom } from "@atom/repository";
import { selectedVersionAtom } from "@atom/version";
import { editorModalAtom } from "@atom/editor";
import { EDraftStatus } from "@interface/enums";
import AcceptPublicDraftDialog from "../draftRequest/acceptDraftPublicDialog";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum ETabs {
  DRAFT_REQUESTS = "پیش‌نویس‌های در انتظار تایید",
  VERSION_REQUESTS = "نسخه‌های در انتظار عمومی شدن",
}

const RepoVersionRequestsDialog = ({ setOpen }: IProps) => {
  const [activeTab, setActiveTab] = useState<string>(ETabs.DRAFT_REQUESTS);

  const getRepo = useRecoilValue(repoAtom);
  const setSelectedVersion = useSetRecoilState(selectedVersionAtom);
  const getEditorModal = useRecoilValue(editorModalAtom);

  const getRequest = useRecoilValue(selectedRequestAtom);
  const [openAcceptVersionDialog, setOpenAcceptVersionDialog] = useRecoilState(acceptVersionAtom);

  const [openRejectVersionDialog, setOpenRejectVersionDialog] = useRecoilState(rejectVersionAtom);

  const handleClose = () => {
    setOpen(false);
    setSelectedVersion(null);
  };

  const tabList = [
    {
      tabTitle: ETabs.DRAFT_REQUESTS,
      tabContent: <DraftRequests />,
    },
    {
      tabTitle: ETabs.VERSION_REQUESTS,
      tabContent: <VersionRequests />,
    },
  ];

  if (getRequest?.state === "draft" && openAcceptVersionDialog) {
    return (
      <AcceptDraftDialog
        setOpen={() => {
          return setOpenAcceptVersionDialog(false);
        }}
      />
    );
  }

  if (getRequest?.state === "draft" && openRejectVersionDialog) {
    return (
      <RejectDraftDialog
        setOpen={() => {
          return setOpenRejectVersionDialog(false);
        }}
      />
    );
  }

  if (getRequest?.state === "version" && openAcceptVersionDialog) {
    return (
      <AcceptVersionDialog
        setOpen={() => {
          return setOpenAcceptVersionDialog(false);
        }}
      />
    );
  }

  if (getRequest?.state === "version" && openRejectVersionDialog) {
    return (
      <RejectVersionDialog
        setOpen={() => {
          return setOpenRejectVersionDialog(false);
        }}
      />
    );
  }

  if (
    getRequest?.state === "draft" &&
    openAcceptVersionDialog &&
    getRequest.status === EDraftStatus.waitForDirectPublic
  ) {
    return (
      <AcceptPublicDraftDialog
        setOpen={() => {
          return setOpenAcceptVersionDialog(false);
        }}
      />
    );
  }

  if (getEditorModal) {
    return null;
  }

  return (
    <InfoDialog
      dialogHeader="درخواست‌های تایید نسخه"
      setOpen={handleClose}
      className="repo-requests-dialog flex !h-full w-full max-w-full flex-col rounded-none bg-primary xs:!h-[600px] xs:!min-w-[80%] xs:!max-w-[80%] xs:rounded-lg "
    >
      <DialogBody placeholder="dialog body" className="dialog-body h-full overflow-auto p-0">
        <div className="flex h-[calc(100%-160px)] flex-col gap-4 overflow-auto p-4 xs:h-[535px] xs:p-6">
          {getRepo?.roleName === "owner" ? (
            <TabComponent tabList={tabList} activeTab={activeTab} setActiveTab={setActiveTab} />
          ) : (
            <DraftRequests />
          )}
        </div>
      </DialogBody>
      <DraftRequestMenu showDrawer />
    </InfoDialog>
  );
};

export default RepoVersionRequestsDialog;
