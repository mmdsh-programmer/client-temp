import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import CreateDialog from "@components/templates/dialog/createDialog";
import { category } from "@atom/category";
import useCreateCategory from "@hooks/category/useCreateCategory";
import TextareaAtom from "@components/atoms/textarea/textarea";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";

interface IForm {
  name: string;
  description: string;
  order: number | null;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CategoryCreateDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getCategory = useRecoilValue(category);

  const createCategory = useCreateCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IForm>();

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
    createCategory.mutate({
      repoId: getRepo?.id,
      parentId: getCategory?.id,
      name: dataForm.name,
      description: dataForm?.description,
      order: null,
      callBack: () => {
        toast.success("دسته بندی با موفقیت ایجاد شد.");
        handleClose();
      },
    });
  };

  return (
    <CreateDialog
      isPending={createCategory.isPending}
      dialogHeader={"ساخت دسته بندی"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography className="label">نام دسته‌بندی</Typography>
          <FormInput
            placeholder="نام دسته بندی"
            register={{ ...register("name") }}
          />
          {errors.name && (
            <Typography className="warning_text">
              {errors.name?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="label">اولویت دسته‌بندی</Typography>
          <FormInput
            type="number"
            min={0}
            placeholder="اولویت دسته بندی"
            register={{ ...register("order") }}
          />
          {errors.order && (
            <Typography className="warning_text">
              {errors.order?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="label">توضیحات دسته بندی</Typography>
          <TextareaAtom
            placeholder="توضیحات دسته بندی"
            register={{...register("description")}}
          />
          {errors.description && (
            <Typography className="warning_text">
              {errors.description?.message}
            </Typography>
          )}
        </div>
      </form>
    </CreateDialog>
  );
};

export default CategoryCreateDialog;
