import React from "react";
import { DeleteIcon, EditIcon, UserIcon } from "@components/atoms/icons";
import RenderIf from "@components/atoms/renderIf";
import { IQuestion } from "@interface/qa.interface";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { FaDateFromTimestamp } from "@utils/index";
import useGetUser from "@hooks/auth/useGetUser";
import QuestionAnswerContentPreview from "@components/organisms/publishFeedback/publishQuestionAnswer/questionAnswerContentPreview";
import { useQaStore } from "@store/qa";
import DocumentQuestionConfirmReject from "./documentQuestionConfirmReject";
import Image from "next/image";

interface IProps {
  questionItem: IQuestion;
}

const DocumentUnconfirmedQuestionItem = ({ questionItem }: IProps) => {
  const { setOpenEdit, setOpenDelete, setSelectedQuestion } = useQaStore();

  const { data: userInfo } = useGetUser();

  return (
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
        <div className="flex items-center gap-2">
          <Typography className="text-sm" {...({} as React.ComponentProps<typeof Typography>)}>
            {questionItem.name}
          </Typography>
          {!questionItem.enable ? (
            <Typography
              className="text-xs text-error"
              {...({} as React.ComponentProps<typeof Typography>)}
            >
              (تایید نشده)
            </Typography>
          ) : null}
        </div>
        <div className="flex items-center gap-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            {questionItem.userSrv.profileImage ? (
              <Image
                src={questionItem.userSrv.profileImage}
                alt={questionItem.userSrv.name}
                height={100}
                width={100}
              />
            ) : (
              <UserIcon className="h-4 w-4" />
            )}
          </div>
          <h6 className="max-w-44 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-800 sm:max-w-fit">
            {questionItem.userSrv.name}
          </h6>
          <time
            className="bullet block overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-gray-500 sm:max-w-fit"
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
        </div>

        <DocumentQuestionConfirmReject questionItem={questionItem} />
      </CardFooter>
    </Card>
  );
};

export default DocumentUnconfirmedQuestionItem;
