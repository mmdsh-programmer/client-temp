import React, { useState } from "react";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { Button, DialogBody, Typography } from "@material-tailwind/react";
import DocumentCreateQuestion from "@components/organisms/document/documentQa/documentCreateQuestion";
import DocumentQuestionList from "@components/organisms/document/documentQa/documentQuestionList";
import { AddIcon } from "@components/atoms/icons";
import { useQaStore } from "@store/qa";
import CreateAnswerDialog from "../questionAnswer/createAnswerDialog";
import QuestionEditDialog from "../questionAnswer/questionEditDialog";
import QuestionDeleteDialog from "../questionAnswer/questionDeleteDialog";
import AnswerDeleteDialog from "../questionAnswer/answerDeleteDialog";
import AnswerEditDialog from "../questionAnswer/answerEditDialog";
import PostComment from "@components/organisms/postComment";
import DocumentUnconfirmedQuestionList from "@components/organisms/document/documentQa/documentUnconfirmedQuestionList";
import TabComponent from "@components/molecules/tab";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore } from "@store/document";
import { ERoles } from "@interface/enums";
import RenderIf from "@components/atoms/renderIf";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentQaDialog = ({ setOpen }: IProps) => {
  const [createQuestion, setCreateQuestion] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("تاییدشده‌ها");

  const { repo } = useRepositoryStore();
  const { selectedDocument } = useDocumentStore();

  const adminOwnerRole =
    repo?.roleName === ERoles.admin ||
    repo?.roleName === ERoles.owner ||
    selectedDocument?.accesses?.[0] === "admin";

  const {
    selectedQuestion,
    selectedAnswer,
    openAnswer,
    openEdit,
    openDelete,
    openComment,
    openDeleteAnswer,
    openEditAnswer,
    setSelectedQuestion,
    setSelectedAnswer,
    setOpenAnswer,
    setOpenComment,
    setOpenDelete,
    setOpenEdit,
    setOpenDeleteAnswer,
    setOpenEditAnswer,
  } = useQaStore();

  const handleClose = () => {
    setOpen(false);
    setCreateQuestion(false);
    setOpenAnswer(false);
    setOpenEdit(false);
    setOpenDelete(false);
    setOpenComment(false);
    setSelectedAnswer(null);
    setSelectedQuestion(null);
  };

  if (openAnswer && selectedQuestion) {
    return (
      <CreateAnswerDialog
        questionItem={selectedQuestion}
        setOpen={() => {
          return setOpenAnswer(!openAnswer);
        }}
      />
    );
  }

  if (openEdit && selectedQuestion) {
    return (
      <QuestionEditDialog
        question={selectedQuestion}
        setOpen={() => {
          return setOpenEdit(!openEdit);
        }}
      />
    );
  }

  if (openDelete && selectedQuestion) {
    return (
      <QuestionDeleteDialog
        question={selectedQuestion}
        setOpen={() => {
          return setOpenDelete(!openDelete);
        }}
      />
    );
  }

  if (openComment) {
    return (
      <PostComment
        setOpen={() => {
          return setOpenComment(!openComment);
        }}
      />
    );
  }

  if (openDeleteAnswer && selectedAnswer) {
    return (
      <AnswerDeleteDialog
        answer={selectedAnswer}
        setOpen={() => {
          return setOpenDeleteAnswer(!openDeleteAnswer);
        }}
      />
    );
  }

  if (openEditAnswer && selectedAnswer) {
    return (
      <AnswerEditDialog
        answer={selectedAnswer}
        setOpen={() => {
          return setOpenEditAnswer(!openEditAnswer);
        }}
      />
    );
  }

  const tabList = [
    {
      tabTitle: "تاییدشده‌ها",
      tabContent:
        // eslint-disable-next-line no-nested-ternary
        activeTab === "تاییدشده‌ها" ? (
          createQuestion ? (
            <DocumentCreateQuestion setOpen={setCreateQuestion} />
          ) : (
            <>
              <div className="flex w-full justify-end">
                <Button
                  className="items-center gap-2 self-end rounded-lg bg-primary-normal px-4"
                  onClick={() => {
                    return setCreateQuestion(true);
                  }}
                  {...({} as React.ComponentProps<typeof Button>)}
                >
                  <AddIcon className="h-5 w-5 stroke-white" />
                  <Typography
                    {...({} as React.ComponentProps<typeof Typography>)}
                    className="text-xs text-white"
                  >
                    ایجاد پرسش جدید
                  </Typography>
                </Button>
              </div>
              <div className="mt-8 h-full xs:h-[calc(100%-200px)]">
                <DocumentQuestionList />
              </div>
            </>
          )
        ) : null,
    },
    {
      tabTitle: "تاییدنشده‌ها",
      tabContent:
        activeTab === "تاییدنشده‌ها" ? (
          <div className="mt-8 h-full">
            <DocumentUnconfirmedQuestionList />
          </div>
        ) : null,
    },
  ];

  return (
    <InfoDialog
      dialogHeader="پرسش و پاسخ روی سند"
      setOpen={handleClose}
      className="document-Qa-dialog flex !h-full w-full max-w-full flex-col !overflow-auto rounded-none bg-primary xs:!h-[550px] xs:!min-w-[750px] xs:!max-w-[750px] xs:rounded-lg"
    >
      <DialogBody
        placeholder="flex flex-col gap-10"
        {...({} as Omit<React.ComponentProps<typeof DialogBody>, "placeholder">)}
      >
        <RenderIf isTrue={adminOwnerRole}>
          <TabComponent
            tabList={tabList}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabContentClassName=""
            headerClassName="mb-4 h-full"
          />
        </RenderIf>
        <RenderIf isTrue={!adminOwnerRole}>
          {createQuestion ? (
            <DocumentCreateQuestion setOpen={setCreateQuestion} />
          ) : (
            <>
              <div className="flex w-full justify-end">
                <Button
                  className="items-center gap-2 self-end rounded-lg bg-primary-normal px-4"
                  onClick={() => {
                    return setCreateQuestion(true);
                  }}
                  {...({} as React.ComponentProps<typeof Button>)}
                >
                  <AddIcon className="h-5 w-5 stroke-white" />
                  <Typography
                    {...({} as React.ComponentProps<typeof Typography>)}
                    className="text-xs text-white"
                  >
                    ایجاد پرسش جدید
                  </Typography>
                </Button>
              </div>
              <div className="mt-8 h-full xs:h-[calc(100%-200px)]">
                <DocumentQuestionList />
              </div>
            </>
          )}
        </RenderIf>
      </DialogBody>
    </InfoDialog>
  );
};

export default DocumentQaDialog;
