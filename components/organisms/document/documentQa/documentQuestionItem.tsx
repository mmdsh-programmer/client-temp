import React, { useState } from "react";
import {
  ChatIcon,
  ChevronLeftIcon,
  DeleteIcon,
  EditIcon,
  TickIcon,
  UserIcon,
} from "@components/atoms/icons";
import RenderIf from "@components/atoms/renderIf";
import { IQuestion } from "@interface/qa.interface";
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
import QuestionAnswerLikeAndDislike from "@components/organisms/questionAnswerLike&Dislike";
import QuestionAnswerContentPreview from "@components/organisms/publishFeedback/@publishQuestionAnswer/questionAnswerContentPreview";
import { useQaStore } from "@store/qa";
import { useDocumentStore } from "@store/document";

interface IProps {
  questionItem: IQuestion;
  children?: React.JSX.Element;
}

const DocumentQuestionItem = ({ questionItem, children }: IProps) => {
  const [openCollapse, setOpenCollapse] = useState(false);

  const { selectedDocument } = useDocumentStore();
  const { setOpenAnswer, setOpenEdit, setOpenDelete, setOpenComment, setSelectedQuestion } =
    useQaStore();

  const { data: userInfo } = useGetUser();

  const handleOpenCollapse = () => {
    setOpenCollapse(!openCollapse);
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
          <div className="flex items-center gap-1">
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
              <span className="form_label !text-gray-500">مشاهده بیشتر</span>
              <ChevronLeftIcon
                className={`h-2.5 w-2.5 stroke-gray-500 align-middle transition-all duration-200 ${openCollapse ? "rotate-90" : "-rotate-90"}`}
              />
            </Button>
            <Button
              variant="text"
              className="bullet form_label border-none !p-0 !text-gray-500"
              onClick={() => {
                setSelectedQuestion(questionItem);
                setOpenComment(true);
              }}
              {...({} as React.ComponentProps<typeof Button>)}
              title="مشاهده دیدگاه‌ها"
            >
              <ChatIcon className="block h-4 w-4 scale-125 !fill-gray-500" />
            </Button>
            <RenderIf isTrue={!!userInfo}>
              <Button
                variant="text"
                className="bullet form_label border-none !p-0 !text-gray-500"
                onClick={() => {
                  setSelectedQuestion(questionItem);
                  setOpenAnswer(true);
                }}
                {...({} as React.ComponentProps<typeof Button>)}
                title="پاسخ به پرسش"
              >
                <TickIcon className="block h-4 w-4 !fill-gray-500" />
              </Button>
            </RenderIf>
          </div>
          <RenderIf isTrue={!!userInfo && +userInfo.ssoId === +questionItem.userSrv.ssoId}>
            <Button
              variant="text"
              className="bullet form_label border-none !p-0 !text-gray-500"
              onClick={() => {
                setSelectedQuestion(questionItem);
                setOpenEdit(true);
              }}
              {...({} as React.ComponentProps<typeof Button>)}
              title="ویرایش پرسش"
            >
              <EditIcon className="block h-4 w-4 !stroke-gray-500" />
            </Button>
          </RenderIf>
          <RenderIf isTrue={!!userInfo && +userInfo.ssoId === +questionItem.userSrv.ssoId}>
            <Button
              variant="text"
              className="bullet form_label border-none !p-0 !text-gray-500"
              onClick={() => {
                setSelectedQuestion(questionItem);
                setOpenDelete(true);
              }}
              {...({} as React.ComponentProps<typeof Button>)}
              title="حذف پرسش"
            >
              <DeleteIcon className="block h-4 w-4 !stroke-gray-500" />
            </Button>
          </RenderIf>
          <RenderIf isTrue={!!userInfo}>
            <QuestionAnswerLikeAndDislike
              repoId={selectedDocument!.repoId}
              documentId={selectedDocument!.id}
              item={questionItem}
              wrapperClassName="gap-3 sm:gap-5 mr-auto"
              likeButtonClassName="flex items-center bg-transparent hover:bg-transparent rounded-none p-0 !w-fit"
              dislikeButtonClassName="flex items-center bg-transparent hover:bg-transparent rounded-none p-0 !w-fit"
              iconClassName="w-4 h-4 !stroke-gray-500"
              counterClassName="ml-1 text-base text-gray-500"
              showCounter
            />
          </RenderIf>
        </CardFooter>
      </Card>
      <Collapse open={openCollapse}>
        <div className="pr-3 sm:pr-12">{openCollapse ? children : null}</div>
      </Collapse>
    </>
  );
};

export default DocumentQuestionItem;
