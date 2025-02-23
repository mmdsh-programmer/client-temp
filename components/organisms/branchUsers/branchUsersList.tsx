import React from "react";
import { branchIdAtom } from "@atom/branch";
import { useRecoilValue } from "recoil";
import TableHead from "@components/molecules/tableHead";
import TableCell from "@components/molecules/tableCell";
import { Spinner } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import useGetBranchUsers from "@hooks/branch/useGetBranchUsers";

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
        <Spinner className="h-8 w-8" color="deep-purple" />
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
