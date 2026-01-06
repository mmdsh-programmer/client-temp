import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@components/atoms/spinner";
import useGetAnswerList from "@hooks/questionAnswer/useGetAnswerList";
import { IQuestion, IQuestionMetadata } from "@interface/qa.interface";
import AnswerItem from "./answerItem";
import useGetUser from "@hooks/auth/useGetUser";
import useGetPublishAnswerList from "@hooks/publish/useGetPublishAnswerList";

interface IProps {
  questionItem: IQuestion;
}

const AnswerList = ({ questionItem }: IProps) => {
  const questionMetadata = JSON.parse(questionItem.metadata) as IQuestionMetadata;
  const { repoId, documentId } = questionMetadata;

  const { data: userInfo } = useGetUser();

  const {
    data: answerList,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAnswerList(repoId, documentId, questionItem.id, 10, !!userInfo);

  const {
    data: publishAnswerList,
    isLoading: publishAnswerIsLoading,
    hasNextPage: publishAnswerHasNextPage,
    isFetchingNextPage: publishAnswerIsFetchingNextPage,
    fetchNextPage: publishAnswerFetchNextPage,
  } = useGetPublishAnswerList(documentId, questionItem.id, 10, !userInfo);

  if (isLoading || publishAnswerIsLoading) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <div className="flex w-full justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      </div>
    );
  }

  const total = answerList?.pages[0]?.total || publishAnswerList?.pages[0]?.total || 0;
  const list = answerList || publishAnswerList;

  if (total && list) {
    return (
      <>
        {list?.pages.map((page) => {
          return page.list.map((answerItem) => {
            return <AnswerItem key={`answer-${answerItem.id}`} answerItem={answerItem} />;
          });
        })}

        <RenderIf isTrue={!!hasNextPage}>
          <div className="flex w-full justify-center border-r-4 border-r-gray-200 bg-secondary pb-2">
            <LoadMore isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
          </div>
        </RenderIf>
        <RenderIf isTrue={!!publishAnswerHasNextPage}>
          <div className="flex w-full justify-center bg-white pb-2">
            <LoadMore isFetchingNextPage={publishAnswerIsFetchingNextPage} fetchNextPage={publishAnswerFetchNextPage} />
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
