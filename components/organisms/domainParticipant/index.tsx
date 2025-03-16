import React, { useState } from "react";
import TableHead from "@components/molecules/tableHead";
import TableCell from "@components/molecules/tableCell";
import { Spinner } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import SearchInput from "@components/molecules/searchInput";
import { AddIcon } from "@components/atoms/icons";
import IconTextButton from "@components/molecules/iconTextButton/iconTextButton";
import AddDomainParticipantDialog from "../dialogs/domainParticipant/addDomainParticipantDialog";

const DomainParticipant = () => {
  const [openAddParticipantDialog, setOpenAddParticipantDialog] =
    useState(false);
  const { data: getDomainInfo, isLoading } = useGetDomainInfo();

  const listLength = getDomainInfo?.participants.length;

  const renderTableRows = () => {
    return getDomainInfo?.participants?.map((user) => {
      return (
        <TableCell
          key={`user-table-item-${user.ssoId}`}
          tableCell={[
            { data: user.name },
            {
              data: user.userName,
              className: "flex justify-center",
            },
          ]}
        />
      );
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner className="h-8 w-8" color="deep-purple" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full pb-5 px-5">
      <div className="h-[76px] min-h-[76px] flex justify-between items-center">
        <SearchInput />
        <IconTextButton
          text="افزودن کاربر جدید"
          icon={<AddIcon className="h-5 w-5 stroke-white pr-1" />}
          classNameText="text-white text-[13px] leading-[19.5px] -tracking-[0.13px] font-medium !px-2  font-iranYekan"
          classNameButton=" rounded-lg h-9 !px-[6px] bg-purple-normal "
          onClick={() => {
            return setOpenAddParticipantDialog(true);
          }}
        />
      </div>
      {listLength ? (
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
        <EmptyList type={EEmptyList.DOMAIN_USERS} />
      )}
      {openAddParticipantDialog ? (
        <AddDomainParticipantDialog setOpen={setOpenAddParticipantDialog} />
      ) : null}
    </div>
  );
};

export default DomainParticipant;
