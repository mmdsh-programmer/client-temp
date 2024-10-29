import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import React from "react";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { Typography } from "@material-tailwind/react";
import { categorySchema } from "./validation.yup";
import { categoryShowAtom } from "@atom/category";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useCreateCategory from "@hooks/category/useCreateCategory";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { yupResolver } from "@hookform/resolvers/yup";

interface IForm {
  name: string;
  description?: string;
  order?: number | null;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CategoryCreateDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getCategory = useRecoilValue(categoryShowAtom);

  const createCategory = useCreateCategory();

  const form = useForm<IForm>({
    resolver: yupResolver(categorySchema),
  });
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

  const onSubmit = async (dataForm: IForm) => {
    if (!getRepo) return;
    createCategory.mutate({
      repoId: getRepo?.id,
      parentId: getCategory?.id || null,
      name: dataForm.name,
      description: dataForm?.description || "",
      order: dataForm.order || null,
      onSuccessHandler: () => {
        toast.success("دسته بندی با موفقیت ایجاد شد.");
        handleClose();
      },
    });
  };

  return (
    <CreateDialog
      isPending={createCategory.isPending}
      dialogHeader="ساخت دسته بندی"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography className="form_label">نام دسته‌بندی</Typography>
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
          <Typography className="form_label">اولویت دسته‌بندی</Typography>
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
          <Typography className="form_label">توضیحات دسته بندی</Typography>
          <TextareaAtom
            placeholder="توضیحات دسته بندی"
            register={{ ...register("description") }}
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
