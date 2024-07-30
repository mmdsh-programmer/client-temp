import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import Label from "@components/atoms/typograghy/label";
import WarningText from "@components/atoms/typograghy/warningText";
import CreateDialog from "@components/templates/dialog/createDialog";
import { category } from "@atom/category";
import useCreateCategory from "@hooks/category/useCreateCategory";
import NumberInput from "@components/atoms/input/numberInput";
import TextareaAtom from "@components/atoms/textarea/textarea";
import FormInput from "@components/atoms/input/formInput";

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
          <Label>نام دسته‌بندی</Label>
          <FormInput
            className="w-full"
            placeholder="نام دسته بندی"
            register={{
              ...register("name"),
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
              ...register("order"),
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
              ...register("description"),
            }}
          />
          {errors.description && (
            <WarningText>{errors.description?.message}</WarningText>
          )}
        </div>
      </form>
    </CreateDialog>
  );
};

export default CategoryCreateDialog;
