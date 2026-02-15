import React, { useState } from "react";
import useGetDomainVersions from "@hooks/domain/useGetDomainVersions";
import PublishAdvancedSearchVersionItem from "@components/organisms/publishSearch/publishAdvancedSearchVersionItem";
import LoadMore from "@components/molecules/loadMore";
import BackButton from "@components/atoms/button/backButton";
import { Spinner } from "@components/ui/spinner";
import { ISearchSortParams } from "@components/organisms/publishSearch/publishAdvancedSearch";
import { useParams } from "next/navigation";
import { toEnglishDigit } from "@utils/index";

interface IProps {
  searchText: string;
  creatorName?: string;
  sortParams: ISearchSortParams;
  handleBack: () => void;
}

const DomainVersionsLoadMore = ({ searchText, creatorName, sortParams, handleBack }: IProps) => {
  const [disableItems, setDisableItems] = useState(false);

  const params = useParams();
  const idParam = params?.id;
  const repoId = toEnglishDigit(
    decodeURIComponent(Array.isArray(idParam) ? idParam[0] : (idParam ?? "")),
  );

  const {
    data: domainVersions,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
    refetch,
  } = useGetDomainVersions(
    +repoId || undefined,
    undefined,
    searchText,
    undefined,
    creatorName,
    sortParams,
    undefined,
    undefined,
    undefined,
    20,
  );

  const onResultItemClick = (value: boolean) => {
    setDisableItems(value);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center gap-2">
        <BackButton onClick={handleBack} className="!p-0" />
        <span className="title_t2 text-primary_normal">نتایج در لیست نسخه‌ها</span>
      </div>
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <Spinner className="size-8 text-primary" />
        </div>
      ) : null}
      <div className="list max-h-[200px] w-full overflow-y-auto !overflow-x-hidden">
        {domainVersions?.pages.map((page) => {
          return page.list.map((searchResult) => {
            return (
              <PublishAdvancedSearchVersionItem
                resultItem={searchResult}
                disabled={disableItems}
                setDisableItems={onResultItemClick}
                key={`versionItem-${searchResult.id}`}
              />
            );
          });
        })}
        {hasNextPage ? (
          <LoadMore
            className="justify-center !self-center"
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        ) : null}
      </div>
    </div>
  );
};

export default DomainVersionsLoadMore;
