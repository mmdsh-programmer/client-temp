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
import useGetCommentList from "@hooks/core/useGetCommentList";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  version?: IVersion;
}

const Comments = ({ version }: IProps) => {

  const { data: userInfo } = useGetUser();
  const {
    data: getComments,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCommentList(version!.repoId, version!.documentId, 10);

  const listLength = getComments?.pages[0].total;

  return (
    <div className="comment-list flex h-full flex-col">
      {listLength ? (
        <div className="flex h-[calc(100vh-320px)] flex-1 flex-col gap-2 overflow-auto px-5 py-4">
          {getComments?.pages.map((page) => {
            return page.list.map((comment) => {
              return (
                <div className="flex flex-col justify-between gap-4 rounded-lg border-[1px] border-normal bg-gray-50 p-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {comment.user.profileImage ? (
                        <ImageComponent
                          className="h-6 w-6 rounded-full"
                          src={comment.user.profileImage}
                          alt={comment.user.name}
                        />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                          <UserIcon className="h-5 w-5 fill-icon-hover" />
                        </div>
                      )}
                      <Typography
                        {...({} as React.ComponentProps<typeof Typography>)}
                        className="title_t4 text-primary_normal"
                      >
                        {comment.user.name}
                      </Typography>
                    </div>
                    {+comment.user.ssoId === Number(userInfo?.ssoId) ? (
                      <div className="comment-delete flex items-center gap-1">
                        <CommentDelete version={version} comment={comment} />
                      </div>
                    ) : null}
                  </div>
                  <div className="w-full">
                    <Typography
                      {...({} as React.ComponentProps<typeof Typography>)}
                      className="body_b3 break-words"
                    >
                      {comment.text}
                    </Typography>
                  </div>
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
