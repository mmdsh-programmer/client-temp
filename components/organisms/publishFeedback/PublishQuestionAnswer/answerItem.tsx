import React, { useState } from "react";
import { DeleteIcon, EditIcon } from "@components/atoms/icons";
import RenderIf from "@components/atoms/renderIf";
import { IQuestion } from "@interface/qa.interface";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import { FaDateFromTimestamp } from "@utils/index";
import useGetUser from "@hooks/auth/useGetUser";
import QuestionAnswerContentPreview from "./questionAnswerContentPreview";
import AnswerDeleteDialog from "@components/organisms/dialogs/publish/answerDeleteDialog";
import QuestionAnswerLikeAndDislike from "@components/organisms/questionAnswerLike&Dislike";
import AnswerEditDialog from "@components/organisms/dialogs/publish/answerEditDialog";

interface IProps {
  answerItem: IQuestion;
  repoId: number;
  documentId: number;
}

const AnswerItem = ({ answerItem, repoId, documentId }: IProps) => {
  const { data: userInfo } = useGetUser();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  return (
    <>
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
            <h6 className="max-w-44 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-gray-800 sm:max-w-fit">
              {answerItem.userSrv.name}
            </h6>
            <time
              className="bullet block max-w-16 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500 sm:max-w-fit"
              dateTime={String(answerItem.timestamp)}
            >
              {FaDateFromTimestamp(answerItem.timestamp)}
            </time>
          </div>
        </CardHeader>
        <CardBody className="word-break p-0" {...({} as React.ComponentProps<typeof CardBody>)}>
          <QuestionAnswerContentPreview content={answerItem.content} className="text-sm" />
        </CardBody>
        <CardFooter
          {...({} as React.ComponentProps<typeof CardFooter>)}
          className="flex items-center justify-between gap-2 p-0"
        >
          <RenderIf isTrue={!!userInfo && +userInfo.ssoId === +answerItem.userSrv.ssoId}>
            <Button
              variant="text"
              className="bullet border-none !p-0 text-[13px] leading-5 text-link"
              onClick={handleOpenEdit}
              {...({} as React.ComponentProps<typeof Button>)}
            >
              <span className="hidden sm:block">ویرایش پاسخ</span>
              <EditIcon className="block h-4 w-4 !stroke-gray-500 sm:hidden" />
            </Button>
          </RenderIf>
          <RenderIf isTrue={!!userInfo && +userInfo.ssoId === +answerItem.userSrv.ssoId}>
            <Button
              variant="text"
              className="bullet border-none !p-0 text-[13px] leading-5 text-link"
              onClick={handleOpenDelete}
              {...({} as React.ComponentProps<typeof Button>)}
            >
              <span className="hidden sm:block">حذف پاسخ</span>
              <DeleteIcon className="block h-4 w-4 !stroke-gray-500 sm:hidden" />
            </Button>
          </RenderIf>
          <RenderIf isTrue={!!userInfo}>
            <QuestionAnswerLikeAndDislike
              item={answerItem}
              wrapperClassName="gap-3 sm:gap-5 mr-auto"
              likeButtonClassName="flex items-center bg-transparent hover:bg-transparent rounded-none p-0 !w-fit"
              dislikeButtonClassName="flex items-center bg-transparent hover:bg-transparent rounded-none p-0 !w-fit"
              iconClassName="w-4 h-4 sm:w-7 sm:h-7 !stroke-gray-500"
              counterClassName="ml-1 text-base text-gray-500"
              showCounter
            />
          </RenderIf>
        </CardFooter>
      </Card>

      <RenderIf isTrue={openEdit}>
        <AnswerEditDialog
          repoId={repoId}
          documentId={documentId}
          answer={answerItem}
          setOpen={() => {
            return setOpenEdit(!openEdit);
          }}
        />
      </RenderIf>
      <RenderIf isTrue={openDelete}>
        <AnswerDeleteDialog
          repoId={repoId}
          documentId={documentId}
          answer={answerItem}
          setOpen={() => {
            return setOpenDelete(!openDelete);
          }}
        />
      </RenderIf>
    </>
  );
};

export default AnswerItem;
