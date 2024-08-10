import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import EditDialog from "@components/templates/dialog/editDialog";
import useEditCategory from "@hooks/category/useEditCategory";
import TextareaAtom from "@components/atoms/textarea/textarea";
import useEditDocument from "@hooks/document/useEditDocument";
import { selectedDocumentAtom } from "@atom/document";
import FormInput from "@components/atoms/input/formInput";
import InputAtom from "@components/atoms/input";
import { Typography } from "@material-tailwind/react";

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

const DocumentEditDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);
  const editDocument = useEditDocument();

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
      dataForm.description?.trim() === document?.description &&
      dataForm.name.trim() === document?.name &&
      dataForm.order === document.order
    ) {
      setError("description", {
        message: "تغییری در سند وجود ندارد",
      });
      return;
    }
    if (!getRepo || !document) return;
    editDocument.mutate({
      repoId: getRepo?.id,
      categoryId: document.categoryId,
      title: dataForm.name,
      description: dataForm?.description,
      order: null,
      isHidden: false,
      callBack: () => {
        toast.success("سند با موفقیت به روز رسانی شد.");
        handleClose();
      },
      documentId: document.id,
      contentType: document.contentType,
    });
  };

  return (
    <EditDialog
      isPending={editCategory.isPending}
      dialogHeader={"ویرایش سند"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography className="label">نام سند</Typography>
          <FormInput
            placeholder="نام سند"
            register={{
              ...register("name", {
                value: document?.name,
              }),
            }}
          />
          {errors.name && (
            <Typography className="warning_text">
              {errors.name?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="label">اولویت سند </Typography>
          <FormInput
            type="number"
            min={0}
            placeholder="اولویت سند"
            register={{
              ...register("order", {
                value: document?.order,
              }),
            }}
          />
          {errors.order && (
            <Typography className="warning_text">
              {errors.order?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="label">توضیحات سند</Typography>
          <TextareaAtom
            placeholder="توضیحات سند"
            register={{
              ...register("description", { value: document?.description }),
            }}
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

export default DocumentEditDialog;
