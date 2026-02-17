import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { UserIcon, XIcon } from "@components/atoms/icons";

import ChipMolecule from "@components/molecules/chip";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import ImageComponent from "@components/atoms/image";
import SearchableDropdown from "@components/molecules/searchableDropdown";
import TextareaAtom from "@/components/atoms/textarea";
import { useRepositoryStore } from "@store/repository";
import { toast } from "react-toastify";
import useCreateGroup from "@hooks/group/useCreateGroup";
import { useForm } from "react-hook-form";
import useGetRepoUsers from "@hooks/user/useGetRepoUsers";
import { userGroupSchema } from "./validation.yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IForm {
  title: string;
  description?: string | null;
  members: string[];
}

interface IProps {
  setOpen: (open: boolean | null) => void;
}

const GroupCreateDialog = ({ setOpen }: IProps) => {
  const getRepo = useRepositoryStore((s) => {
    return s.repo;
  });
  const [updatedUsers, setUpdatedUsers] = useState<
    { username: string; picture: string | number | undefined }[]
  >([]);

  const { data: getUsers } = useGetRepoUsers(getRepo!.id, 20, true);
  const { isPending, mutate } = useCreateGroup();
  const form = useForm<IForm>({ resolver: yupResolver(userGroupSchema), mode: "onChange" });

  const { register, handleSubmit, formState, reset, clearErrors, setValue } = form;
  const { errors, isValid } = formState;

  const filteredUsers = getUsers?.pages
    .map((page) => {
      return page?.list.filter((user) => {
        return updatedUsers.every((filteredUser) => {
          return filteredUser.username !== user.userInfo.userName;
        });
      });
    })[0]
    .filter((user) => {
      return user.userRole !== "owner";
    })
    .map((item) => {
      return {
        label: item.userInfo.userName,
        value: item.userInfo.img,
      };
    });

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
    setUpdatedUsers([]);
  };

  const handleDelete = (username: string) => {
    setUpdatedUsers((oldValue) => {
      const newUsers = oldValue.filter((user) => { return user.username !== username; });
      setValue(
        "members",
        newUsers.map(u => { return u.username; }),
        { shouldValidate: true, shouldDirty: true }
      );

      return newUsers;
    });
  };

  const onSubmit = async (dataForm: IForm) => {
    if (!getRepo) return;
    if (!updatedUsers) return toast.error("لیست اعضای گروه نباید خالی باشد.");
    mutate({
      repoId: getRepo.id,
      title: dataForm.title,
      description: dataForm.description || "",
      members: updatedUsers.map((user) => {
        return user.username;
      }),
      callBack: () => {
        toast.success("گروه با موفقیت ایجاد شد.");
        handleClose();
      },
    });
  };

  return (
    <CreateDialog
      isPending={isPending}
      dialogHeader="ایجاد گروه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="repo-group-create-dialog xs:!min-w-[450px] xs:!max-w-[450px]"
      backToMain
      disabled={!isValid}
    >
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label"> نام گروه </Typography>
          <FormInput
            placeholder="نام گروه"
            register={{ ...register("title") }}
            className="repo-group-create-form__input"
          />
          {errors.title && (
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text">{errors.title?.message}</Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">توضیحات گروه</Typography>
          <TextareaAtom
            placeholder="توضیحات گروه"
            { ...register("description") }
            className="repo-group-create-form__textarea"
          />
          {errors.description && (
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text">{errors.description?.message}</Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label"> اعضای گروه</Typography>
          <SearchableDropdown
            background="!bg-gray-50"
            options={filteredUsers}
            handleSelect={(val) => {
              if (val) {
                const newUpdatedUsers = [
                  ...updatedUsers,
                  {
                    username: val.label,
                    picture: val.value || undefined,
                  },
                ];
                setUpdatedUsers(newUpdatedUsers);
                setValue(
                  "members",
                  newUpdatedUsers.map((user) => { return user.username; }),
                  { shouldValidate: true, shouldDirty: true }
                );
              }
            }}
          />
          {errors.members && (
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text">{errors.members?.message}</Typography>
          )}
        </div>
        <div className="group-create-form__members-list flex flex-wrap gap-2">
          {updatedUsers.map((item) => {
            return (
              <ChipMolecule
                key={item.username}
                value={`${item.username}`}
                className="group-create-form__members-item w-auto border-[1px] border-normal pl-2 text-primary_normal"
                icon={
                  item?.picture ? (
                    <ImageComponent
                      className="h-full w-full overflow-hidden rounded-full"
                      src={item.picture.toString()}
                      alt={item.picture.toString()}
                    />
                  ) : (
                    <UserIcon className="h-full w-full overflow-hidden rounded-full border-[1px] border-normal fill-icon-hover p-1" />
                  )
                }
                actionIcon={
                  <Button
                    {...({} as React.ComponentProps<typeof Button>)}
                    className="group-create-form__member-delete-button bg-transparent p-0"
                    onClick={() => {
                      handleDelete(item.username);
                    }}
                  >
                    <XIcon className="h-4 w-4 fill-icon-active" />
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

export default GroupCreateDialog;
