import React from "react";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import AdminMobileView from "./adminMobileView";
import AdminTableView from "./adminTableView";
import Error from "../error";
import { IOfferResponse } from "@interface/offer.interface";
import useGetAdminFeedback from "@hooks/admin/useGetAdminFeedback";
import { Typography } from "@material-tailwind/react";

export interface IFeedbackView {
  isLoading: boolean;
  getFeedback: InfiniteData<IOfferResponse, unknown> | undefined;
  hasNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<IOfferResponse, unknown>, Error>
  >;
  isFetchingNextPage: boolean;
  isFetching?: boolean;
}

const AdminPanelFeedback = () => {
  const {
    data: getFeedback,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    error,
  } = useGetAdminFeedback(10);

  const commonProps: IFeedbackView = {
    isLoading,
    getFeedback,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Error
          retry={() => {
            return refetch();
          }}
          error={{ message: "خطا در دریافت اطلاعات" }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 !m-4 xs:!m-0">
      <Typography {...({} as React.ComponentProps<typeof Typography>)} className="title_t1">لیست بازخوردها</Typography>
      <div className="hidden xs:block">
        <AdminTableView {...commonProps} />
      </div>
      <div className="flex flex-col h-full xs:hidden gap-y-4 ">
        <AdminMobileView {...commonProps} />
      </div>
    </div>
  );
};

export default AdminPanelFeedback;
