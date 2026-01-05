import React from "react";
import RenderIf from "@components/atoms/renderIf";
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
import { ICommentItem } from "@interface/version.interface";
import { DeleteIcon, UserIcon } from "@components/atoms/icons";
import { toast } from "react-toastify";
import useDeleteComment from "@hooks/comment/useDeleteComment";
import { useDocumentStore } from "@store/document";
import DocumentCommentConfirmReject from "./documentCommentConfirmReject";
import { useRepositoryStore } from "@store/repository";
import { ERoles } from "@interface/enums";
import { Spinner } from "@components/atoms/spinner";

interface IProps {
  commentItem: ICommentItem;
}

const DocumentUnconfirmedCommentItem = ({ commentItem }: IProps) => {
  const { repo } = useRepositoryStore();
  const { selectedDocument } = useDocumentStore();

  const adminOwnerRole =
    repo?.roleName === ERoles.admin ||
    repo?.roleName === ERoles.owner ||
    selectedDocument?.accesses?.[0] === "admin";

  const { data: userInfo } = useGetUser();
  const deleteComment = useDeleteComment();

  const handleDeleteComment = () => {
    deleteComment.mutate({
      repoId: selectedDocument!.repoId,
      docId: selectedDocument!.id,
      commentId: commentItem.id,
      callBack: () => {
        toast.success("دیدگاه حذف شد.");
      },
    });
  };

  return (
    <Card
      {...({} as React.ComponentProps<typeof Card>)}
      shadow={false}
      className="flex w-full flex-col gap-2.5 rounded-none border-b-2 border-solid border-gray-200 bg-white px-5 pb-5 pt-[30px]"
    >
      <CardHeader
        {...({} as React.ComponentProps<typeof CardHeader>)}
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 mt-0 flex items-center justify-between gap-2 pt-0"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <UserIcon className="h-4 w-4" />
          </div>
          <h6 className="max-w-44 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-800 sm:max-w-fit">
            {commentItem.creatorUserName}
          </h6>
          <Typography
            className="text-xs text-error"
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            (تایید نشده)
          </Typography>
        </div>
        <div className="flex items-center gap-1">
          <time
            className="block overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-gray-500 sm:max-w-fit"
            dateTime={String(commentItem.createdAt)}
          >
            {FaDateFromTimestamp(Number(commentItem.createdAt))}
          </time>
        </div>
      </CardHeader>
      <CardBody {...({} as React.ComponentProps<typeof CardBody>)} className="p-0">
        <Typography
          {...({} as React.ComponentProps<typeof Typography>)}
          className="word-break text-sm"
        >
          {commentItem.content}
        </Typography>
      </CardBody>
      <CardFooter
        {...({} as React.ComponentProps<typeof CardFooter>)}
        className="flex items-center justify-between gap-2 p-0"
      >
        <RenderIf isTrue={!!userInfo && +userInfo.ssoId === +commentItem.creatorUserSSOID}>
          {deleteComment.isPending ? (
            <Spinner className="h-4 w-4" />
          ) : (
            <Button
              className="!h-fit !w-fit border-none bg-transparent !p-0 text-[13px] leading-5 text-link"
              onClick={handleDeleteComment}
              loading={deleteComment.isPending}
              disabled={deleteComment.isPending}
              title="حذف نظر"
              {...({} as React.ComponentProps<typeof Button>)}
            >
              <DeleteIcon className="block h-4 w-4 !fill-icon-hover" />
            </Button>
          )}
        </RenderIf>
        <div className="flex w-full justify-end">
          <DocumentCommentConfirmReject commentItem={commentItem} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocumentUnconfirmedCommentItem;
