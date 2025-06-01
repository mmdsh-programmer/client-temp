import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { Typography } from "@material-tailwind/react";
import { Spinner } from "@components/atoms/spinner";
import LoadMore from "@components/molecules/loadMore";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import TableCell from "@components/molecules/tableCell";
import TableHead from "@components/molecules/tableHead";
import useGetPrivateFeeds from "@hooks/privateFeed/useGetPrivateFeeds";

const DomainPrivateFeedList = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
  useGetPrivateFeeds(30);

  const listLength = data?.pages.flatMap((page) => {
    return page.list;
  });

  const renderTableRows = () => {
    return (
      <>
        {data?.pages.map((page) => {
          return page.list.map((privateFeed) => {
            return (
              <TableCell
                key={`privateFeed-table-item-${privateFeed.id}`}
                tableCell={[
                  { data: privateFeed.name },
                  {
                    data: (
                      <Typography
                        className="title_t3 max-w-[200px] truncate flex gap-2 mr-2 w-12 sm:w-20 md:w-auto"
                        title={privateFeed.content}
                      >
                        {privateFeed.content}
                      </Typography>
                    ),
                  },
                  // {
                  //   data: <PrivateFeedMenu feed={privateFeed} />,
                  //   stopPropagation: true,
                  // },
                ]}
              />
            );
          });
        })}
        <RenderIf isTrue={!!hasNextPage}>
          <div className="mx-auto">
            <LoadMore
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </div>
        </RenderIf>
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  return listLength ? (
    <div className="w-full !overflow-auto border-[0.5px] border-normal rounded-lg">
      <table className="w-full overflow-hidden min-w-max">
        <TableHead
          tableHead={[
            { key: "name", value: "عنوان ", isSorted: true },
            { key: "content", value: "متن ", isSorted: true },
           
          ]}
        />
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  ) : (
    <EmptyList type={EEmptyList.DOMAIN_PUBLICFEEDS} />
  );
};

export default DomainPrivateFeedList;
