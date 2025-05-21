import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { Spinner, Typography } from "@material-tailwind/react";

import DomainSubscriptionMenu from "@components/molecules/domainSubscriptionMenu";
import LoadMore from "@components/molecules/loadMore";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import TableCell from "@components/molecules/tableCell";
import TableHead from "@components/molecules/tableHead";
import useGetSubscriptionList from "@hooks/domainSubscription/useGetSubscriptionList";

const DomainSubscription = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetSubscriptionList(30);

  const listLength = data?.pages.flatMap((page) => {
    return page.list;
  });

  const renderTableRows = () => {
    return (
      <>
        {data?.pages.map((page) => {
          return page.list.map((request) => {
            return (
              <TableCell
                key={`request-table-item-${request.id}`}
                tableCell={[
                  { data: request.userFullName },
                  {
                    data: (
                      <Typography
                        className="title_t3 max-w-[200px] truncate flex gap-2 mr-2 w-12 sm:w-20 md:w-auto"
                        title={request.repoName}
                      >
                        {request.repoName}
                      </Typography>
                    ),
                  },
                  {
                    data: <DomainSubscriptionMenu request={request} />,
                    stopPropagation: true,
                    className: "flex justify-end"
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
    <div className="w-full !overflow-auto border-[0.5px] border-normal rounded-lg">
      <table className="w-full overflow-hidden min-w-max">
        <TableHead
          tableHead={[
            { key: "name", value: "عنوان ", isSorted: true },
            { key: "repoName", value: "نام مخزن ", isSorted: true },
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

export default DomainSubscription;
