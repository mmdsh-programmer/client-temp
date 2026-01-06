import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@components/atoms/spinner";
import useGetQuestionList from "@hooks/questionAnswer/useGetQuestionList";
import QuestionItem from "./questionItem";
import AnswerList from "./answerList";
import { usePublishStore } from "@store/publish";
import useGetUser from "@hooks/auth/useGetUser";
import useGetPublishQuestionList from "@hooks/publish/useGetPublishQuestionList";

const QuestionList = () => {
  const { data: userInfo } = useGetUser();

  const { publishVersion } = usePublishStore();
  const { repoId, documentId } = publishVersion!;

  const {
    data: questionList,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetQuestionList(repoId, documentId, 10, !!userInfo);

  const {
    data: publishQuestionList,
    isLoading: publishQuestionIsLoading,
    hasNextPage: publishQuestionHasNextPage,
    isFetchingNextPage: publishQuestionIsFetchingNextPage,
    fetchNextPage: publishQuestionFetchNextPage,
  } = useGetPublishQuestionList(documentId, 10, !userInfo);

  if (isLoading || publishQuestionIsLoading) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <div className="flex w-full justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      </div>
    );
  }

  const total = questionList?.pages[0]?.total || publishQuestionList?.pages[0]?.total || 0;
  const list = questionList || publishQuestionList;

  if (total && list) {
    return (
      <>
        {list?.pages.map((questionListPage) => {
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
        <RenderIf isTrue={!!publishQuestionHasNextPage}>
          <div className="flex w-full justify-center bg-white pb-2">
            <LoadMore
              isFetchingNextPage={publishQuestionIsFetchingNextPage}
              fetchNextPage={publishQuestionFetchNextPage}
            />
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
