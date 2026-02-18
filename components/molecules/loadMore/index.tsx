"use client";

import React, { useEffect } from "react";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Button } from "@components/ui/button";
import { Spinner } from "@components/ui/spinner";
import { cn } from "@utils/cn";

interface IProps {
  className?: string;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<unknown, Error>>;
}

const LoadMore = ({ className, isFetchingNextPage, fetchNextPage }: IProps) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage]);

  return (
    <Button
      ref={ref}
      type="button"
      variant="ghost"
      size="default"
      className={cn(
        "w-full focus:bg-transparent hover:bg-transparent",
        className
      )}
      onClick={() => {
        fetchNextPage();
      }}
      disabled={isFetchingNextPage}
    >
      {isFetchingNextPage ? (
        <Spinner className="!size-6 text-primary" />
      ) : (
        <span className="text-xs text-link">
          نمایش موارد بیشتر
        </span>
      )}
    </Button>
  );
};

export default LoadMore;
