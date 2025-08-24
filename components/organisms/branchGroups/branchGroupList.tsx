import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import BranchGroupMenu from "@components/molecules/branchGroupMenu";
import { Spinner } from "@components/atoms/spinner";
import TableCell from "@components/molecules/tableCell";
import TableHead from "@components/molecules/tableHead";
import { useBranchStore } from "@store/branch";
import useGetPositions from "@hooks/position/useGetPositions";

const BranchGroupList = () => {
  const getBranchId = useBranchStore((s) => {
    return s.branchId;
  });

  const { data: getGroupOfBranch, isLoading } = useGetPositions(getBranchId!, 20);

  const listLength = getGroupOfBranch?.pages[0].total;

  const renderTableRows = () => {
    return getGroupOfBranch?.pages.map((page) => {
      return page.list.map((group) => {
        return (
          <TableCell
            key={`group-table-item-${group.groupId}`}
            tableCell={[
              { data: group.title },
              {
                data: <BranchGroupMenu group={group} />,
                stopPropagation: true,
              },
            ]}
          />
        );
      });
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  return listLength ? (
    <div className="w-full overflow-auto rounded-lg border-[0.5px] border-normal">
      <table className="w-full min-w-max overflow-hidden">
        <TableHead
          tableHead={[
            { key: "name", value: "نام سمت" },
            {
              key: "action",
              value: "عملیات",
              className: "justify-end",
            },
          ]}
        />
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  ) : (
    <EmptyList type={EEmptyList.BRANCH_GROUP} />
  );
};

export default BranchGroupList;
