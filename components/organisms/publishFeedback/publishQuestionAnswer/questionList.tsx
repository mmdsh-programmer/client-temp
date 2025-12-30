import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@components/atoms/spinner";
import useGetQuestionList from "@hooks/questionAnswer/useGetQuestionList";
import QuestionItem from "./questionItem";
import AnswerList from "./answerList";
import { usePublishStore } from "@store/publish";

const QuestionList = () => {
  const { publishVersion } = usePublishStore();
  const { repoId, documentId } = publishVersion!;

  const {
    data: questionList,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetQuestionList(repoId, documentId, 10, true);

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <div className="flex w-full justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      </div>
    );
  }

  const total = questionList?.pages[0]?.total || 0;

  if (total && questionList) {
    return (
      <>
        {questionList?.pages.map((questionListPage) => {
          return questionListPage.list.map((questionItem) => {
            return (
              <QuestionItem key={`question-${questionItem.id}`} questionItem={questionItem}>
                <AnswerList questionItem={questionItem} />
              </QuestionItem>
            );
          });
        })}

        <RenderIf isTrue={!!hasNextPage}>
          <div className="flex w-full justify-center bg-white pb-2">
            <LoadMore isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
          </div>
        </RenderIf>
      </>
    );
  }

  return (
    <div className="bg-white py-8">
      <EmptyList type={EEmptyList.QUESTION_LIST} />
    </div>
  );
};

export default QuestionList;
