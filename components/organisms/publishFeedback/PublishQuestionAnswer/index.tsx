import CreateQuestion from "./createQuestion";
import QuestionAnswerList from "./questionAnswerList";
import React from "react";
import { usePublishStore } from "@store/publish";

const PublishQuestionAnswer = () => {
  const getPublishVersion = usePublishStore((state) => {
    return state.publishVersion;
  });
  return getPublishVersion ? (
    <>
      <div className="px-5 py-10 xs:px-8">
        <CreateQuestion postId={getPublishVersion.postId} />
      </div>
      <hr className="h-[2px] w-full bg-blue-gray-50" />
      <QuestionAnswerList postId={getPublishVersion.postId} />
    </>
  ) : null;
};

export default PublishQuestionAnswer;
