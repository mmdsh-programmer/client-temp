import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { Button, Typography } from "@material-tailwind/react";
import { Spinner } from "@components/atoms/spinner";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import TableCell from "@components/molecules/tableCell";
import TableHead from "@components/molecules/tableHead";
import useGetPrivateFeeds from "@hooks/privateFeed/useGetPrivateFeeds";
import { useRecoilState } from "recoil";
import { repoFeedAtom } from "@atom/feed";
import { BackIcon } from "@components/atoms/icons";
import PrivateFeedMenu from "@components/molecules/privateFeedMenu";
import ImageComponent from "@components/atoms/image";

const RepoFeedList = () => {
  const [getRepoFeed, setRepoFeed] = useRecoilState(repoFeedAtom);

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetPrivateFeeds(
    getRepoFeed!.value,
    30,
  );

  const listLength = data?.pages[0].total;

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  const renderTableRows = () => {
    return (
      <>
        {data?.pages.map((page) => {
          return page.list.map((privateFeed) => {
            const { link, image } = JSON.parse(privateFeed.metadata);
            return (
              <TableCell
                key={`privateFeed-table-item-${privateFeed.id}`}
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
                        <Typography className="title_t3">{privateFeed.name}</Typography>
                      </div>
                    ),
                  },
                  {
                    data: (
                      <Typography
                        className="title_t3 text- mr-2 flex w-12 max-w-[150px] gap-2 truncate sm:w-20 md:w-auto"
                        title={privateFeed.content}
                      >
                        {privateFeed.content}
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
                    data: <PrivateFeedMenu feed={privateFeed} />,
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

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex gap-2">
        <Button
          placeholder="button"
          className="h-5 w-5 bg-transparent p-0"
          onClick={() => {
            return setRepoFeed(null);
          }}
        >
          <BackIcon className="h-4 w-4 fill-icon-hover" />
        </Button>
        <Typography className="caption_c1 lowercase text-primary_normal">
          {getRepoFeed?.label}
        </Typography>
      </div>
      {listLength ? (
        <div className="h-[calc(100%40px)] w-full !overflow-auto rounded-lg border-[0.5px] border-normal">
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
      )}
    </div>
  );
};

export default RepoFeedList;
