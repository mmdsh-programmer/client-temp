import React, { useState } from "react";
import {
  ChatIcon,
  ChevronLeftIcon,
  DeleteIcon,
  EditIcon,
  RevertIcon,
  UserIcon,
} from "@components/atoms/icons";
import RenderIf from "@components/atoms/renderIf";
import { IQuestion, IQuestionMetadata } from "@interface/qa.interface";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Collapse,
  Typography,
} from "@material-tailwind/react";
import { FaDateFromTimestamp } from "@utils/index";
import useGetUser from "@hooks/auth/useGetUser";
import QuestionAnswerContentPreview from "./questionAnswerContentPreview";
import QuestionAnswerLikeAndDislike from "@components/organisms/questionAnswerLike&Dislike";
import QuestionDeleteDialog from "@components/organisms/dialogs/questionAnswer/questionDeleteDialog";
import QuestionEditDialog from "@components/organisms/dialogs/questionAnswer/questionEditDialog";
import CreateAnswerDialog from "@components/organisms/dialogs/questionAnswer/createAnswerDialog";
import PostComment from "@components/organisms/postComment";
import { useQaStore } from "@store/qa";

interface IProps {
  questionItem: IQuestion;
  children?: React.JSX.Element;
}

const QuestionItem = ({ questionItem, children }: IProps) => {
  const { data: userInfo } = useGetUser();
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openAnswer, setOpenAnswer] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCommentsDialog, setOpenCommentsDialog] = useState(false);

  const { setSelectedQuestion } = useQaStore();

  const questionMetadata = JSON.parse(questionItem.metadata) as IQuestionMetadata;
  const { repoId, documentId } = questionMetadata;

  const handleOpenCollapse = () => {
    setOpenCollapse(!openCollapse);
  };

  const handleOpenAnswer = () => {
    setOpenAnswer(true);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleOpenCommentsDialog = () => {
    setOpenCommentsDialog(true);
  };

  return (
    <>
      <Card
        shadow={false}
        className="flex w-full flex-col gap-2.5 rounded-none border-b-2 border-solid border-gray-200 bg-white px-5 pb-5 pt-[30px]"
        {...({} as React.ComponentProps<typeof Card>)}
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 mt-0 flex items-center justify-between rounded-none pt-0"
          {...({} as React.ComponentProps<typeof CardHeader>)}
        >
          <Typography className="text-sm" {...({} as React.ComponentProps<typeof Typography>)}>
            {questionItem.name}
          </Typography>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
              <UserIcon className="h-4 w-4" />
            </div>
            <h6 className="max-w-44 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-800 sm:max-w-fit">
              {questionItem.userSrv.name}
            </h6>
            <time
              className="bullet block h-5 overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-gray-500 sm:max-w-fit"
              dateTime={String(questionItem.timestamp)}
            >
              {FaDateFromTimestamp(questionItem.timestamp)}
            </time>
          </div>
        </CardHeader>
        <CardBody className="word-break p-0" {...({} as React.ComponentProps<typeof CardBody>)}>
          <QuestionAnswerContentPreview content={questionItem.content} className="text-xs" />
        </CardBody>
        <CardFooter
          {...({} as React.ComponentProps<typeof CardFooter>)}
          className="flex items-center justify-between gap-2 p-0"
        >
          <div className="flex items-center gap-2">
            <Button
              ripple={false}
              variant="text"
              className="flex items-center gap-1 border-none !p-0"
              onClick={handleOpenCollapse}
              {...({} as React.ComponentProps<typeof Button>)}
            >
              <span className="text-[13px] leading-5 text-gray-500">مشاهده بیشتر</span>

              <ChevronLeftIcon
                className={`h-2.5 w-2.5 stroke-gray-500 align-middle transition-all duration-200 ${openCollapse ? "rotate-90" : "-rotate-90"}`}
              />
            </Button>
            <RenderIf isTrue={!!userInfo && questionItem.enable}>
              <Button
                variant="text"
                className="bullet border-none !p-0 text-[13px] leading-5 text-link"
                onClick={() => {
                  setSelectedQuestion(questionItem);
                  handleOpenCommentsDialog();
                }}
                {...({} as React.ComponentProps<typeof Button>)}
              >
                <span className="hidden sm:block">مشاهده دیدگاه‌ها</span>
                <ChatIcon className="block h-4 w-4 scale-125 !fill-gray-500 sm:hidden" />
              </Button>
            </RenderIf>
            <RenderIf isTrue={!!userInfo && questionItem.enable}>
              <Button
                variant="text"
                className="bullet border-none !p-0 text-[13px] leading-5 text-link"
                onClick={() => {
                  handleOpenAnswer();
                }}
                {...({} as React.ComponentProps<typeof Button>)}
              >
                <span className="hidden sm:block">پاسخ به پرسش</span>
                <RevertIcon className="block h-4 w-4 !fill-gray-500 sm:hidden" />
              </Button>
            </RenderIf>
            <RenderIf isTrue={!!userInfo && +userInfo.ssoId === +questionItem.userSrv.ssoId}>
              <Button
                variant="text"
                className="bullet border-none !p-0 text-[13px] leading-5 text-link"
                onClick={() => {
                  handleOpenEdit();
                }}
                {...({} as React.ComponentProps<typeof Button>)}
              >
                <span className="hidden sm:block">ویرایش پرسش</span>
                <EditIcon className="block h-4 w-4 !stroke-gray-500 sm:hidden" />
              </Button>
            </RenderIf>
            <RenderIf isTrue={!!userInfo && +userInfo.ssoId === +questionItem.userSrv.ssoId}>
              <Button
                variant="text"
                className="bullet border-none !p-0 text-[13px] leading-5 text-link"
                onClick={handleOpenDelete}
                {...({} as React.ComponentProps<typeof Button>)}
              >
                <span className="hidden sm:block">حذف پرسش</span>
                <DeleteIcon className="block h-4 w-4 !stroke-gray-500 sm:hidden" />
              </Button>
            </RenderIf>
          </div>
          <RenderIf isTrue={!!userInfo && questionItem.enable}>
            <QuestionAnswerLikeAndDislike
              repoId={repoId}
              documentId={documentId}
              item={questionItem}
              wrapperClassName="gap-3 sm:gap-5 mr-auto"
              likeButtonClassName="flex items-center bg-transparent hover:bg-transparent rounded-none p-0 !w-fit"
              dislikeButtonClassName="flex items-center bg-transparent hover:bg-transparent rounded-none p-0 !w-fit"
              iconClassName="w-4 h-4 sm:w-6 sm:h-6 !stroke-gray-500"
              counterClassName="ml-1 text-base text-gray-500"
              showCounter
            />
          </RenderIf>
        </CardFooter>
      </Card>
      <Collapse open={openCollapse}>
        <div className="pr-3 sm:pr-12">{openCollapse ? children : null}</div>
      </Collapse>
      <RenderIf isTrue={openAnswer}>
        <CreateAnswerDialog
          questionItem={questionItem}
          setOpen={() => {
            return setOpenAnswer(!openAnswer);
          }}
        />
      </RenderIf>
      <RenderIf isTrue={openEdit}>
        <QuestionEditDialog
          question={questionItem}
          setOpen={() => {
            return setOpenEdit(!openEdit);
          }}
        />
      </RenderIf>
      <RenderIf isTrue={openDelete}>
        <QuestionDeleteDialog
          question={questionItem}
          setOpen={() => {
            return setOpenDelete(!openDelete);
          }}
        />
      </RenderIf>
      <RenderIf isTrue={openCommentsDialog}>
        <PostComment
          setOpen={() => {
            return setOpenCommentsDialog(!openCommentsDialog);
          }}
        />
      </RenderIf>
    </>
  );
};

export default QuestionItem;
