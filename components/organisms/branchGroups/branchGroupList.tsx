import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

import BranchGroupMenu from "@components/molecules/branchGroupMenu";
import React from "react";
import { Spinner } from "@components/atoms/spinner";
import TableCell from "@components/molecules/tableCell";
import TableHead from "@components/molecules/tableHead";
import { branchIdAtom } from "@atom/branch";
import useGetPositions from "@hooks/position/useGetPositions";
import { useRecoilValue } from "recoil";

const BranchGroupList = () => {
  const getBranchId = useRecoilValue(branchIdAtom);

  const { data: getGroupOfBranch, isLoading } = useGetPositions(
    getBranchId!,
    20
  );

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
      <div className="w-full h-full flex justify-center items-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  return listLength ? (
    <div className="w-full overflow-auto border-[0.5px] border-normal rounded-lg">
      <table className="w-full overflow-hidden min-w-max">
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
