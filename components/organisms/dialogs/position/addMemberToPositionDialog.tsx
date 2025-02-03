import React, { useState } from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { branchIdAtom } from "@atom/branch";
import useGetPositions from "@hooks/position/useGetPositions";
import useAddMembers from "@hooks/position/useAddMembers";
import SelectAtom, { IOption } from "@components/molecules/select";

interface IForm {
  username: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMemberToPositionDialog = ({ setOpen }: IProps) => {
const [group, setGroup] = useState<IOption>();
  const getBranchId = useRecoilValue(branchIdAtom);

  const { data: getGroupOfBranch, isLoading } = useGetPositions(
    getBranchId!,
    20
  );
  const addMember = useAddMembers();

  const groupOptions =
    getGroupOfBranch?.pages[0].list.map((group) => {
      return { label: group.title, value: group.groupId };
    }) || [];

  const form = useForm<IForm>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = form;

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };


  const onSubmit = async (dataForm: IForm) => {
    if (!getBranchId || !group) return;

    addMember.mutate({
      branchId: getBranchId,
      positionName: (group?.value).toString(),
      members: [dataForm.username],
      //   callBack: () => {
      //     toast.success(`گروه ${dataForm.title} با موفقیت ساخته شد.`);
      //   },
    });
  };

  return (
    <CreateDialog
      isPending={addMember.isPending}
      dialogHeader="افزودن کاربر جدید"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography className="form_label">نام کاربری</Typography>
          <FormInput
            placeholder="نام کاربری"
            register={{ ...register("username") }}
          />
          {errors.username && (
            <Typography className="warning_text">
              {errors.username?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="form_label">انتخاب گروه </Typography>
          <SelectAtom
            options={groupOptions}
            className="h-12 xs:!h-10 pl-1 pr-2 !w-full bg-white border-[2px] border-normal justify-between"
            setSelectedOption={setGroup}
            defaultOption={{ value: "انتخاب کنید", label: "انتخاب کنید" }}
            selectedOption={group}
          />
        </div>
      </form>
    </CreateDialog>
  );
};

export default AddMemberToPositionDialog;
