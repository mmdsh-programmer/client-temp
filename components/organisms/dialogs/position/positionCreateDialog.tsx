import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { UserIcon, XIcon } from "@components/atoms/icons";

import ChipMolecule from "@components/molecules/chip";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { IUserList } from "../document/documentAccessPublishingDialog";
import ImageComponent from "next/image";
import { useBranchStore } from "@store/branch";
import { positionSchema } from "./validation.yup";
import { toast } from "react-toastify";
import useCreatePosition from "@hooks/position/useCreatePosition";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface IForm {
  title: string;
  members?: string[];
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PositionCreateDialog = ({ setOpen }: IProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedUserList, setSelectedUserList] = useState<IUserList[]>([]);

  const getBranchId = useBranchStore((s) => {
    return s.branchId;
  });

  const setPositionForBranch = useCreatePosition();

  const form = useForm<IForm>({ resolver: yupResolver(positionSchema) });
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
    if (event.code === "Space" || event.code === "Enter" || event.code === "NumpadEnter") {
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
    // eslint-disable-next-line no-useless-escape
    const forbiddenRegex = /^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$/;
    if (forbiddenRegex.test(dataForm.title)) {
      toast.error("نام سمت شامل کاراکتر غیرمجاز است.");
      return;
    }
    if (!getBranchId) return;
    if (!selectedUserList.length) {
      return toast.error("اعضای سمت نمی تواند خالی باشد.");
    }
    const usernameArray = selectedUserList?.length
      ? selectedUserList.map((userItem) => {
          return userItem.username;
        })
      : [];

    setPositionForBranch.mutate({
      branchId: getBranchId,
      title: dataForm.title,
      members: usernameArray,
      callBack: () => {
        toast.success(`سمت ${dataForm.title} با موفقیت ساخته شد.`);
        handleClose();
      },
    });
  };

  return (
    <CreateDialog
      isPending={setPositionForBranch.isPending}
      dialogHeader="ایجاد سمت جدید"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">نام سمت</Typography>
          <FormInput placeholder="نام سمت" register={{ ...register("title") }} />
          {errors.title && (
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text">{errors.title?.message}</Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">اعضای سمت </Typography>
          <FormInput
            placeholder="نام کاربری را وارد کنید..."
            onKeyDown={handleSpaceClick}
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="flex flex-wrap gap-2">
            {selectedUserList.map((item) => {
              return (
                <ChipMolecule
                  key={item.username}
                  value={item.name || item.username}
                  className={`${item.name ? "bg-white !text-primary_normal" : "bg-gray-50 !text-hint"} w-auto border-[1px] border-normal pl-2`}
                  icon={
                    item.picture ? (
                      <ImageComponent
                        className="h-full w-full overflow-hidden rounded-full"
                        src={item.picture}
                        alt={item.picture}
                      />
                    ) : (
                      <UserIcon className="h-full w-full overflow-hidden rounded-full border-[1px] border-normal fill-icon-hover p-1" />
                    )
                  }
                  actionIcon={
                    <Button
                      {...({} as React.ComponentProps<typeof Button>)}
                      className="rounded-full bg-white p-1"
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
          {errors.members && (
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text">{errors.members?.message}</Typography>
          )}
        </div>
      </form>
    </CreateDialog>
  );
};

export default PositionCreateDialog;
