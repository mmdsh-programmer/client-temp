import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { Typography } from "@material-tailwind/react";
import { Spinner } from "@components/atoms/spinner";
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

  const listLength = data?.pages[0].total;

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
                        className="title_t3 mr-2 flex w-12 max-w-[200px] gap-2 truncate sm:w-20 md:w-auto"
                        title={request.repoName}
                      >
                        {request.repoName}
                      </Typography>
                    ),
                  },
                  {
                    data: <DomainSubscriptionMenu request={request} />,
                    stopPropagation: true,
                    className: "flex justify-end",
                  },
                ]}
              />
            );
          });
        })}
        <RenderIf isTrue={!!hasNextPage}>
          <div className="mx-auto">
            <LoadMore isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
          </div>
        </RenderIf>
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  return listLength ? (
    <div className="w-full !overflow-auto rounded-lg border-[0.5px] border-normal">
      <table className="w-full min-w-max overflow-hidden">
        <TableHead
          tableHead={[
            { key: "name", value: "درخواست دهنده " },
            { key: "repoName", value: "نام مخزن " },
            {
              key: "action",
              value: "عملیات",
              className: "justify-end pl-10",
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
