import React from "react";
import { useCategoryStore } from "@store/category";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { Typography } from "@material-tailwind/react";
import { categorySchema } from "./validation.yup";
import { toast } from "react-toastify";
import useCreateCategory from "@hooks/category/useCreateCategory";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";
import { useRepositoryStore } from "@store/repository";

interface IForm {
  name: string;
  description?: string;
  order?: number | null;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CategoryCreateDialog = ({ setOpen }: IProps) => {
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const getCategory = useCategoryStore((state) => {
    return state.category;
  });
  const getCategoryShow = useCategoryStore((state) => {
    return state.categoryShow;
  });
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const createCategory = useCreateCategory();

  const form = useForm<IForm>({
    resolver: yupResolver(categorySchema),
    mode: "onChange"
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
    const repoId =
      currentPath === "/admin/myDocuments" || currentPath === "/admin/dashboard"
        ? userInfo!.repository.id
        : getRepo!.id;

    if (!repoId) return;
    createCategory.mutate({
      repoId,
      parentId: getCategory?.id || getCategoryShow?.id || null,
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
      className="category-create-dialog"
      disabled={!isValid}
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography
            placeholder=""
            className="form_label"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            نام دسته‌بندی
          </Typography>
          <FormInput
            placeholder="نام دسته بندی"
            register={{ ...register("name") }}
            className="category-create-dialog__form-name"
          />
          {errors.name && (
            <Typography
              placeholder=""
              className="warning_text"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {errors.name?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography
            placeholder=""
            className="form_label"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            اولویت دسته‌بندی
          </Typography>
          <FormInput
            type="number"
            min={0}
            placeholder="اولویت دسته بندی"
            register={{ ...register("order") }}
            className="category-create-dialog__form-order"
          />
          {errors.order && (
            <Typography
              placeholder=""
              className="warning_text"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {errors.order?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography
            placeholder=""
            className="form_label"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            توضیحات دسته بندی
          </Typography>
          <TextareaAtom
            placeholder="توضیحات دسته بندی"
            register={{ ...register("description") }}
            className="category-create-dialog__form-description"
          />
          {errors.description && (
            <Typography
              placeholder=""
              className="warning_text"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {errors.description?.message}
            </Typography>
          )}
        </div>
      </form>
    </CreateDialog>
  );
};

export default CategoryCreateDialog;
