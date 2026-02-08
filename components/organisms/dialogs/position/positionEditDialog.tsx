import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { UserIcon, XIcon } from "@components/atoms/icons";

import ChipMolecule from "@components/molecules/chip";
import EditDialog from "@components/templates/dialog/editDialog";
import FormInput from "@components/atoms/input/formInput";
import { IPosition } from "@interface/position.interface";
import { IUserList } from "../document/documentAccessPublishingDialog";
import ImageComponent from "@components/atoms/image";
import { useBranchStore } from "@store/branch";
import { positionSchema } from "./validation.yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useGetPositionInfo from "@hooks/position/useGetPositionInfo";
import useUpdatePosition from "@hooks/position/useUpdatePosition";
import { yupResolver } from "@hookform/resolvers/yup";

interface IForm {
  title: string;
  members?: string[];
}

interface IProps {
  group: IPosition;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PositionEditDialog = ({ group, setOpen }: IProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedUserList, setSelectedUserList] = useState<IUserList[]>([]);

  const getBranchId = useBranchStore((s) => {
    return s.branchId;
  });

  const { data: groupInfo } = useGetPositionInfo(
    getBranchId!,
    group.groupPath
  );

  const updatePosition = useUpdatePosition();

  const form = useForm<IForm>({ resolver: yupResolver(positionSchema), mode: "onChange" });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
    const usernameArray = selectedUserList?.length
      ? selectedUserList.map((userItem) => {
          return userItem.username;
        })
      : [];

    updatePosition.mutate({
      branchId: getBranchId,
      positionName: group.groupPath,
      title: dataForm.title,
      members: usernameArray,
      callBack: () => {
        toast.success(`سمت ${dataForm.title} با موفقیت بروزرسانی شد.`);
        handleClose();
      },
    });
  };

  useEffect(() => {
    setSelectedUserList([]);
    groupInfo?.members.map((item) => {
      return setSelectedUserList((preValue) => {
        return [
          ...preValue,
          {
            username: item.preferred_username,
            name: item.family_name,
            picture: item.picture,
          },
        ];
      });
    });
  }, [groupInfo]);

  return (
    <EditDialog
      isPending={updatePosition.isPending}
      dialogHeader="ویرایش سمت"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
      disabled={!isValid}
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">نام سمت</Typography>
          <FormInput
            placeholder="نام سمت"
            register={{
              ...register("title", {
                value: group.title,
              }),
            }}
          />
          {errors.title && (
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text">
              {errors.title?.message}
            </Typography>
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
                  className={`${item.name ? "bg-white !text-primary_normal" : "bg-gray-50 !text-hint"} 
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
                      {...({} as React.ComponentProps<typeof Button>)}
                      className="bg-white p-1 rounded-full"
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
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text">
              {errors.members?.message}
            </Typography>
          )}
        </div>
      </form>
    </EditDialog>
  );
};

export default PositionEditDialog;
