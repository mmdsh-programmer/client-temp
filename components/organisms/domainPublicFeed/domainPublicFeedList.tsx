import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { Typography } from "@material-tailwind/react";
import { Spinner } from "@components/atoms/spinner";
import ImageComponent from "@components/atoms/image";
import LoadMore from "@components/molecules/loadMore";
import PublicFeedMenu from "@components/molecules/publicFeedMenu";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import TableCell from "@components/molecules/tableCell";
import TableHead from "@components/molecules/tableHead";
import useGetPublicFeeds from "@hooks/publicFeed/useGetPublicFeeds";

const DomainPublicFeedList = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetPublicFeeds(10);

  const listLength = data?.pages.flatMap((page) => {
    return page.list;
  });

  const renderTableRows = () => {
    return (
      <>
        {data?.pages.map((page) => {
          return page.list.map((publicFeed) => {
            const { link, image } = JSON.parse(publicFeed.metadata);
            return (
              <TableCell
                key={`publicFeed-table-item-${publicFeed.id}`}
                tableCell={[
                  {
                    data: (
                      <div className="flex items-center gap-2">
                        {image ? (
                          <div className="h-5 w-5">
                            <ImageComponent
                              className="max-h-full object-cover"
                              alt="repo-image"
                              src={`${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${image}?&checkUserGroupAccess=true&time=${Date.now()})`}
                            />
                          </div>
                        ) : null}
                        <Typography className="title_t3">{publicFeed.name}</Typography>
                      </div>
                    ),
                  },
                  {
                    data: (
                      <Typography
                        className="title_t3 text- mr-2 flex w-12 max-w-[150px] gap-2 truncate sm:w-20 md:w-auto"
                        title={publicFeed.content}
                      >
                        {publicFeed.content}
                      </Typography>
                    ),
                  },
                  {
                    data: (
                      <Typography
                        dir="ltr"
                        className="title_t3 mr-2 flex w-12 max-w-[150px] gap-2 truncate text-blue-600 sm:w-20 md:w-auto"
                        title={link}
                      >
                        {link || "_"}
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
    <div className="w-full overflow-auto rounded-lg border-[0.5px] border-normal">
      <table className="w-full min-w-max overflow-hidden">
        <TableHead
          tableHead={[
            { key: "name", value: "عنوان " },
            { key: "content", value: "متن " },
            { key: "link", value: "لینک " },
            {
              key: "action",
              value: "عملیات",
              className: "flex justify-end",
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
