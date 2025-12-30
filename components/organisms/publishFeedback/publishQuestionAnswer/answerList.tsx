import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@components/atoms/spinner";
import useGetAnswerList from "@hooks/questionAnswer/useGetAnswerList";
import { IQuestion, IQuestionMetadata } from "@interface/qa.interface";
import AnswerItem from "./answerItem";

interface IProps {
  questionItem: IQuestion;
}

const AnswerList = ({ questionItem }: IProps) => {
  const questionMetadata = JSON.parse(questionItem.metadata) as IQuestionMetadata;
  const { repoId, documentId } = questionMetadata;

  const {
    data: answerList,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAnswerList(repoId, documentId, questionItem.id, 10, true);

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <div className="flex w-full justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      </div>
    );
  }

  const total = answerList?.pages[0]?.total || 0;

  if (total && answerList) {
    return (
      <>
        {answerList?.pages.map((page) => {
          return page.list.map((answerItem) => {
            return <AnswerItem key={`answer-${answerItem.id}`} answerItem={answerItem} />;
          });
        })}

        <RenderIf isTrue={!!hasNextPage}>
          <div className="flex w-full justify-center border-r-4 border-r-gray-200 bg-secondary pb-2">
            <LoadMore isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
          </div>
        </RenderIf>
      </>
    );
  }

  return (
    <div className="border-r-4 border-r-gray-200 bg-secondary py-8">
      <EmptyList type={EEmptyList.ANSWER_LIST} />
    </div>
  );
};

export default AnswerList;
