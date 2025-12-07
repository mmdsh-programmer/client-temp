import React from "react";
import PublishCommentCreate from "@components/organisms/publishFeedback/@publishComments/publishCommentCreate";
import PublishCommentList from "@components/organisms/publishFeedback/@publishComments/publishCommentList";

interface IProps {
  repoId: number;
  documentId: number;
}

const PublishComments = ({ repoId, documentId }: IProps) => {
  return (
    <>
      <div className="sticky top-0 z-50 bg-white px-5 py-10 xs:px-8">
        <PublishCommentCreate repoId={repoId} documentId={documentId} />
      </div>
      <hr className="h-[2px] w-full bg-blue-gray-50" />
      <PublishCommentList repoId={repoId} documentId={documentId} />
    </>
  );
};

export default PublishComments;
