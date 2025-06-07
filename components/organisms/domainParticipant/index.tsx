import { AddIcon, DeleteIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import React, { useState } from "react";
import { Spinner } from "@components/atoms/spinner";
import AddDomainParticipantDialog from "../dialogs/domainParticipant/addDomainParticipantDialog";
import IconTextButton from "@components/molecules/iconTextButton/iconTextButton";
import RemoveDomainParticipantDialog from "../dialogs/domainParticipant/removeDomainParticipantDialog";
import SearchInput from "@components/molecules/searchInput";
import TableCell from "@components/molecules/tableCell";
import TableHead from "@components/molecules/tableHead";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";

const DomainParticipant = () => {
  const [openAddParticipantDialog, setOpenAddParticipantDialog] =
    useState(false);
  const [openDeleteParticipantDialog, setOpenDeleteParticipantDialog] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const { data: getDomainInfo, isLoading } = useGetDomainInfo();

  const listLength = getDomainInfo?.participants.length;

  const handleDeleteClick = (userName: string) => {
    setSelectedUser(userName);
    setOpenDeleteParticipantDialog(true);
  };

  const renderTableRows = () => {
    return getDomainInfo?.participants?.map((user) => {
      return (
        <TableCell
          key={`user-table-item-${user.ssoId}`}
          tableCell={[
            { data: user.name },
            {
              data: user.userName,
            },
            {
              data: (
                <Button
                  onClick={() => {
                    handleDeleteClick(user.userName);
                    setOpenDeleteParticipantDialog(true);
                  }}
                  className="bg-transparent p-0 flex items-center justify-center"
                >
                  <DeleteIcon className="h-5 w-5 stroke-red-normal" />
                </Button>
              ),
              className: "flex justify-end ml-5",
            },
          ]}
        />
      );
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner className="h-8 w-8 text-primary" />
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
          classNameButton=" rounded-lg h-9 !px-[6px] bg-secondary "
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
                },

                {
                  key: "action",
                  value: "عملیات",
                  className: "flex justify-end ml-5",
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
      {openDeleteParticipantDialog && selectedUser ? (
        <RemoveDomainParticipantDialog
          user={selectedUser}
          setOpen={setOpenDeleteParticipantDialog}
        />
      ) : null}
    </div>
  );
};

export default DomainParticipant;
