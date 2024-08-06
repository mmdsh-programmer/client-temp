import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import Label from "@components/atoms/typograghy/label";
import WarningText from "@components/atoms/typograghy/warningText";
import EditDialog from "@components/templates/dialog/editDialog";
import { category } from "@atom/category";
import useEditCategory from "@hooks/category/useEditCategory";
import TextareaAtom from "@components/atoms/textarea/textarea";
import NumberInput from "@components/atoms/input/numberInput";
import FormInput from "@components/atoms/input/formInput";

interface IForm {
  id?: number;
  name: string;
  description: string;
  parentId?: number;
  order: number | null;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CategoryEditDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getCategory = useRecoilValue(category);

  const editCategory = useEditCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setError,
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
    if (
      dataForm.description?.trim() === getCategory?.description &&
      dataForm.name.trim() === getCategory?.name &&
      dataForm.order === getCategory.order
    ) {
      setError("description", {
        message: "تغییری در دسته بندی وجود ندارد",
      });
      return;
    }
    if (!getRepo) return;
    editCategory.mutate({
      repoId: getRepo?.id,
      categoryId: getCategory?.id || null,
      parentId: getCategory?.parentId || null,
      name: dataForm.name,
      description: dataForm?.description,
      order: null,
      isHidden: false,
      callBack: () => {
        toast.success("دسته بندی با موفقیت به روز رسانی شد.");
        handleClose();
      },
    });
  };
  return (
    <EditDialog
      isPending={editCategory.isPending}
      dialogHeader={"ویرایش دسته بندی"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label>نام دسته‌بندی</Label>
          <FormInput
            className="w-full"
            placeholder="نام دسته بندی"
            register={{
              ...register("name", {
                value: getCategory?.name,
              }),
            }}
          />
          {errors.name && <WarningText>{errors.name?.message}</WarningText>}
        </div>
        <div className="flex flex-col gap-2">
          <Label>اولویت دسته‌بندی</Label>
          <NumberInput
            className="w-full"
            placeholder="اولویت دسته بندی"
            register={{
              ...register("order", {
                value: getCategory?.order,
              }),
            }}
          />
          {errors.order && <WarningText>{errors.order?.message}</WarningText>}
        </div>
        <div className="flex flex-col gap-2">
          <Label>توضیحات دسته بندی</Label>
          <TextareaAtom
            className="w-full"
            placeholder="توضیحات دسته بندی"
            register={{
              ...register("description", { value: getCategory?.description }),
            }}
          />
          {errors.description && (
            <WarningText>{errors.description?.message}</WarningText>
          )}
        </div>
      </form>
    </EditDialog>
  );
};

export default CategoryEditDialog;
