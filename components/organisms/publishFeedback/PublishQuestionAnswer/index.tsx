import CreateQuestion from "./createQuestion";
import QuestionAnswerList from "./questionAnswerList";
import React from "react";
import { publishVersionAtom } from "@atom/publish";
import { useRecoilValue } from "recoil";

const PublishQuestionAnswer = () => {
  const getPublishVersion = useRecoilValue(publishVersionAtom);

  return getPublishVersion ? (
    <>
      <div className="px-5 xs:px-8 py-10">
        <CreateQuestion postId={getPublishVersion.postId} />
      </div>
      <hr className="w-full h-[2px] bg-blue-gray-50" />
      <QuestionAnswerList postId={getPublishVersion.postId} />
    </>
  ) : null;
};

export default PublishQuestionAnswer;
