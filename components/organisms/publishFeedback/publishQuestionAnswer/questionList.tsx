import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@components/atoms/spinner";
import useGetQuestionList from "@hooks/questionAnswer/useGetQuestionList";
import QuestionItem from "./questionItem";
import AnswerList from "./answerList";
import useGetUser from "@hooks/auth/useGetUser";
import useGetPublishQuestionList from "@hooks/publish/useGetPublishQuestionList";
import Error from "@components/organisms/error";
import { usePathname } from "next/navigation";
import { toEnglishDigit } from "@utils/index";

const QuestionList = () => {
  const { data: userInfo } = useGetUser();

  const pathname = usePathname();
  const repoId = toEnglishDigit(decodeURIComponent(pathname.split("/")[3]));
  const docId = toEnglishDigit(decodeURIComponent(pathname.split("/")[4]));


  const {
    data: questionList,
    isLoading,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetQuestionList(
    +repoId,
    +docId,
    10,
    !!userInfo,
  );

  const {
    data: publishQuestionList,
    isLoading: publishQuestionIsLoading,
    error: publishQuestionError,
    refetch: publishQuestionRefetch,
    hasNextPage: publishQuestionHasNextPage,
    isFetchingNextPage: publishQuestionIsFetchingNextPage,
    fetchNextPage: publishQuestionFetchNextPage,
  } = useGetPublishQuestionList(+docId, 10, !userInfo);

  if (isLoading || publishQuestionIsLoading) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <div className="flex w-full justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      </div>
    );
  }

  if (error || publishQuestionError) {
    return (
      <div className="flex items-center gap-4 bg-secondary py-8">
        <Error
          error={{
            message: error?.message || publishQuestionError?.message || "خطا در دریافت اطلاعات",
          }}
          retry={() => {
            if (error) {
              refetch();
            } else {
              publishQuestionRefetch();
            }
          }}
        />
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
