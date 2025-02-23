import React from "react";
import TableHead from "@components/molecules/tableHead";
import TableCell from "@components/molecules/tableCell";
import { Spinner, Typography } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import PublicFeedMenu from "@components/molecules/publicFeedMenu";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";
import useGetPublicFeeds from "@hooks/publicFeed/useGetPublicFeeds";
import ImageComponent from "@components/atoms/image";

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
            const { link, image } = JSON.parse(publicFeed.metadata);
            return (
              <TableCell
                key={`publicFeed-table-item-${publicFeed.id}`}
                tableCell={[
                  {
                    data: (
                      <div className="flex gap-2 items-center">
                        {image ? (
                          <div className="h-5 w-5">
                            <ImageComponent
                              className="object-cover max-h-full"
                              alt="repo-image"
                              src={`${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${image}?&checkUserGroupAccess=true&time=${Date.now()})`}
                            />
                          </div>
                        ) : null}
                        <Typography className="title_t3">
                          {publicFeed.name}
                        </Typography>
                      </div>
                    ),
                  },
                  {
                    data: (
                      <Typography
                        className="title_t3 text- max-w-[150px] truncate flex gap-2 mr-2 w-12 sm:w-20 md:w-auto"
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
                        className="title_t3 text-blue-600 max-w-[150px] truncate flex gap-2 mr-2 w-12 sm:w-20 md:w-auto"
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
