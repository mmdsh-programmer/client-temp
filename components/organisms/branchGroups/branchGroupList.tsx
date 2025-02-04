import React from "react";
import { branchIdAtom } from "@atom/branch";
import { useRecoilValue } from "recoil";
import useGetPositions from "@hooks/position/useGetPositions";
import TableHead from "@components/molecules/tableHead";
import TableCell from "@components/molecules/tableCell";
import BranchGroupMenu from "@components/molecules/branchGroupMenu";
import { Spinner } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

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
        <Spinner className="h-8 w-8" color="deep-purple" />
      </div>
    );
  }

  return listLength ? (
    <div className="w-full overflow-auto border-[0.5px] border-normal rounded-lg">
      <table className="w-full overflow-hidden min-w-max">
        <TableHead
          tableHead={[
            { key: "name", value: "نام گروه", isSorted: true },
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
