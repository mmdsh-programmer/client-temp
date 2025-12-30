import React, { useState } from "react";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { Button, DialogBody, Typography } from "@material-tailwind/react";
import DocumentCreateQuestion from "@components/organisms/document/documentQa/documentCreateQuestion";
import DocumentQuestionList from "@components/organisms/document/documentQa/documentQuestionList";
import { AddIcon } from "@components/atoms/icons";
import { useQaStore } from "@store/qa";
import { useDocumentStore } from "@store/document";
import CreateAnswerDialog from "../questionAnswer/createAnswerDialog";
import QuestionEditDialog from "../questionAnswer/questionEditDialog";
import QuestionDeleteDialog from "../questionAnswer/questionDeleteDialog";
import AnswerDeleteDialog from "../questionAnswer/answerDeleteDialog";
import AnswerEditDialog from "../questionAnswer/answerEditDialog";
import PostComment from "@components/organisms/postComment";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentQaDialog = ({ setOpen }: IProps) => {
  const [createQuestion, setCreateQuestion] = useState(false);

  const { selectedDocument } = useDocumentStore();
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
        {createQuestion ? (
          <DocumentCreateQuestion setOpen={setCreateQuestion} />
        ) : (
          <>
            <div className="flex w-full justify-end">
              <Button
                className="items-center gap-2 self-end rounded-lg bg-primary-normal px-4"
                onClick={() => {
                  setCreateQuestion(true);
                }}
                {...({} as React.ComponentProps<typeof Button>)}
              >
                <AddIcon className="h-5 w-5 stroke-white" />
                <Typography
                  {...({} as React.ComponentProps<typeof Typography>)}
                  className="text-xs text-gray-800 text-white"
                >
                  ایجاد پرسش جدید
                </Typography>
              </Button>
            </div>
            <div className="h-ful mt-8 xs:h-[calc(100%-200px)]">
              <DocumentQuestionList />
            </div>
          </>
        )}
      </DialogBody>
    </InfoDialog>
  );
};

export default DocumentQaDialog;
