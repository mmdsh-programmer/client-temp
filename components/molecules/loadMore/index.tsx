import React, { useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

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
  }, [inView]);

  return (
    <Button
      ref={ref}
      placeholder="load more"
      className={`${className} mt-2 bg-transparent p-0 shadow-none hover:shadow-none`}
      onClick={() => {
        fetchNextPage();
      }}
      disabled={isFetchingNextPage}
    >
      {isFetchingNextPage ? (
        <div className="spinner" />
      ) : (
        <Typography
          placeholder=""
          className="font-iranYekan text-gray-600 text-xs"
        >
          نمایش موارد بیشتر
        </Typography>
      )}
    </Button>
  );
};

export default LoadMore;
