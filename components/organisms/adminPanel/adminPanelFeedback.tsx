import React from "react";
import useGetAdminFeedback from "@hooks/admin/useGetAdminFeedback";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { IOfferResponse } from "@interface/offer.interface";
import AdminTableView from "./adminTableView";
import AdminMobileView from "./adminMobileView";
import Error from "../error";

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
    isFetching,
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
          error="خطا در دریافت اطلاعات"
        />
      </div>
    );
  }

  return (
    <>
      <div className="hidden xs:block">
        <AdminTableView {...commonProps} />
      </div>
      <div className="flex flex-col h-full min-h-[calc(100vh-340px)] xs:hidden gap-y-4 ">
        <AdminMobileView {...commonProps} />
      </div>
    </>
  );
};

export default AdminPanelFeedback;
