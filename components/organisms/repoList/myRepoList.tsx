import React from "react";
import CardView from "../repoView/cardView";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import useGetMyRepoList from "@hooks/repository/useGetMyRepoList";
import { useRecoilValue } from "recoil";
import { IRepoView } from "@interface/repo.interface";
import RepoSearch from "@components/molecules/repoSearch";
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
    } else {
      if (archived) {
        return EEmptyList.ARCHIVE_REPO;
      } else {
        return EEmptyList.MY_REPO;
      }
    }
  };

  const commonProps: IRepoView = {
    isLoading: isLoading,
    getRepoList: getMyRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    type: type(),
  };

  const listLength = getMyRepoList?.pages[0].total;

  return (
    <div className="flex flex-col gap-6">
      {!isLoading || search ? <RepoSearch /> : null}
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : listLength ? (
        <CardView {...commonProps} />
      ) : (
        <EmptyList type={type()} />
      )}
    </div>
  );
};

export default MyRepoList;
