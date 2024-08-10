import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import EditDialog from "@components/templates/dialog/editDialog";
import { repoAtom } from "@atom/repository";
import useEditGroup from "@hooks/group/useEditGroup";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormInput from "@components/atoms/input/formInput";
import { selectedGroupAtom } from "@atom/group";
import { Typography } from "@material-tailwind/react";
import AddUsers, { IUsers } from "./addUser";
import TextareaAtom from "@components/atoms/textarea/textarea";
import ChipMolecule from "@components/molecules/chip";
import { XIcon } from "@components/atoms/icons";
import { userGroupSchema } from "./validation.yup";
import useGetGroupInfo from "@hooks/group/useGetGroupInfo";
import { yupResolver } from "@hookform/resolvers/yup";

interface IForm {
  title: string;
  description?: string;
  users?: IUsers[];
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const GroupEditDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const group = useRecoilValue(selectedGroupAtom);

  const [oldMember, setOldMember] = useState([]);
  const updateMember: { id: string; userName: string }[] = [];

  const groupInfo = useGetGroupInfo(getRepo?.id, group?.title);
  const { isPending, mutate } = useEditGroup();

  const form = useForm<IForm>({
    resolver: yupResolver(userGroupSchema),
  });
  const { reset, control, clearErrors, handleSubmit, register, formState } = form;
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
  });

  const newList = groupInfo.data?.members.list.filter((user) => {
    return !oldMember.some((filteredUser: { id: string; userName: string }) => {
      return filteredUser.userName === user.preferred_username;
    });
  });

  if (newList?.length) {
    newList.map((user) => {
      return updateMember.push({
        id: user.id.toString(),
        userName: user.preferred_username,
      });
    });
  }

  const allMember = [...fields, ...updateMember];

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const onSubmit = async (dataForm: IForm) => {
    if (!getRepo) return;
    mutate({
      repoId: getRepo.id,
      title: dataForm.title,
      description: dataForm.description,
      members: allMember.map((user) => {
        return user.userName;
      }),
      callBack: () => {
        toast.success("گروه با موفقیت ویرایش شد.");
        handleClose();
      },
    });
  };

  const handleDelete = (userName: string) => {
    const newList = groupInfo.data?.members.list.filter((member) => {
      return member.preferred_username === userName;
    });
    newList?.map((member) => {
      return setOldMember((prevState): any => {
        return [
          ...prevState,
          {
            userName: member.preferred_username,
            id: member.id,
          },
        ];
      });
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
          <Typography className="label"> نام گروه </Typography>
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
          <Typography className="label">توضیحات گروه</Typography>
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
          <Typography className="label"> اعضای گروه</Typography>
          <AddUsers onAdd={append} updatedUsers={allMember} />
          {!!allMember.length && (
            <div className="flex flex-wrap pt-4 gap-2">
              {allMember.map((field, index) => {
                return (
                  <ChipMolecule
                    value={field.userName}
                    key={field.id}
                    className="bg-gray-100 justify-between rounded-full border-[1px] h-8 px-3 text-primary w-[100px] max-w-[150px] "
                    icon={
                      <div
                        className="w-4 h-4 bg-white rounded-full"
                        onClick={() => {
                          remove(index);
                          handleDelete(field.userName);
                        }}
                      >
                        <XIcon className="w-4 h-4 fill-icon-hover" />
                      </div>
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      </form>
    </EditDialog>
  );
};

export default GroupEditDialog;
