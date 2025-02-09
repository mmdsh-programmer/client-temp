import React from "react";
import TableHead from "@components/molecules/tableHead";
import TableCell from "@components/molecules/tableCell";
import { Spinner, Typography } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import PublicFeedMenu from "@components/molecules/publicFeedMenu";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";
import useGetPublicFeeds from "@hooks/feed/useGetPublicFeeds";

const DomainPublicFeedList = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
  useGetPublicFeeds(10);

  const listLength = data?.pages.flatMap((page) => {
    return page.list;
  });

  const renderTableRows = () => {
    return (
      <>
        {data?.pages.map((page) => {
          return page.list.map((publicFeed) => {
            return (
              <TableCell
                key={`publicFeed-table-item-${publicFeed.id}`}
                tableCell={[
                  { data: publicFeed.name },
                  {
                    data: (
                      <Typography
                        className="max-w-[150px] truncate flex gap-2 mr-2 text-ellipsis overflow-hidden w-12 sm:w-20 md:w-auto"
                        title={publicFeed.content}
                      >
                        {publicFeed.content}
                      </Typography>
                    ),
                  },
                  {
                    data: <PublicFeedMenu feed={publicFeed} />,
                    stopPropagation: true,
                  },
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
        <Spinner className="h-8 w-8" color="deep-purple" />
      </div>
    );
  }

  return listLength ? (
    <div className="w-full overflow-auto border-[0.5px] border-normal rounded-lg">
      <table className="w-full overflow-hidden min-w-max">
        <TableHead
          tableHead={[
            { key: "name", value: "عنوان ", isSorted: true },
            { key: "content", value: "متن ", isSorted: true },
            {
              key: "action",
              value: "عملیات",
              className: "justify-end",
            },
          ]}
        />
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  ) : (
    <EmptyList type={EEmptyList.DOMAIN_PUBLICFEEDS} />
  );
};

export default DomainPublicFeedList;
