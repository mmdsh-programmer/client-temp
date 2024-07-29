import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import InputAtom from "@components/atoms/input/formInput";
import Label from "@components/atoms/typograghy/label";
import WarningText from "@components/atoms/typograghy/warningText";
import EditDialog from "@components/templates/dialog/editDialog";
import useEditCategory from "@hooks/category/useEditCategory";
import TextareaAtom from "@components/atoms/textarea/textarea";
import NumberInput from "@components/atoms/input/numberInput";
import useEditDocument from "@hooks/document/useEditDocument";
import { selectedDocumentAtom } from "@atom/document";

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
  const document = useRecoilValue(selectedDocumentAtom)
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
          <Label>نام سند</Label>
          <InputAtom
            className="w-full"
            placeholder="نام سند"
            register={{
              ...register("name", {
                value: document?.name,
              }),
            }}
          />
          {errors.name && <WarningText>{errors.name?.message}</WarningText>}
        </div>
        <div className="flex flex-col gap-2">
          <Label>اولویت سند </Label>
          <NumberInput
            className="w-full"
            placeholder="اولویت سند"
            register={{
              ...register("order", {
                value: document?.order,
              }),
            }}
          />
          {errors.order && <WarningText>{errors.order?.message}</WarningText>}
        </div>
        <div className="flex flex-col gap-2">
          <Label>توضیحات سند</Label>
          <TextareaAtom
            className="w-full"
            placeholder="توضیحات سند"
            register={{
              ...register("description", { value: document?.description }),
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

export default DocumentEditDialog;
