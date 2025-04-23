import PublishCommentCreate from "./publishCommentCreate";
import PublishCommentList from "./publishCommentList";
import React from "react";

interface IProps {
  postId: number;
  isQuestionAnswerComments?: boolean;
}

const PublishComments = ({ postId, isQuestionAnswerComments }: IProps) => {
  return (
    <>
      <div className="px-5 xs:px-8 py-10 sticky top-0 z-50 bg-white">
        <PublishCommentCreate
          isQuestionAnswerComments={isQuestionAnswerComments}
          postId={postId}
        />
      </div>
      <hr className="w-full h-[2px] bg-blue-gray-50" />
      <PublishCommentList postId={postId} />
    </>
  );
};

export default PublishComments;
