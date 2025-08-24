import React from "react";
import MobileCard from "@components/molecules/mobileCard";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { Spinner } from "@components/atoms/spinner";
import BranchGroupMenu from "@components/molecules/branchGroupMenu";
import useGetPositions from "@hooks/position/useGetPositions";
import { useBranchStore } from "@store/branch";

const BranchGroupsMobileView = () => {
  const getBranchId = useBranchStore((s) => {
    return s.branchId;
  });

  const { data: getGroupOfBranch, isLoading } = useGetPositions(getBranchId!, 20);

  const listLength = getGroupOfBranch?.pages[0].total;

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
        {getGroupOfBranch?.pages.map((page) => {
          return page.list.map((group) => {
            return (
              <MobileCard
                key={`group-mobile-item-${group.groupId}`}
                name={group.title}
                cardAction={<BranchGroupMenu group={group} />}
                description={[
                  {
                    title: "groupPath",
                    value: group.groupPath || "--",
                  },
                ]}
              />
            );
          });
        })}
      </div>
    );
  }

  return <EmptyList type={EEmptyList.BRANCH_GROUP} />;
};

export default BranchGroupsMobileView;
