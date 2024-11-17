import React, { useState } from "react";
import { ChevronLeftIcon } from "@components/atoms/icons";
import RenderIf from "@components/atoms/renderIf";
import AnswerDialog from "@components/organisms/dialogs/publish/answerDialog";
import { IQAList } from "@interface/qa.interface";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Collapse,
} from "@material-tailwind/react";
import { FaDateFromTimestamp } from "@utils/index";
import useGetUser from "@hooks/auth/useGetUser";
import QuestionAnswerContentPreview from "./questionAnswerContentPreview";
import PublishQuestionAnswerEditDialog from "@components/organisms/dialogs/publish/editDialog";
import QuestionAnswerLikeAndDislike from "@components/organisms/questionAnswerLike&Dislike";
import CommentDialog from "@components/organisms/dialogs/publish/commentDialog";

interface IProps {
  questionItem: IQAList;
  parentPostId: number;
  children?: JSX.Element;
  isAnswer?: boolean;
}

const QuestionAnswerItem = ({
  questionItem,
  children,
  isAnswer,
  parentPostId,
}: IProps) => {
  const { data: userInfo } = useGetUser();
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openAnswer, setOpenAnswer] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCommentsDialog, setOpenCommentsDialog] = useState(false);

  const handleOpenCollapse = () => {
    setOpenCollapse(!openCollapse);
  };

  const handleOpenAnswer = () => {
    setOpenAnswer(true);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleOpenCommentsDialog = () => {
    setOpenCommentsDialog(true);
  };

  return (
    <>
      <Card
        shadow={false}
        className={`w-full pt-[30px] pb-5 px-5 flex flex-col gap-2.5 border-b-2 border-solid border-gray-200 rounded-none ${isAnswer ? "border-r-4 border-r-gray-200 bg-secondary" : "bg-white"}`}
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="flex items-center justify-between gap-2 pt-0 mt-0 mx-0"
        >
          <div className="flex items-center gap-2">
            <h6 className="text-sm text-gray-800 font-bold">
              {questionItem.userSrv.name}
            </h6>
            <span className="text-lg text-gray-500">{"\u2022"}</span>
            <time
              className="text-xs text-gray-500"
              dateTime={FaDateFromTimestamp(questionItem.timestamp)}
            >
              {FaDateFromTimestamp(questionItem.timestamp)}
            </time>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <QuestionAnswerContentPreview
            content={questionItem.content}
            className="text-sm"
          />
        </CardBody>
        <CardFooter className="flex items-center p-0 gap-2 justify-between">
          <RenderIf isTrue={!isAnswer}>
            <div className="flex items-center gap-2">
              <Button
                ripple={false}
                variant="text"
                className="border-none !p-0 flex gap-1 items-center"
                onClick={handleOpenCollapse}
              >
                <span className="text-[13px] leading-5 text-gray-500">
                  مشاهده بیشتر
                </span>

                <ChevronLeftIcon
                  className={`align-middle w-2.5 h-2.5 stroke-gray-500 transition-all duration-200 ${openCollapse ? "rotate-90" : "-rotate-90"}`}
                />
              </Button>

              <RenderIf isTrue={!!userInfo}>
                <>
                  <span className="text-lg text-gray-500">{"\u2022"}</span>
                  <Button
                    variant="text"
                    className="border-none !p-0 text-[13px] leading-5 text-link"
                    onClick={handleOpenCommentsDialog}
                  >
                    مشاهده دیدگاه ها
                  </Button>
                  <span className="text-lg text-gray-500">{"\u2022"}</span>
                  <Button
                    variant="text"
                    className="border-none !p-0 text-[13px] leading-5 text-link"
                    onClick={handleOpenAnswer}
                  >
                    پاسخ به پرسش
                  </Button>
                </>
              </RenderIf>
            </div>
          </RenderIf>

          <RenderIf
            isTrue={
              !!userInfo && +userInfo.ssoId === +questionItem.userSrv.ssoId
            }
          >
            <>
              <span className="text-lg text-gray-500">{"\u2022"}</span>
              <Button
                variant="text"
                className="border-none !p-0 text-[13px] leading-5 text-link"
                onClick={handleOpenEdit}
              >
                {isAnswer ? "ویرایش پاسخ" : "ویرایش پرسش"}
              </Button>
            </>
          </RenderIf>

          <RenderIf isTrue={!!userInfo}>
            <QuestionAnswerLikeAndDislike
              postInfo={questionItem}
              parentPostId={parentPostId}
              wrapperClassName="gap-5 mr-auto"
              likeButtonClassName="flex items-center bg-transparent hover:bg-transparent rounded-none p-0 !w-fit"
              dislikeButtonClassName="flex items-center bg-transparent hover:bg-transparent rounded-none p-0 !w-fit"
              iconClassName="w-7 h-7 !stroke-gray-500"
              counterClassName="ml-1 text-base text-gray-500"
              showCounter
            />
          </RenderIf>
        </CardFooter>
      </Card>

      <RenderIf isTrue={!isAnswer}>
        <Collapse open={openCollapse}>
          <div className="pr-3 sm:pr-12">{openCollapse ? children : null}</div>
        </Collapse>
      </RenderIf>

      <RenderIf isTrue={!isAnswer && openAnswer}>
        <AnswerDialog
          postId={questionItem.id}
          setOpen={() => {
            return setOpenAnswer(!openAnswer);
          }}
        />
      </RenderIf>

      <RenderIf isTrue={openEdit}>
        <PublishQuestionAnswerEditDialog
          item={questionItem}
          isAnswer={isAnswer}
          setOpen={() => {
            return setOpenEdit(!openEdit);
          }}
        />
      </RenderIf>

      <RenderIf isTrue={openCommentsDialog}>
        <CommentDialog
          postId={questionItem.id}
          setOpen={() => {
            return setOpenCommentsDialog(!openCommentsDialog);
          }}
        />
      </RenderIf>
    </>
  );
};

export default QuestionAnswerItem;
