import React from "react";
import CreateQuestion from "./createQuestion";
import { usePublishStore } from "@store/publish";
import QuestionList from "./questionList";

const PublishQuestionAnswer = () => {
  const getPublishVersion = usePublishStore((state) => {
    return state.publishVersion;
  });

  return getPublishVersion ? (
    <>
      <div className="px-5 py-10 xs:px-8">
        <CreateQuestion
          repoId={getPublishVersion.repoId}
          documentId={getPublishVersion.documentId}
        />
      </div>
      <hr className="h-[2px] w-full bg-blue-gray-50" />
      <QuestionList
        repoId={getPublishVersion.repoId}
        documentId={getPublishVersion.documentId}
      />
    </>
  ) : null;
};

export default PublishQuestionAnswer;
