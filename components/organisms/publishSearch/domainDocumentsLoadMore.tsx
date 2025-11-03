import React, { useState } from "react";
import { ISearchSortParams } from "./publishAdvancedSearch";
import LoadMore from "@components/molecules/loadMore";
import PublishAdvancedSearchResultItem from "./publishAdvancedSearchResultItem";
import useGetDomainDocuments from "@hooks/domain/useGetDomainDocuments";
import { Typography } from "@material-tailwind/react";
import BackButton from "@components/atoms/button/backButton";
import { Spinner } from "@components/atoms/spinner";
import { useParams } from "next/navigation";
import { toEnglishDigit } from "@utils/index";

interface IProps {
  searchText: string;
  tags: number[];
  creatorName?: string;
  sortParams: ISearchSortParams;
  handleBack: () => void;
}

const DomainDocumentsLoadMore = ({
  searchText,
  tags,
  creatorName,
  sortParams,
  handleBack,
}: IProps) => {
  const [disableItems, setDisableItems] = useState(false);

  const params = useParams();
  const idParam = params?.id;
  const repoId = toEnglishDigit(
    decodeURIComponent(Array.isArray(idParam) ? idParam[0] : (idParam ?? "")),
  );


  const {
    data: domainDocuments,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
    refetch,
  } = useGetDomainDocuments(+repoId, searchText, tags, creatorName, sortParams, 20);

  const onResultItemClick = (value: boolean) => {
    setDisableItems(value);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center gap-2">
        <BackButton onClick={handleBack} className="!p-0" />
        <Typography
          className="title_t2 text-primary_normal"
          placeholder=""
          {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
        >
          نتایج در لیست سندها
        </Typography>
      </div>
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <Spinner className="h-8 w-8 text-primary" />
        </div>
      ) : null}
      <div className="list max-h-[200px] w-full overflow-y-auto !overflow-x-hidden">
        {domainDocuments?.pages.map((page) => {
          return page.list.map((searchResult) => {
            return (
              <PublishAdvancedSearchResultItem
                resultItem={searchResult}
                disabled={disableItems}
                setDisableItems={onResultItemClick}
                key={`documentItem-${searchResult.id}`}
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

export default DomainDocumentsLoadMore;
