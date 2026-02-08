import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import EditDialog from "@components/templates/dialog/editDialog";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore } from "@store/document";
import { useTagStore } from "@store/tag";
import { toast } from "react-toastify";
import useEditTag from "@hooks/tag/useEditTag";
import { useForm } from "react-hook-form";
import useGetUser from "@hooks/auth/useGetUser";
import useEditDomainTag from "@hooks/domainTags/useEditDomainTag";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { IDomainTag } from "@interface/domain.interface";
import { tagSchema } from "./validation.yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IForm {
  name: string;
  description?: string | null;
  order?: number | null;
}
interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const TagEditDialog = ({ setOpen }: IProps) => {
  const getRepo = useRepositoryStore((s) => {
    return s.repo;
  });
  const getTag = useTagStore((s) => {
    return s.selectedTag;
  });
  const getDocument = useDocumentStore((s) => {
    return s.selectedDocument;
  });

  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const { isPending, mutate } = useEditTag();
  const editDomainTag = useEditDomainTag();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
    reset,
  } = useForm<IForm>({ resolver: yupResolver(tagSchema), mode: "onChange" });

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const repoId = () => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.id;
    }
    if ((currentPath === "/admin/sharedDocuments" || sharedDocuments === "true") && getDocument) {
      return getDocument!.repoId;
    }
    return getRepo!.id;
  };

  const onSubmit = async (dataForm: IForm) => {
    if (userInfo?.domainConfig.useDomainTag && getTag) {
      return editDomainTag.mutate({
        tagId: getTag.id,
        name: dataForm.name,
        description: dataForm.description ?? "",
        order: dataForm.order ?? 0,
        callBack: () => {
          handleClose();
        },
      });
    }

    if (!repoId() || !getTag) return;
    mutate({
      repoId: repoId(),
      name: dataForm.name,
      tagId: getTag.id,
      isDirectAccess: currentPath === "/admin/sharedDocuments" || sharedDocuments === "true",
      callBack: () => {
        toast.success("تگ با موفقیت به روز رسانی شد.");
        handleClose();
      },
    });
  };
  return (
    <EditDialog
      isPending={isPending || editDomainTag.isPending}
      dialogHeader="ویرایش تگ"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="tag-edit-dialog"
      backToMain
      disabled={!isValid}

    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="label">نام تگ</Typography>
          <FormInput
            placeholder="نام تگ"
            register={{
              ...register("name", {
                value: getTag?.name,
              }),
            }}
            className="tag-edit-dialog__name"
          />
          {errors.name && <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text">{errors.name?.message}</Typography>}
        </div>
        {userInfo?.domainConfig.useDomainTag ? (
          <>
            <div className="flex flex-col gap-2">
              <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">اولویت تگ </Typography>
              <FormInput
                type="number"
                min={0}
                placeholder="اولویت تگ"
                register={{
                  ...register("order", {
                    value: (getTag as IDomainTag)?.order,
                  }),
                }}
                className="tag-edit-dialog__priority"
              />
              {errors.order && (
                <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text">{errors.order?.message}</Typography>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">توضیحات تگ</Typography>
              <TextareaAtom
                placeholder="توضیحات تگ"
                register={{
                  ...register("description", {
                    value: (getTag as IDomainTag)?.description,
                  }),
                }}
                className="tag-edit-dialog__description"
              />
              {errors.description && (
                <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text">{errors.description?.message}</Typography>
              )}
            </div>
          </>
        ) : null}
      </form>
    </EditDialog>
  );
};

export default TagEditDialog;
