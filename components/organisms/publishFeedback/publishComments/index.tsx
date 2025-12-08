import React from "react";
import useGetUser from "@hooks/auth/useGetUser";
import PublishForceLogin from "../publishForceLogin";
import PublishCommentCreate from "./publishCommentCreate";
import PublishCommentList from "./publishCommentList";

interface IProps {
  repoId: number;
  documentId: number;
}

const PublishComments = ({ repoId, documentId }: IProps) => {
  const { data: userInfo } = useGetUser();

  if (!userInfo) {
    return (
      <div className="mt-8">
        <PublishForceLogin customText="برای نوشتن دیدگاه باید وارد پنل کاربری خود شوید" />
      </div>
    );
  }

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
