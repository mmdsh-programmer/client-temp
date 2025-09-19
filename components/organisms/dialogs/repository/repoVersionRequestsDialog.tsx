import React, { useState } from "react";
import TabComponent from "@components/molecules/tab";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { DialogBody } from "@material-tailwind/react";
import DraftRequests from "@components/organisms/versionRequests/draftRequests";
import VersionRequests from "@components/organisms/versionRequests/versionRequests";
import DraftRequestMenu from "@components/molecules/draftRequestMenu";
import AcceptDraftDialog from "../draftRequest/acceptDraftDialog";
import RejectDraftDialog from "../draftRequest/rejectDraftDialog";
import AcceptVersionDialog from "../versionRequest/acceptVersionDialog";
import RejectVersionDialog from "../versionRequest/rejectVersionDialog";
import { EDraftStatus } from "@interface/enums";
import AcceptPublicDraftDialog from "../draftRequest/acceptDraftPublicDialog";
import { useRepositoryStore } from "@store/repository";
import { useVersionStore } from "@store/version";
import { useEditorStore } from "@store/editor";
import { useReleaseDocsStore } from "@store/releaseDocs";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum ETabs {
  DRAFT_REQUESTS = "پیش‌نویس‌های در انتظار تایید",
  VERSION_REQUESTS = "نسخه‌های در انتظار عمومی شدن",
}

const RepoVersionRequestsDialog = ({ setOpen }: IProps) => {
  const [activeTab, setActiveTab] = useState<string>(ETabs.DRAFT_REQUESTS);

  const { repo: getRepo } = useRepositoryStore();
  const { setSelectedVersion } = useVersionStore();
  const { editorModal } = useEditorStore();
  const { selectedRequest, acceptVersion, setAcceptVersion, rejectVersion, setRejectVersion } = useReleaseDocsStore();

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

  if (selectedRequest?.state === "draft" && acceptVersion) {
    return (
      <AcceptDraftDialog
        setOpen={() => {
          return setAcceptVersion(false);
        }}
      />
    );
  }

  if (selectedRequest?.state === "draft" && rejectVersion) {
    return (
      <RejectDraftDialog
        setOpen={() => {
          return setRejectVersion(false);
        }}
      />
    );
  }

  if (selectedRequest?.state === "version" && acceptVersion) {
    return (
      <AcceptVersionDialog
        setOpen={() => {
          return setAcceptVersion(false);
        }}
      />
    );
  }

  if (selectedRequest?.state === "version" && rejectVersion) {
    return (
      <RejectVersionDialog
        setOpen={() => {
          return setRejectVersion(false);
        }}
      />
    );
  }

  if (
    selectedRequest?.state === "draft" &&
    acceptVersion &&
    selectedRequest.status === EDraftStatus.waitForDirectPublic
  ) {
    return (
      <AcceptPublicDraftDialog
        setOpen={() => {
          return setAcceptVersion(false);
        }}
      />
    );
  }

  if (editorModal) {
    return null;
  }

  return (
    <InfoDialog
      dialogHeader="درخواست‌های تایید نسخه"
      setOpen={handleClose}
      className="repo-requests-dialog flex !h-full w-full max-w-full flex-col rounded-none bg-primary xs:!h-[600px] xs:!min-w-[80%] xs:!max-w-[80%] xs:rounded-lg "
    >
      <DialogBody {...({} as React.ComponentProps<typeof DialogBody>)} className="dialog-body h-full overflow-auto p-0">
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
