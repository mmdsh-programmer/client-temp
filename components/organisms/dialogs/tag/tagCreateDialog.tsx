import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useCreateTag from "@hooks/tag/useCreateTag";
import { useForm } from "react-hook-form";
import useRepoId from "@hooks/custom/useRepoId";
import useGetUser from "@hooks/auth/useGetUser";
import useCreateDomainTag from "@hooks/domainTags/useCreateDomainTag";
import TextareaAtom from "@components/atoms/textarea/textarea";

interface IForm {
  name: string;
  description: string;
  order: number;
}

interface IProps {
  name?: string | number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TagCreateDialog = ({ name, setOpen }: IProps) => {
  const repoId = useRepoId();

  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const createTag = useCreateTag();
  const createDomainTag = useCreateDomainTag();

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
    if (userInfo?.domainConfig.useDomainTag) {
      return createDomainTag.mutate({
        name: dataForm.name,
        description: dataForm.description,
        order: dataForm.order,
        callBack: () => {
          handleClose();
        },
      });
    }
    if (!repoId) return;
    createTag.mutate({
      repoId,
      name: dataForm.name,
      isDirectAccess:
        currentPath === "/admin/sharedDocuments" || sharedDocuments === "true",
      callBack: () => {
        toast.success("تگ با موفقیت ایجاد شد.");
        handleClose();
      },
    });
  };

  return (
    <CreateDialog
      isPending={createTag.isPending || createDomainTag.isPending}
      dialogHeader="ساخت تگ"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="h-full xs:h-auto max-w-full w-full !rounded-lg xs:max-w-auto xs:w-auto xs:mb-4 "
    >
      <form className="flex flex-col gap-6 ">
        <div className="flex flex-col gap-2">
          <Typography className="label">نام تگ</Typography>
          <FormInput
            placeholder="نام تگ"
            register={{ ...register("name", { value: name?.toString() }) }}
          />
          {errors.name && (
            <Typography className="warning_text">
              {errors.name?.message}
            </Typography>
          )}
        </div>
        {userInfo?.domainConfig.useDomainTag ? (
          <>
            <div className="flex flex-col gap-2">
              <Typography className="form_label">اولویت تگ </Typography>
              <FormInput
                type="number"
                min={0}
                placeholder="اولویت تگ"
                register={{
                  ...register("order"),
                }}
              />
              {errors.order && (
                <Typography className="warning_text">
                  {errors.order?.message}
                </Typography>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="form_label">توضیحات تگ</Typography>
              <TextareaAtom
                placeholder="توضیحات تگ"
                register={{
                  ...register("description"),
                }}
              />
              {errors.description && (
                <Typography className="warning_text">
                  {errors.description?.message}
                </Typography>
              )}
            </div>
          </>
        ) : null}
      </form>
    </CreateDialog>
  );
};

export default TagCreateDialog;
