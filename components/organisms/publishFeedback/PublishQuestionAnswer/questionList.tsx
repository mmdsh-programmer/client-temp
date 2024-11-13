import React from "react";
import useGetQuestionAnswerList from "@hooks/questionAnswer/useGetQuestionAnswerList";
import QuestionItem from "./questionItem";
import AnswerList from "./answerList";
import { Spinner } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

interface IProps {
  postId: number;
}

const QuestionList = ({ postId }: IProps) => {
  const { data: questionList, isLoading } = useGetQuestionAnswerList(
    10,
    postId
  );

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <div className="w-full flex justify-center">
          <Spinner className="h-6 w-6" color="deep-purple" />
        </div>
      </div>
    );
  }

  const total = questionList?.pages[0].count;

  if (total) {
    return questionList.pages.map((questionListPage) => {
      return questionListPage.result.map((questionItem) => {
        return (
          <QuestionItem
            key={`question-${questionItem.id}`}
            questionItem={questionItem}
          >
            <AnswerList postId={questionItem.id} />
          </QuestionItem>
        );
      });
    });
  }

  return (
    <div className="py-8">
      <EmptyList type={EEmptyList.QUESTION_LIST} />
    </div>
  );
};

export default QuestionList;
