import React from "react";
import { DeleteIcon, EditIcon, UserIcon } from "@components/atoms/icons";
import RenderIf from "@components/atoms/renderIf";
import { IQuestion } from "@interface/qa.interface";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import { FaDateFromTimestamp } from "@utils/index";
import useGetUser from "@hooks/auth/useGetUser";
import QuestionAnswerLikeAndDislike from "@components/organisms/questionAnswerLike&Dislike";
import { useQaStore } from "@store/qa";
import { useDocumentStore } from "@store/document";
import QuestionAnswerContentPreview from "@components/organisms/publishFeedback/publishQuestionAnswer/questionAnswerContentPreview";
import { ERoles } from "@interface/enums";
import { useRepositoryStore } from "@store/repository";
import DocumentAnswerConfirmReject from "./documentAnswerConfirmReject";

interface IProps {
  answerItem: IQuestion;
}

const DocumentAnswerItem = ({ answerItem }: IProps) => {
  const { data: userInfo } = useGetUser();

  const { repo } = useRepositoryStore();
  const { selectedDocument } = useDocumentStore();
  const { setSelectedAnswer, setOpenEditAnswer, setOpenDeleteAnswer } = useQaStore();

  const adminOwnerRole = repo?.roleName === ERoles.admin || repo?.roleName === ERoles.owner;

  return (
    <Card
      shadow={false}
      className="flex w-full flex-col gap-2.5 rounded-none border-b-2 border-r-4 border-solid border-gray-200 border-r-gray-200 bg-secondary px-5 pb-5 pt-[30px]"
      {...({} as React.ComponentProps<typeof Card>)}
    >
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 mt-0 flex items-center justify-between gap-2 pt-0"
        {...({} as React.ComponentProps<typeof CardHeader>)}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <UserIcon className="h-4 w-4" />
          </div>
          <h6 className="max-w-44 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-800 sm:max-w-fit">
            {answerItem.userSrv.name}
          </h6>
          <time
            className="bullet block h-5 overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-gray-500 sm:max-w-fit"
            dateTime={String(answerItem.timestamp)}
          >
            {FaDateFromTimestamp(answerItem.timestamp)}
          </time>
        </div>
      </CardHeader>
      <CardBody className="word-break p-0" {...({} as React.ComponentProps<typeof CardBody>)}>
        <QuestionAnswerContentPreview content={answerItem.content} className="text-xs" />
      </CardBody>
      <CardFooter
        {...({} as React.ComponentProps<typeof CardFooter>)}
        className="flex items-center justify-between gap-2 p-0"
      >
        <div className="flex items-center gap-2">
          <RenderIf isTrue={!!userInfo && +userInfo.ssoId === +answerItem.userSrv.ssoId}>
            <Button
              variant="text"
              className="bullet border-none !p-0 text-[13px] leading-5 text-link"
              onClick={() => {
                setSelectedAnswer(answerItem);
                setOpenEditAnswer(true);
              }}
              {...({} as React.ComponentProps<typeof Button>)}
              title="ویرایش پاسخ"
            >
              <EditIcon className="block h-4 w-4 !stroke-gray-500" />
            </Button>
          </RenderIf>
          <RenderIf isTrue={!!userInfo && +userInfo.ssoId === +answerItem.userSrv.ssoId}>
            <Button
              variant="text"
              className="bullet border-none !p-0 text-[13px] leading-5 text-link"
              onClick={() => {
                setSelectedAnswer(answerItem);
                setOpenDeleteAnswer(true);
              }}
              {...({} as React.ComponentProps<typeof Button>)}
              title="حذف پاسخ"
            >
              <DeleteIcon className="block h-4 w-4 !stroke-gray-500" />
            </Button>
          </RenderIf>
        </div>
        <RenderIf isTrue={!!userInfo && answerItem.enable}>
          <QuestionAnswerLikeAndDislike
            repoId={selectedDocument!.repoId}
            documentId={selectedDocument!.id}
            item={answerItem}
            wrapperClassName="gap-3 sm:gap-5 mr-auto"
            likeButtonClassName="flex items-center bg-transparent hover:bg-transparent rounded-none p-0 !w-fit"
            dislikeButtonClassName="flex items-center bg-transparent hover:bg-transparent rounded-none p-0 !w-fit"
            iconClassName="w-4 h-4 !stroke-gray-500"
            counterClassName="ml-1 text-base text-gray-500"
            showCounter
          />
        </RenderIf>
        <RenderIf isTrue={adminOwnerRole && !answerItem.enable}>
          <DocumentAnswerConfirmReject answerItem={answerItem} />
        </RenderIf>
      </CardFooter>
    </Card>
  );
};

export default DocumentAnswerItem;
