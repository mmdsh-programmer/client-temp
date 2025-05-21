import { Spinner, Typography } from "@material-tailwind/react";

import BranchCollapse from "../../molecules/branchCollapse";
import Error from "../error";
import LoadMore from "@components/molecules/loadMore";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import { branchIdAtom } from "@atom/branch";
import useGetBranchList from "@hooks/branch/useGetBranchList";
import useGetUser from "@hooks/auth/useGetUser";
import { useRecoilValue } from "recoil";

interface IProps {
  branchId: number | null;
}

const BranchList = ({ branchId }: IProps) => {
  const getBranchId = useRecoilValue(branchIdAtom);
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
        <div className="w-full flex justify-center h-3 my-3">
          <Spinner className="w-4 h-4" color="deep-purple" />
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
            <div className="flex items-center w-full">
              <Typography className="text-right text-xs pr-4 py-1 text-dashboard-text-color-light">
                موردی وجود ندارد
              </Typography>
            </div>
          );
        })
      )}
      <RenderIf isTrue={!!hasNextPage}>
        <LoadMore
          className="self-center !shadow-none underline xl:bg-primary text-[10px] text-primary_normal !font-normal"
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </RenderIf>
    </>
  );
};

export default BranchList;
