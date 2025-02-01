import React, { useState } from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { branchIdAtom } from "@atom/branch";
import useCreatePosition from "@hooks/position/useCreatePosition";
import { IUserList } from "../document/documentAccessPublishingDialog";
import { UserIcon, XIcon } from "@components/atoms/icons";
import ImageComponent from "next/image";
import ChipMolecule from "@components/molecules/chip";

interface IForm {
  title: string;
  members: string[];
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PositionCreateDialog = ({ setOpen }: IProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedUserList, setSelectedUserList] = useState<IUserList[]>([]);

  const getBranchId = useRecoilValue(branchIdAtom);

  const setPositionForBranch = useCreatePosition();

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

  const handleSpaceClick = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      event.code === "Space" ||
      event.code === "Enter" ||
      event.code === "NumpadEnter"
    ) {
      event.preventDefault();
      if (inputValue.length) {
        setSelectedUserList((oldValue) => {
          return [...oldValue, { username: inputValue }];
        });
        setInputValue("");
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const removeUser = (username: string) => {
    const updatedUserList = selectedUserList.filter((item) => {
      return username !== item.username;
    });
    setSelectedUserList(updatedUserList);
  };

  const onSubmit = async (dataForm: IForm) => {
    if (!getBranchId) return;
    setPositionForBranch.mutate({
      branchId: getBranchId,
      title: dataForm.title,
      members: [],
    });
  };

  return (
    <CreateDialog
      isPending={setPositionForBranch.isPending}
      dialogHeader="ایجاد گروه برای شعبه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography className="form_label">نام گروه</Typography>
          <FormInput
            placeholder="نام گروه"
            register={{ ...register("title") }}
          />
          {errors.title && (
            <Typography className="warning_text">
              {errors.title?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="form_label">اعضای گروه </Typography>
          <FormInput
            placeholder="نام کاربری را وارد کنید..."
            onKeyDown={handleSpaceClick}
            value={inputValue}
            onChange={handleInputChange}
          />
          {selectedUserList.map((item) => {
            return (
              <ChipMolecule
                key={item.username}
                value={item.name || item.username}
                className={`${item.name ? "bg-white !text-primary" : "bg-gray-50 !text-hint"} 
                         w-auto pl-2 border-[1px] border-normal`}
                icon={
                  item.picture ? (
                    <ImageComponent
                      className="w-full h-full rounded-full overflow-hidden"
                      src={item.picture}
                      alt={item.picture}
                    />
                  ) : (
                    <UserIcon className="w-full h-full p-1 border-[1px] border-normal rounded-full overflow-hidden fill-icon-hover" />
                  )
                }
                actionIcon={
                  <Button
                    className="bg-transparent p-0"
                    onClick={() => {
                      removeUser(item.username);
                    }}
                  >
                    <XIcon
                      className={`${item.name ? "fill-icon-active" : "fill-icon-hover"} h-4 w-4`}
                    />
                  </Button>
                }
              />
            );
          })}
        </div>
      </form>
    </CreateDialog>
  );
};

export default PositionCreateDialog;
