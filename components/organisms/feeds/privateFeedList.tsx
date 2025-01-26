import React, { useState } from "react";
import useGetPrivateFeeds from "@hooks/feeds/useGetPrivateFeeds";
import { Accordion, AccordionBody, AccordionHeader, Spinner } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";

interface IProps {
  ssoId: number;
}

const PrivateFeedList = ({ ssoId }: IProps) => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetPrivateFeeds(ssoId, 10);

  const [open, setOpen] = useState<number | null>(null);

  const handleOpen = (value: number) => {
    setOpen(open === value ? null : value);
  };

  const feedList = data?.pages.flatMap((page) => {
    return page.list;
  });

  if (isLoading) {
    return (
      <div className="mt-6 grid h-full place-content-center py-4">
        <div className="w-full flex justify-center">
          <Spinner className="h-6 w-6" color="deep-purple" />
        </div>
      </div>
    );
  }

  if (!feedList?.length) {
    return (
      <div className="mt-6 grid h-full place-content-center py-4">
        <EmptyList type={EEmptyList.FEED_LIST} />
      </div>
    );
  }

  return (
    <div className="py-4 h-full">
      <div className="flex flex-col gap-2 h-[calc(100vh-180px)] overflow-y-auto">
        {feedList.map((feed) => {
          return (
            <Accordion
              open={open === feed.id}
              className={`mb-2 rounded-lg border ${open === feed.id ? "border-purple-normal" : "border-blue-gray-100"} px-4`}
              key={feed.id}
            >
              <AccordionHeader
                onClick={() => {
                  return handleOpen(feed.id);
                }}
                className={`border-b-0 transition-colors text-sm text-gray-800 font-bold ${
                  open === feed.id
                    ? "text-purple-normal hover:!text-purple-normal"
                    : ""
                }`}
              >
                {feed.name}
              </AccordionHeader>
              <AccordionBody className="pt-0 font-iranYekan text-sm font-thin">
                {feed.content}
              </AccordionBody>
            </Accordion>
          );
        })}
        <RenderIf isTrue={!!hasNextPage}>
          <div className="mx-auto">
            <LoadMore
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </div>
        </RenderIf>
      </div>
    </div>
  );
};

export default PrivateFeedList;
