import React from "react";
import { publishVersionAtom } from "@atom/publish";
import { useRecoilValue } from "recoil";
import PublishCommentCreate from "./publishCommentCreate";
import PublishCommentList from "./publishCommentList";

const PublishComments = () => {
  const getPublishVersion = useRecoilValue(publishVersionAtom);

  return getPublishVersion ? (
    <>
      <div className="px-5 xs:px-8 py-10">
        <PublishCommentCreate postId={getPublishVersion.postId} />
      </div>
      <hr className="w-full h-[2px] bg-blue-gray-50" />

      <PublishCommentList postId={getPublishVersion.postId} />
    </>
  ) : null;
};

export default PublishComments;
