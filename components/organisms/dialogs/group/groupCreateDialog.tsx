import {
 Button,
 Typography
} from "@material-tailwind/react";
import React, { useState } from "react";
import {
 UserIcon,
 XIcon
} from "@components/atoms/icons";

import ChipMolecule from "@components/molecules/chip";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import ImageComponent from "@components/atoms/image";
import SearchableDropdown from "@components/molecules/searchableDropdown";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useCreateGroup from "@hooks/group/useCreateGroup";
import { useForm } from "react-hook-form";
import useGetRepoUsers from "@hooks/user/useGetRepoUsers";
import { useRecoilValue } from "recoil";
import { userGroupSchema } from "./validation.yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IForm {
  title: string;
  description?: string;
  members: string[];
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const GroupCreateDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const [updatedUsers, setUpdatedUsers] = useState<
    { username: string; picture: string }[]
  >([]);

  const { data: getUsers } = useGetRepoUsers(getRepo!.id, 2, true);
  const {
 isPending, mutate 
} = useCreateGroup();
  const form = useForm<IForm>({ resolver: yupResolver(userGroupSchema) });

  const {
 register, handleSubmit, formState, reset, clearErrors 
} = form;
  const { errors } = formState;

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
      return [
        ...oldValue.filter((user) => {
          return user.username !== username;
        }),
      ];
    });
  };

  const onSubmit = async (dataForm: IForm) => {
    if (!getRepo) return;
    if (!updatedUsers) return toast.error("لیست اعضای گروه نباید خالی باشد.");
    mutate({
      repoId: getRepo!.id,
      title: dataForm.title,
      description: dataForm.description,
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
      className="xs:!min-w-[450px] xs:!max-w-[450px]"
      backToMain
    >
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Typography className="form_label"> نام گروه </Typography>
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
          <Typography className="form_label">توضیحات گروه</Typography>
          <TextareaAtom
            placeholder="توضیحات گروه"
            register={{ ...register("description") }}
          />
          {errors.description && (
            <Typography className="warning_text">
              {errors.description?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="form_label"> اعضای گروه</Typography>
          <SearchableDropdown
            background="gray-50"
            options={filteredUsers}
            handleChange={(val) => {
              if (val) {
                setUpdatedUsers((oldValue) => {
                  return [
                    ...oldValue,
                    {
                      username: val.label,
                      picture: `${val.value}`,
                    },
                  ];
                });
              }
            }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {updatedUsers.map((item) => {
            return (
              <ChipMolecule
                key={item.username}
                value={`${item.username}`}
                className="w-auto border-[1px] border-normal pl-2 text-primary"
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
