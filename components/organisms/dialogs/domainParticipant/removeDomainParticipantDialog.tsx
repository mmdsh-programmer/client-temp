import React from "react";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import useRemovePartyFromDomain from "@hooks/domainParticipants/useRemovePartyFromDomain";

interface IProps {
  user: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RemoveDomainParticipantDialog = ({ user, setOpen }: IProps) => {
  const { isPending, mutate } = useRemovePartyFromDomain();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    mutate({
      userNameList: [user],
    });
  };

  return (
    <DeleteDialog
      isPending={isPending}
      setOpen={handleClose}
      onSubmit={handleDelete}
      dialogHeader="حذف کاربر"
    >
      <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
        آیا از حذف"
        <span
          title={user}
          className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
        >
          {user}
        </span>
        " اطمینان دارید؟
      </div>
    </DeleteDialog>
  );
};

export default RemoveDomainParticipantDialog;
