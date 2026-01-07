import React, { useState } from "react";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { Button, DialogBody, Typography } from "@material-tailwind/react";
import { AddIcon } from "@components/atoms/icons";
import TabComponent from "@components/molecules/tab";
import DocumentCommentList from "@components/organisms/document/documentComment/documentCommentList";
import DocumentCreateComment from "@components/organisms/document/documentComment/documentCreateComment";
import DocumentUnconfirmedCommentList from "@components/organisms/document/documentComment/documentUnconfirmedCommentList";
import { useRepositoryStore } from "@store/repository";
import { ERoles } from "@interface/enums";
import { useDocumentStore } from "@store/document";
import RenderIf from "@components/atoms/renderIf";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentCommentsDialog = ({ setOpen }: IProps) => {
  const [createComment, setCreateComment] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("تایید شده‌ها");

  const { repo } = useRepositoryStore();
  const { selectedDocument } = useDocumentStore();

  const adminOwnerRole =
    repo?.roleName === ERoles.admin ||
    repo?.roleName === ERoles.owner ||
    selectedDocument?.accesses?.includes("admin");

  const handleClose = () => {
    setOpen(false);
    setCreateComment(false);
  };

  const tabList = [
    {
      tabTitle: "تایید شده‌ها",
      tabContent:
        // eslint-disable-next-line no-nested-ternary
        activeTab === "تایید شده‌ها" ? (
          createComment ? (
            <DocumentCreateComment setOpen={setCreateComment} />
          ) : (
            <>
              <div className="flex w-full justify-end">
                <Button
                  className="items-center gap-2 self-end rounded-lg bg-primary-normal px-4"
                  onClick={() => {
                    return setCreateComment(true);
                  }}
                  {...({} as React.ComponentProps<typeof Button>)}
                >
                  <AddIcon className="h-5 w-5 stroke-white" />
                  <Typography
                    {...({} as React.ComponentProps<typeof Typography>)}
                    className="text-xs text-white"
                  >
                    ایجاد نظر جدید
                  </Typography>
                </Button>
              </div>
              <div className="h-full xs:h-[calc(100%-200px)]">
                <DocumentCommentList />
              </div>
            </>
          )
        ) : null,
    },
    {
      tabTitle: "تاییدنشده‌ها",
      tabContent:
        activeTab === "تاییدنشده‌ها" ? (
          <div className="h-full">
            <DocumentUnconfirmedCommentList />
          </div>
        ) : null,
    },
  ];

  return (
    <InfoDialog
      dialogHeader="نظرات روی سند"
      setOpen={handleClose}
      className="document-Qa-dialog flex !h-full w-full max-w-full flex-col !overflow-auto rounded-none bg-primary xs:!h-[550px] xs:!min-w-[750px] xs:!max-w-[750px] xs:rounded-lg"
    >
      <DialogBody
        placeholder="flex flex-col gap-10"
        {...({} as Omit<React.ComponentProps<typeof DialogBody>, "placeholder">)}
      >
        <RenderIf isTrue={!!adminOwnerRole}>
          <TabComponent
            tabList={tabList}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabContentClassName=""
            headerClassName="mb-4 h-full"
          />
        </RenderIf>
        <RenderIf isTrue={!adminOwnerRole}>
          {createComment ? (
            <DocumentCreateComment setOpen={setCreateComment} />
          ) : (
            <>
              <div className="flex w-full justify-end">
                <Button
                  className="items-center gap-2 self-end rounded-lg bg-primary-normal px-4"
                  onClick={() => {
                    return setCreateComment(true);
                  }}
                  {...({} as React.ComponentProps<typeof Button>)}
                >
                  <AddIcon className="h-5 w-5 stroke-white" />
                  <Typography
                    {...({} as React.ComponentProps<typeof Typography>)}
                    className="text-xs text-white"
                  >
                    ایجاد نظر جدید
                  </Typography>
                </Button>
              </div>
              <div className="h-full xs:h-[calc(100%-200px)]">
                <DocumentCommentList />
              </div>
            </>
          )}
        </RenderIf>
      </DialogBody>
    </InfoDialog>
  );
};

export default DocumentCommentsDialog;
