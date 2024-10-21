import React from "react";
import { UserIcon } from "@components/atoms/icons";
import ImageComponent from "@components/atoms/image";
import useGetCommentList from "@hooks/core/useGetCommentList";
import { IVersion } from "@interface/version.interface";
import { Typography } from "@material-tailwind/react";
import CommentDelete from "./commentDelete";
import CommentCreate from "./commentCreate";

interface IProps {
  version?: IVersion;
}

const Comments = ({ version }: IProps) => {
  const { data: getComments } = useGetCommentList(version!.postId, 5);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-2 px-6 py-4 h-[calc(100vh-290px)] overflow-auto">
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
                  <div className="flex items-center gap-1">
                    <CommentDelete version={version} comment={comment} />
                  </div>
                </div>
                <div>
                  <Typography className="body_b3">{comment.text}</Typography>
                </div>
              </div>
            );
          });
        })}
      </div>
      <CommentCreate version={version} />
    </div>
  );
};

export default Comments;
