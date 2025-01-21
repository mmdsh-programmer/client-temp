"use client";

import React, { useState } from "react";
import useGetPublicFeeds from "@hooks/feeds/useGetPublicFeeds";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Spinner,
} from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";

const FeedList = () => {
  const domainId = process.env.NEXT_PUBLIC_DOMAIN_ID as string;
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetPublicFeeds(+domainId, 10, true);

  const [open, setOpen] = useState<number | null>(null);

  const handleOpen = (value: number) => {
    setOpen(open === value ? null : value);
  };

  const feedList = data?.pages.flatMap((page) => {
    return page.list;
  });

  if (isLoading) {
    return (
      <div className="py-4">
        <h1 className="block text-lg text-gray-800 font-bold">
          لیست خبرنامه ها
        </h1>
        <div className="mt-6 grid h-full place-content-center">
          <div className="w-full flex justify-center">
            <Spinner className="h-6 w-6" color="deep-purple" />
          </div>
        </div>
      </div>
    );
  }

  if (!feedList?.length) {
    return (
      <div className="py-4">
        <h1 className="block text-lg text-gray-800 font-bold">
          لیست خبرنامه ها
        </h1>
        <div className="mt-6 grid h-full place-content-center">
          <EmptyList type={EEmptyList.FEED_LIST} />
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 h-full">
      <h1 className="block text-lg text-gray-800 font-bold">لیست خبرنامه ها</h1>
      <div className="mt-6 flex flex-col gap-2 h-[calc(100vh-180px)] overflow-y-auto">
        {feedList.map((feed) => {
          return (
            <Accordion
              open={open === feed.id}
              className="mb-2 rounded-lg border border-blue-gray-100 px-4"
              key={feed.id}
            >
              <AccordionHeader
                onClick={() => {
                  return handleOpen(feed.id);
                }}
                className={`border-b-0 transition-colors text-base text-gray-800 ${
                  open === feed.id ? "text-primary hover:!text-primary" : ""
                }`}
              >
                {feed.name}
              </AccordionHeader>
              <AccordionBody className="pt-0 font-iranYekan text-sm font-normal">
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

export default FeedList;
