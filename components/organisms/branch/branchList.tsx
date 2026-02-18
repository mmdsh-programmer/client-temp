"use client";

import React from "react";
import BranchCollapse from "@components/molecules/branchCollapse";
import Error from "@components/organisms/error";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import useGetBranchList from "@hooks/branch/useGetBranchList";
import useGetUser from "@hooks/auth/useGetUser";
import { Spinner } from "@components/ui/spinner";
import { useBranchStore } from "@store/branch";

interface IProps {
  branchId: number | null;
}

const BranchList = ({ branchId }: IProps) => {
  const { branchId: getBranchId } = useBranchStore();
  const { data: userInfo } = useGetUser();

  const {
    data: branchList,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
    refetch,
  } = useGetBranchList(branchId || undefined, userInfo?.ssoId || undefined, 10);

  if (isError) {
    return (
      <div>
        <Error
          error={error}
          retry={() => {
            refetch();
          }}
        />
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="my-3 flex h-3 w-full justify-center">
          <Spinner className="size-4 text-primary" />
        </div>
      ) : (
        branchList?.pages.map((page) => {
          return page?.list?.length ? (
            page?.list.map((childItem) => {
              return (
                <BranchCollapse
                  isActive={childItem.id === getBranchId}
                  key={`branch-${childItem.id}`}
                  childItem={childItem}
                >
                  <BranchList branchId={childItem.id} />
                </BranchCollapse>
              );
            })
          ) : (
            <div className="flex w-full items-center">
              <span className="text-dashboard-text-color-light block w-full py-1 pr-4 text-right text-xs">
                موردی وجود ندارد
              </span>
            </div>
          );
        })
      )}
      <RenderIf isTrue={!!hasNextPage}>
        <LoadMore
          className="self-center text-[10px] !font-normal text-primary_normal underline !shadow-none xl:bg-primary"
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </RenderIf>
    </>
  );
};

export default BranchList;
