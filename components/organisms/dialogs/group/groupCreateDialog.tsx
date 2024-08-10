import React from "react";
import { repoAtom } from "@atom/repository";
import FormInput from "@components/atoms/input/formInput";
import useCreateGroup from "@hooks/group/useCreateGroup";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { Typography } from "@material-tailwind/react";
import TextareaAtom from "@components/atoms/textarea/textarea";
import AddUsers, { IUsers } from "./addUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { userGroupSchema } from "./validation.yup";
import ChipMolecule from "@components/molecules/chip";
import { XIcon } from "@components/atoms/icons";
import CreateDialog from "@components/templates/dialog/createDialog";

interface IForm {
  title: string;
  description?: string;
  users?: IUsers[];
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const GroupCreateDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);

  const { isPending, mutate } = useCreateGroup();
  const form = useForm<IForm>({
    resolver: yupResolver(userGroupSchema),
  });

  const { register, handleSubmit, formState, reset, clearErrors, control } =
    form;
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
  });

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const members = fields.map((user) => {
    return user.userName;
  });

  const onSubmit = async (dataForm: IForm) => {
    if (!getRepo) return;
    mutate({
      repoId: getRepo.id,
      title: dataForm.title,
      description: dataForm.description,
      members: fields.map((user) => {
        return user.userName;
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
      dialogHeader={"ایجاد گروه"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="xs:!min-w-[450px] xs:!max-w-[450px]"
      backToMain
    >
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Typography className="label"> نام گروه </Typography>
          <FormInput
            placeholder="نام گروه"
            register={{
              ...register("title"),
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
            register={{ ...register("description") }}
          />
          {errors.description && (
            <Typography className="warning_text">
              {errors.description?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2 ">
          <Typography className="label"> اعضای گروه</Typography>
          <AddUsers onAdd={append} updatedUsers={fields} />
          {!!fields.length && (
            <div className="flex flex-wrap pt-4 gap-2">
              {fields.map((field, index) => {
                return (
                  <ChipMolecule
                    value={field.userName}
                    key={field.id}
                    className="bg-gray-100 justify-between rounded-full border-[1px] h-8 px-3 text-primary w-[100px] max-w-[150px] "
                    icon={
                      <div
                        className="w-4 h-4 bg-white rounded-full"
                        onClick={() => {
                          return remove(index);
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
    </CreateDialog>
  );
};

export default GroupCreateDialog;
