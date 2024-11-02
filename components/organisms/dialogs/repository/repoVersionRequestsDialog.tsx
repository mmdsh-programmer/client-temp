import React, { useState } from "react";
import TabComponent from "@components/molecules/tab";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { DialogBody } from "@material-tailwind/react";
import DraftRequests from "@components/organisms/versionRequests/draftRequests";
import VersionRequests from "@components/organisms/versionRequests/versionRequests";
import DraftRequestMenu from "@components/molecules/draftRequestMenu";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  acceptDraftAtom,
  rejectDraftAtom,
  acceptVersionAtom,
  rejectVersionAtom,
} from "@atom/releaseDocs";
import AcceptDraftDialog from "../draftRequest/acceptDraftDialog";
import RejectDraftDialog from "../draftRequest/rejectDraftDialog";
import AcceptVersionDialog from "../versionRequest/acceptVersionDialog";
import RejectVersionDialog from "../versionRequest/rejectVersionDialog";
import { repoAtom } from "@atom/repository";

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

  const [openAcceptDraftDialog, setOpenAcceptDraftDialog] =
    useRecoilState(acceptDraftAtom);

  const [openRejectDraftDialog, setOpenRejectDraftDialog] =
    useRecoilState(rejectDraftAtom);

  const [openAcceptVersionDialog, setOpenAcceptVersionDialog] =
    useRecoilState(acceptVersionAtom);

  const [openRejectVersionDialog, setOpenRejectVersionDialog] =
    useRecoilState(rejectVersionAtom);

  const handleClose = () => {
    setOpen(false);
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

  if (openAcceptDraftDialog) {
    return (
      <AcceptDraftDialog
        setOpen={() => {
          return setOpenAcceptDraftDialog(false);
        }}
      />
    );
  }

  if (openRejectDraftDialog) {
    return (
      <RejectDraftDialog
        setOpen={() => {
          return setOpenRejectDraftDialog(false);
        }}
      />
    );
  }

  if (openAcceptVersionDialog) {
    return (
      <AcceptVersionDialog
        setOpen={() => {
          return setOpenAcceptVersionDialog(false);
        }}
      />
    );
  }

  if (openRejectVersionDialog) {
    return (
      <RejectVersionDialog
        setOpen={() => {
          return setOpenRejectVersionDialog(false);
        }}
      />
    );
  }

  return (
    <InfoDialog
      dialogHeader="درخواست‌های تایید نسخه"
      setOpen={handleClose}
      className="xs:!min-w-[80%] xs:!max-w-[80%] flex flex-col !h-full w-full max-w-full xs:!h-[600px] bg-primary rounded-none xs:rounded-lg "
    >
      <DialogBody
        placeholder="dialog body"
        className="p-0 h-full overflow-auto"
      >
        <div className="flex flex-col gap-4 p-4 xs:p-6 h-[calc(100%-160px)] xs:h-[535px] overflow-auto">
          {getRepo?.roleName === "owner" ? (
            <TabComponent
              className=""
              tabList={tabList}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
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
