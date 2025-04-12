import React from "react";
import CardView from "../repoView/cardView";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import useGetMyRepoList from "@hooks/repository/useGetMyRepoList";
import { useRecoilValue } from "recoil";
import { IRepoView } from "@interface/repo.interface";
import { repoSearchParamAtom } from "@atom/repository";
import { Spinner } from "@material-tailwind/react";

interface IProps {
  archived: boolean;
}

const MyRepoList = ({ archived }: IProps) => {
  const getSearchParam = useRecoilValue(repoSearchParamAtom);
  const search = getSearchParam?.search;

  const {
    data: getMyRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetMyRepoList(20, archived, search || undefined, undefined, true);

  const type = () => {
    if (search) {
      return EEmptyList.FILTER;
    }
    if (archived) {
      return EEmptyList.ARCHIVE_REPO;
    }
    return EEmptyList.MY_REPO;
  };

  const commonProps: IRepoView = {
    isLoading,
    getRepoList: getMyRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    type: type(),
  };

  const listLength = getMyRepoList?.pages[0].total;

  const renderList = () => {
    if (listLength) return <CardView {...commonProps} />;
    return <EmptyList type={type()} />;
  };

  return (
    <div className={`${archived ? "archiveRepo__list" : "myRepo__list"} flex flex-col gap-6`}>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : (
        renderList()
      )}
    </div>
  );
};

export default MyRepoList;
