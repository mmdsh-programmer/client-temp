import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Spinner } from "@components/atoms/spinner";
import { UserIcon, XIcon } from "@components/atoms/icons";
import ChipMolecule from "@components/molecules/chip";
import EditDialog from "@components/templates/dialog/editDialog";
import FormInput from "@components/atoms/input/formInput";
import ImageComponent from "@components/atoms/image";
import SearchableDropdown from "@components/molecules/searchableDropdown";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { useRepositoryStore } from "@store/repository";
import { useGroupStore } from "@store/group";
import { toast } from "react-toastify";
import useEditGroup from "@hooks/group/useEditGroup";
import { useForm } from "react-hook-form";
import useGetGroupInfo from "@hooks/group/useGetGroupInfo";
import useGetRepoUsers from "@hooks/user/useGetRepoUsers";
import { userGroupSchema } from "./validation.yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ERoles } from "@interface/enums";

interface IForm {
  title: string;
  description?: string | null;
  members: string[];
}

interface IProps {
  setOpen: (open: boolean | null) => void;
}

const GroupEditDialog = ({ setOpen }: IProps) => {
  const getRepo = useRepositoryStore((s) => {
    return s.repo;
  });
  const group = useGroupStore((s) => {
    return s.selectedGroup;
  });

  const [updatedUsers, setUpdatedUsers] = useState<
    { username: string; picture: string | number | undefined }[]
  >([]);

  const { data: getUsers, isLoading } = useGetRepoUsers(getRepo!.id, 20, true);
  const { data: groupInfo, isFetching } = useGetGroupInfo(
    getRepo!.id,
    group!.title
  );
  const { isPending, mutate } = useEditGroup();

  const form = useForm<IForm>({ resolver: yupResolver(userGroupSchema), mode: "onChange" });
  const { reset, clearErrors, handleSubmit, register, formState, setValue } =
    form;
  const { errors, isValid } = formState;

  const filteredUsers = getUsers?.pages
    .map((page) => {
      return page?.list.filter((user) => {
        return updatedUsers?.every((groupUser) => {
          return groupUser.username !== user.userInfo.userName;
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

  const onSubmit = async (dataForm: IForm) => {
    if (!getRepo || !group) return;
    if (!updatedUsers.length) {
      return toast.error("لیست اعضای گروه نباید خالی باشد.");
    }

    mutate({
      repoId: getRepo!.id,
      title: group.title,
      description: dataForm.description || "",
      newTitle: dataForm.title,
      members: updatedUsers.map((user) => {
        return user.username;
      }),
      callBack: () => {
        toast.success("گروه با موفقیت ویرایش شد.");
        handleClose();
      },
    });
  };

  const handleDelete = (username: string) => {
    const newUsers = updatedUsers.filter((user) => { return user.username !== username; });

    setUpdatedUsers(newUsers);

    setValue(
      "members",
      newUsers.map((user) => { return user.username; }),
      {
        shouldValidate: true,
        shouldDirty: true
      }
    );
  };

  useEffect(() => {
    if (getUsers && groupInfo) {
      const allUsers = getUsers.pages.flatMap((page) => { return page?.list || []; });
      const oldUsers = allUsers.filter((user) => {
        return groupInfo.members.list.some((groupUser) => { return groupUser.preferred_username === user.userInfo.userName; });
      }
      );

      const updatedUserList = oldUsers.map((member) => {
        return {
          username: member.userInfo.userName,
          picture: member.userInfo.img,
        };
      });

      setUpdatedUsers(updatedUserList);

      setValue("title", group?.title || "");
      setValue("description", group?.description || "");
      setValue("members", updatedUserList.map(u => { return u.username; }), {
        shouldValidate: true
      });
    }
  }, [getUsers, groupInfo, group, setValue]);

  return (
    <EditDialog
      isPending={isPending}
      dialogHeader="ویرایش گروه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="repo-group-edit-dialog xs:!min-w-[450px] xs:!max-w-[450px]"
      disabled={getRepo?.roleName !== ERoles.owner || !isValid}
    >
      <form className="repo-group-edit-form flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label"> نام گروه </Typography>
          <FormInput
            placeholder="نام گروه"
            register={{ ...register("title", { value: group?.title }) }}
            className="repo-group-edit-form__input"
          />
          {errors.title && (
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text">
              {errors.title?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">توضیحات گروه</Typography>
          <TextareaAtom
            placeholder="توضیحات گروه"
            register={{
              ...register("description", { value: group?.description }),
            }}
            className="repo-group-edit-form__textarea"
          />
          {errors.description && (
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text">
              {errors.description?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2 repo-group-edit-form__members">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label"> اعضای گروه</Typography>
          <SearchableDropdown
            background="!bg-gray-50"
            options={filteredUsers}
            handleSelect={(val) => {
              if (val) {
                const newUsers = [
                  ...updatedUsers,
                  { username: val.label, picture: val.value || undefined }
                ];
                setUpdatedUsers(newUsers);

                setValue("members", newUsers.map(u => { return u.username; }), {
                  shouldValidate: true,
                  shouldDirty: true
                });
              }
            }}
          />
          {errors.members && (
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text">
              {errors.members?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-wrap gap-2 group-edit-form__members-list">
          {isLoading || isFetching ? (
            <Spinner className="h-4 w-4 text-primary" />
          ) : (
            updatedUsers?.map((item) => {
              return (
                <ChipMolecule
                  key={item.username}
                  value={`${item.username}`}
                  className="group-edit-form__members-item w-auto border-[1px] border-normal pl-2 text-primary_normal"
                  icon={
                    item.picture ? (
                      <ImageComponent
                        className="w-full h-full rounded-full overflow-hidden"
                        src={item.picture.toString()}
                        alt={item.picture.toString()}
                      />
                    ) : (
                      <UserIcon className="w-full h-full p-1 border-[1px] border-normal rounded-full overflow-hidden fill-icon-hover" />
                    )
                  }
                  actionIcon={
                    <Button
                      {...({} as React.ComponentProps<typeof Button>)}
                      className="group-edit-form__member-delete-button bg-transparent p-0"
                      onClick={() => {
                        handleDelete(item.username);
                      }}
                    >
                      <XIcon className="h-4 w-4 fill-icon-active" />
                    </Button>
                  }
                />
              );
            })
          )}
        </div>
      </form>
    </EditDialog>
  );
};

export default GroupEditDialog;
