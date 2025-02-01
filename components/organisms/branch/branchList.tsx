import React from "react";
import useGetUser from "@hooks/auth/useGetUser";
import useGetBranchList from "@hooks/branch/useGetBranchList";
import Error from "../error";
import { Spinner, Typography } from "@material-tailwind/react";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";
import BranchCollapse from "./branchCollapse";
import { useRecoilValue } from "recoil";
import { branchIdAtom } from "@atom/branch";

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
        <div className="loader w-full flex justify-center h-3 my-3">
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
            <div className="flex items-center">
              <Typography className="text-right text-xs pr-4 py-1 text-dashboard-text-color-light">
                موردی وجود ندارد
              </Typography>
            </div>
          );
        })
      )}
      <RenderIf isTrue={!!hasNextPage}>
        <LoadMore
          className="self-center !shadow-none underline xl:bg-primary text-[10px] text-primary !font-normal"
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </RenderIf>
    </>
  );
};

export default BranchList;
