import React from "react";
import PublishCommentCreate from "./publishCommentCreate";
import PublishCommentList from "./publishCommentList";

interface IProps {
  postId: number;
}

const PublishComments = ({ postId }: IProps) => {
  return (
    <>
      <div className="px-5 xs:px-8 py-10 sticky top-0 z-50 bg-white">
        <PublishCommentCreate postId={postId} />
      </div>
      <hr className="w-full h-[2px] bg-blue-gray-50" />

      <PublishCommentList postId={postId} />
    </>
  );
};

export default PublishComments;
