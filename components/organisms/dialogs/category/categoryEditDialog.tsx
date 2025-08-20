import EditDialog from "@components/templates/dialog/editDialog";
import FormInput from "@components/atoms/input/formInput";
import React from "react";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { Typography } from "@material-tailwind/react";
import { categorySchema } from "./validation.yup";
import { toast } from "react-toastify";
import useEditCategory from "@hooks/category/useEditCategory";
import { useForm } from "react-hook-form";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRepositoryStore } from "@store/repository";
import { useCategoryStore } from "@store/category";

interface IDataForm {
  id?: number;
  name: string;
  description?: string;
  parentId?: number;
  order?: number | null;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CategoryEditDialog = ({ setOpen }: IProps) => {
  const { repo: getRepo } = useRepositoryStore();
  const { category: getCategory, setCategory } = useCategoryStore();
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const editCategory = useEditCategory();

  const form = useForm<IDataForm>({
    resolver: yupResolver(categorySchema),
  });
  const {
    register,
    handleSubmit,
    setError,
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

  const onSubmit = (dataForm: IDataForm) => {
    const repoId =
      currentPath === "/admin/myDocuments"
        ? userInfo!.repository.id
        : getRepo!.id;

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
    if (!repoId || !getCategory) return;
    editCategory.mutate({
      repoId,
      categoryId: getCategory?.id,
      parentId: getCategory?.parentId || null,
      name: dataForm.name,
      description: dataForm?.description,
      order: dataForm?.order || null,
      isHidden: false,
      currentParentId: null,
      callBack: () => {
        setCategory(null);
        toast.success("دسته بندی با موفقیت به روز رسانی شد.");
        handleClose();
      },
    });
  };
  return (
    <EditDialog
      isPending={editCategory.isPending}
      dialogHeader="ویرایش دسته بندی"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="category-edit-dialog"
    >
      <form className="category-edit-dialog__form flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography className="form_label">نام دسته‌بندی</Typography>
          <FormInput
            placeholder="نام دسته بندی"
            register={{
              ...register("name", {
                value: getCategory?.name,
              }),
            }}
            className="category-edit-dialog__form-name"
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
            placeholder="اولویت دسته بندی"
            type="number"
            min={0}
            register={{
              ...register("order", {
                value: getCategory?.order,
                valueAsNumber: true,
              }),
            }}
            className="category-edit-dialog__form-order"
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
            register={{
              ...register("description", { value: getCategory?.description }),
            }}
            className="category-edit-dialog__form-description"
          />
          {errors.description && (
            <Typography className="warning_text">
              {errors.description?.message}
            </Typography>
          )}
        </div>
      </form>
    </EditDialog>
  );
};

export default CategoryEditDialog;
