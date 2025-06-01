import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

import LoadMore from "@components/molecules/loadMore";
import QuestionAnswerItem from "./questionAnswerItem";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import useGetQuestionAnswerList from "@hooks/questionAnswer/useGetQuestionAnswerList";
import { Spinner } from "@components/atoms/spinner";

interface IProps {
  postId: number;
  isAnswerList?: boolean;
}

const QuestionAnswerList = ({ postId, isAnswerList }: IProps) => {
  const {
    data: questionList,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetQuestionAnswerList(10, postId);

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <div className="w-full flex justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      </div>
    );
  }

  const total = questionList?.pages[0]?.count || 0;

  if (total && questionList) {
    return (
      <>
        {questionList.pages.map((questionListPage) => {
          return questionListPage.result.map((questionItem) => {
            return (
              <QuestionAnswerItem
                key={`question-${questionItem.id}`}
                questionItem={questionItem}
                parentPostId={postId}
                isAnswer={isAnswerList}
              >
                <QuestionAnswerList isAnswerList postId={questionItem.id} />
              </QuestionAnswerItem>
            );
          });
        })}

        <RenderIf isTrue={!!hasNextPage}>
          <div
            className={`w-full flex justify-center pb-2 ${isAnswerList ? "border-r-4 border-r-gray-200 bg-secondary" : "bg-white"}`}
          >
            <LoadMore
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </div>
        </RenderIf>
      </>
    );
  }

  return (
    <div
      className={`py-8 ${isAnswerList ? "border-r-4 border-r-gray-200 bg-secondary" : "bg-white"}`}
    >
      <EmptyList
        type={isAnswerList ? EEmptyList.ANSWER_LIST : EEmptyList.QUESTION_LIST}
      />
    </div>
  );
};

export default QuestionAnswerList;
