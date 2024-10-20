import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import EditDialog from "@components/templates/dialog/editDialog";
import TextareaAtom from "@components/atoms/textarea/textarea";
import useEditDocument from "@hooks/document/useEditDocument";
import { selectedDocumentAtom } from "@atom/document";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { documentEditSchema } from "./validation.yup";

interface IForm {
  id?: number;
  title: string;
  description?: string;
  parentId?: number;
  order?: number | null;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentEditDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);
  const editDocument = useEditDocument();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setError,
  } = useForm<IForm>({
    resolver: yupResolver(documentEditSchema),
  });

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
      dataForm.title.trim() === document?.name &&
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
      documentId: document.id,
      contentType: document.contentType,
      title: dataForm.title,
      description: dataForm?.description,
      order: dataForm.order,
      isHidden: false,
      callBack: () => {
        toast.success("سند با موفقیت به روز رسانی شد.");
        handleClose();
      },
    });
  };

  return (
    <EditDialog
      isPending={editDocument.isPending}
      dialogHeader="ویرایش سند"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography className="form_label">نام سند</Typography>
          <FormInput
            placeholder="نام سند"
            register={{
              ...register("title", {
                value: document?.name,
              }),
            }}
          />
          {errors.title && (
            <Typography className="warning_text">
              {errors.title?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="form_label">اولویت سند </Typography>
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
          <Typography className="form_label">توضیحات سند</Typography>
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
