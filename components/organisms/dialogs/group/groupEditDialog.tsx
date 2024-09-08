import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import EditDialog from "@components/templates/dialog/editDialog";
import { repoAtom } from "@atom/repository";
import useEditGroup from "@hooks/group/useEditGroup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormInput from "@components/atoms/input/formInput";
import { selectedGroupAtom } from "@atom/group";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import TextareaAtom from "@components/atoms/textarea/textarea";
import ChipMolecule from "@components/molecules/chip";
import { UserIcon, XIcon } from "@components/atoms/icons";
import { userGroupSchema } from "./validation.yup";
import useGetGroupInfo from "@hooks/group/useGetGroupInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import SearchableDropdown from "@components/molecules/searchableDropdown";
import useGetRepoUsers from "@hooks/user/useGetRepoUsers";
import ImageComponent from "@components/atoms/image";

interface IForm {
  title: string;
  description?: string;
  members: string[];
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const GroupEditDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const group = useRecoilValue(selectedGroupAtom);

  const [updatedUsers, setUpdatedUsers] = useState<
    { username: string; picture: string }[] | undefined
  >([]);

  const { data: getUsers, isLoading } = useGetRepoUsers(getRepo!.id, 20, true);
  const { data: groupInfo, isFetching } = useGetGroupInfo(
    getRepo!.id,
    group!.title
  );
  const { isPending, mutate } = useEditGroup();

  const form = useForm<IForm>({
    resolver: yupResolver(userGroupSchema),
  });
  const { reset, clearErrors, handleSubmit, register, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    const allUsers = getUsers?.pages.flatMap((page) => page?.list || []);

    const oldUsers = allUsers?.filter((user) =>
      groupInfo?.members.list.some(
        (groupUser) => groupUser.preferred_username === user.userInfo.userName
      )
    );

    const updatedUserList = oldUsers?.map((member) => ({
      username: member.userInfo.userName,
      picture: member.userInfo.img,
    }));

    setUpdatedUsers(updatedUserList);
  }, [getUsers, groupInfo]);

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
        value: { username: item.userInfo.userName, picture: item.userInfo.img },
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
    if (!getRepo) return;
    if (!updatedUsers) return toast.error("لیست اعضای گروه نباید خالی باشد.")
    mutate({
      repoId: getRepo!.id,
      title: dataForm.title,
      description: dataForm.description,
      members: updatedUsers?.map((user) => {
        return user.username;
      }),
      callBack: () => {
        toast.success("گروه با موفقیت ویرایش شد.");
        handleClose();
      },
    });
  };

  const handleDelete = (username: string) => {
    setUpdatedUsers((oldValue) => {
      if (!oldValue) {
        return [];
      }
      return [
        ...oldValue?.filter((user) => {
          return user.username !== username;
        }),
      ];
    });
  };

  return (
    <EditDialog
      isPending={isPending}
      dialogHeader={"ویرایش گروه"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="xs:!min-w-[450px] xs:!max-w-[450px]"
    >
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Typography className="form_label"> نام گروه </Typography>
          <FormInput
            placeholder="نام گروه"
            register={{
              ...register("title", { value: group?.title }),
            }}
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
            register={{
              ...register("description", { value: group?.description }),
            }}
          />
          {errors.description && (
            <Typography className="warning_text">
              {errors.description?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2 ">
          <Typography className="form_label"> اعضای گروه</Typography>
          <SearchableDropdown
            background="gray-50"
            options={filteredUsers}
            handleChange={(val) => {
              if (val) {
                setUpdatedUsers((oldValue) => {
                  if (!oldValue) {
                    return [];
                  }
                  return [
                    ...oldValue,
                    { username: val.username, picture: val.picture },
                  ];
                });
              }
            }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {isLoading || isFetching ? (
            <Spinner className="h-4 w-4" color="deep-purple" />
          ) : (
            updatedUsers?.map((item) => {
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
            })
          )}
        </div>
      </form>
    </EditDialog>
  );
};

export default GroupEditDialog;
