import React from "react";
import { UserIcon } from "@components/atoms/icons";
import ImageComponent from "@components/atoms/image";
import useGetCommentList from "@hooks/core/useGetCommentList";
import { IVersion } from "@interface/version.interface";
import { Typography } from "@material-tailwind/react";
import CommentDelete from "./commentDelete";
import CommentCreate from "./commentCreate";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
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
  } = useGetCommentList(version!.postId, 10);

  const listLength = getComments?.pages[0].total;

  return (
    <div className="comment-list flex flex-col h-full">
      {listLength ? (
        <div className="flex flex-col flex-1 h-[calc(100vh-320px)] gap-2 px-5 py-4 overflow-auto">
          {getComments?.pages.map((page) => {
            return page.list.map((comment) => {
              return (
                <div className="p-2 flex flex-col justify-between gap-4 bg-gray-50 border-[1px] border-normal rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      {comment.user.profileImage ? (
                        <ImageComponent
                          className="h-6 w-6 rounded-full"
                          src={comment.user.profileImage}
                          alt={comment.user.name}
                        />
                      ) : (
                        <div className="h-8 w-8 flex justify-center items-center bg-white rounded-full">
                          <UserIcon className="h-5 w-5 fill-icon-hover" />
                        </div>
                      )}
                      <Typography className="title_t4 text-primary">
                        {comment.user.name}
                      </Typography>
                    </div>
                    {comment.user.ssoId === userInfo?.ssoId ? (
                      <div className="comment-delete flex items-center gap-1">
                        <CommentDelete version={version} comment={comment} />
                      </div>
                    ) : null}
                  </div>
                  <div className="w-full">
                    <Typography className="body_b3 break-words">
                      {comment.text}
                    </Typography>
                  </div>
                </div>
              );
            });
          })}
          <RenderIf isTrue={!!hasNextPage}>
            <LoadMore
              className="self-center !shadow-none underline xl:bg-primary text-[10px] text-primary !font-normal"
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
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
