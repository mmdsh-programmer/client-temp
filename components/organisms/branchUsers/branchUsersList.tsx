import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

import React from "react";
import { Spinner } from "@material-tailwind/react";
import TableCell from "@components/molecules/tableCell";
import TableHead from "@components/molecules/tableHead";
import { branchIdAtom } from "@atom/branch";
import useGetBranchUsers from "@hooks/branch/useGetBranchUsers";
import { useRecoilValue } from "recoil";

const BranchUserList = () => {
  const getBranchId = useRecoilValue(branchIdAtom);

  const { data: getBranchUsers, isLoading } = useGetBranchUsers(
    getBranchId!,
    20
  );

  const listLength = getBranchUsers?.pages[0].total;

  const renderTableRows = () => {
    return getBranchUsers?.pages.map((page) => {
      return page.list.map((user) => {
        return (
          <TableCell
            key={`user-table-item-${user.user.id}`}
            tableCell={[
              { data: `${user.user.given_name} ${user.user.family_name}` },
              {
                data: user.user.preferred_username,
                className: "flex justify-center",
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
        <Spinner className="h-8 w-8" color="purple" />
      </div>
    );
  }

  return listLength ? (
    <div className="w-full overflow-auto border-[0.5px] border-normal rounded-lg">
      <table className="w-full overflow-hidden min-w-max">
        <TableHead
          tableHead={[
            { key: "name", value: "نام و نام خانوادگی" },
            {
              key: "username",
              value: "حساب پادی",
              className: "flex justify-center",
            },
          ]}
        />
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  ) : (
    <EmptyList type={EEmptyList.BRANCH_USERS} />
  );
};

export default BranchUserList;
