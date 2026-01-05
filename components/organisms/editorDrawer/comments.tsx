/* eslint-disable no-nested-ternary */
import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import CommentCreate from "./commentCreate";
import CommentDelete from "./commentDelete";
import { IVersion } from "@interface/version.interface";
import ImageComponent from "@components/atoms/image";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { Typography } from "@material-tailwind/react";
import { UserIcon } from "@components/atoms/icons";
import useGetCommentList from "@hooks/comment/useGetCommentList";
import useGetUser from "@hooks/auth/useGetUser";
import { Spinner } from "@components/atoms/spinner";

interface IProps {
  version?: IVersion;
}

const Comments = ({ version }: IProps) => {
  const { data: userInfo } = useGetUser();
  const {
    data: getComments,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCommentList(version!.repoId, version!.documentId, 10);

  const listLength = getComments?.pages[0].total;

  return (
    <div className="comment-list flex h-full flex-col">
      {isLoading ? (
        <div className="mt-4 flex h-full justify-center">
          <Spinner className="h-5 w-5 text-primary" />
        </div>
      ) : listLength ? (
        <div className="flex h-[calc(100vh-320px)] flex-1 flex-col gap-2 overflow-auto px-5 py-4">
          {getComments?.pages.map((page) => {
            return page.list.map((comment) => {
              return (
                <div className="flex flex-col justify-between gap-4 rounded-lg border-[1px] border-normal bg-gray-50 p-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
                        {comment.user.profileImage ? (
                          <ImageComponent
                            className="h-4 w-4 rounded-full"
                            src={comment.user.profileImage}
                            alt={comment.user.name}
                          />
                        ) : (
                          <UserIcon className="h-4 w-4" />
                        )}
                      </div>
                      <h6 className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-800 sm:max-w-fit">
                        {comment.user.name}
                      </h6>
                      {!comment.confirmed ? (
                        <Typography
                          className="text-[9px] text-error"
                          {...({} as React.ComponentProps<typeof Typography>)}
                        >
                          (تایید نشده)
                        </Typography>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full">
                    <Typography
                      {...({} as React.ComponentProps<typeof Typography>)}
                      className="body_b3 break-words"
                    >
                      {comment.text}
                    </Typography>
                  </div>
                  <RenderIf isTrue={!!userInfo && +userInfo.ssoId === +comment.user.ssoId}>
                    <div className="comment-delete flex items-center gap-1">
                      <CommentDelete version={version} comment={comment} />
                    </div>
                  </RenderIf>
                </div>
              );
            });
          })}
          <RenderIf isTrue={!!hasNextPage}>
            <div className="flex w-full justify-center py-2">
              <LoadMore
                className="self-center text-[10px] !font-normal text-primary_normal underline !shadow-none xl:bg-primary"
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
              />
            </div>
          </RenderIf>
        </div>
      ) : (
        <EmptyList type={EEmptyList.COMMENTS} />
      )}
      <CommentCreate version={version} />
    </div>
  );
};

export default Comments;
