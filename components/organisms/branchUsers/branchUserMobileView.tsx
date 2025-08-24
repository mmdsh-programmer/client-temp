import React from "react";
import MobileCard from "@components/molecules/mobileCard";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { Spinner } from "@components/atoms/spinner";
import useGetBranchUsers from "@hooks/branch/useGetBranchUsers";
import { useBranchStore } from "@store/branch";

const BranchUsersMobileView = () => {
  const getBranchId = useBranchStore((s) => {
    return s.branchId;
  });

  const { data: getBranchUsers, isLoading } = useGetBranchUsers(getBranchId!, 20);

  const listLength = getBranchUsers?.pages[0].total;

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  if (listLength) {
    return (
      <div className="flex flex-col gap-3">
        {getBranchUsers?.pages.map((page) => {
          return page.list.map((user) => {
            return (
              <MobileCard
                key={`user-mobile-item-${user.user.id}`}
                name={`${user.user.given_name} ${user.user.family_name}`}
                description={[
                  {
                    title: "حساب پادی",
                    value: user.user.preferred_username || "--",
                  },
                ]}
              />
            );
          });
        })}
      </div>
    );
  }

  return <EmptyList type={EEmptyList.BRANCH_USERS} />;
};

export default BranchUsersMobileView;
