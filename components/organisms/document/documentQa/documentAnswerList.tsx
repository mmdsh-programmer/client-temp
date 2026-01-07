import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@components/atoms/spinner";
import useGetAnswerList from "@hooks/questionAnswer/useGetAnswerList";
import { IQuestion } from "@interface/qa.interface";
import DocumentAnswerItem from "./documentAnswerItem";
import { useRepositoryStore } from "@store/repository";
import { ERoles } from "@interface/enums";
import useGetAnswerListByAdmin from "@hooks/questionAnswer/useGetAnswerListByAdmin";
import { useDocumentStore } from "@store/document";
import Error from "@components/organisms/error";

interface IProps {
  questionItem: IQuestion;
}

const DocumentAnswerList = ({ questionItem }: IProps) => {
  const { repo } = useRepositoryStore();
  const { selectedDocument } = useDocumentStore();

  const adminOwnerRole = repo?.roleName === ERoles.admin || repo?.roleName === ERoles.owner;

  const {
    data: answerList,
    isLoading,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAnswerList(
    selectedDocument!.repoId,
    selectedDocument!.id,
    questionItem.id,
    10,
    !adminOwnerRole,
  );

  const {
    data: answerListByAdmin,
    isLoading: adminListIsLoading,
    error: adminListError,
    refetch: adminListRefetch,
    hasNextPage: adminListHasNextPage,
    isFetchingNextPage: adminListIsFetchingNextPage,
    fetchNextPage: adminListFetchNextPage,
  } = useGetAnswerListByAdmin(
    selectedDocument!.repoId,
    selectedDocument!.id,
    questionItem.id,
    10,
    adminOwnerRole,
  );

  const total = adminOwnerRole ? answerListByAdmin?.pages[0]?.total : answerList?.pages[0]?.total;

  const list = adminOwnerRole ? answerListByAdmin : answerList;

  if (isLoading || adminListIsLoading) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <div className="flex w-full justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      </div>
    );
  }

  if (error || adminListError) {
    return (
      <div className="flex items-center gap-4 bg-secondary  py-8">
        <div className="flex w-full justify-center">
          <Error
            error={{
              message: error?.message || adminListError?.message || "خطا در دریافت اطلاعات",
            }}
            retry={() => {
              if (error) {
                refetch();
              } else {
                adminListRefetch();
              }
            }}
          />
        </div>
      </div>
    );
  }

  if (total) {
    return (
      <>
        {list?.pages.map((page) => {
          return page.list.map((answerItem) => {
            return <DocumentAnswerItem key={`answer-${answerItem.id}`} answerItem={answerItem} />;
          });
        })}

        <RenderIf isTrue={!!hasNextPage}>
          <div className="flex w-full justify-center border-r-4 border-r-gray-200 bg-secondary pb-2">
            <LoadMore isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
          </div>
        </RenderIf>
        <RenderIf isTrue={!!adminListHasNextPage}>
          <div className="flex w-full justify-center bg-white pb-2">
            <LoadMore
              isFetchingNextPage={adminListIsFetchingNextPage}
              fetchNextPage={adminListFetchNextPage}
            />
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

export default DocumentAnswerList;
