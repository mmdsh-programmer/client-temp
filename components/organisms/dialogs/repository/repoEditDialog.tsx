import React, { useState } from "react";
import EditDialog from "@components/templates/dialog/editDialog";
import Files from "../../fileManagement";
import FormInput from "@components/atoms/input/formInput";
import RepoAttachCustomImage from "@components/molecules/repoAttachImage/repoAttachCustomImage";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useAddImageToRepo from "@hooks/repository/useAddImageToRepo";
import useEditRepo from "@hooks/repository/useEditRepo";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { repoCreateSchema } from "./validation.yup";
import { useRepositoryStore } from "@store/repository";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IForm {
  name: string;
  description?: string;
}

const RepoEditDialog = ({ setOpen }: IProps) => {
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const setRepo = useRepositoryStore((state) => {
    return state.setRepo;
  });
  const [openFileManagement, setOpenFileManagement] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | undefined>(getRepo?.imageFileHash);
  const [imageType, setImageType] = useState<"default" | "custom">();
  const [defualtImage, setDefualtImage] = useState<string | null>(null);

  const { isPending, mutate } = useEditRepo();
  const attachImageToRepo = useAddImageToRepo();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IForm>({ resolver: yupResolver(repoCreateSchema) });

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const handleSelect = (image: string) => {
    setDefualtImage(image);
  };

  const onSubmit = async (dataForm: IForm) => {
    if (!getRepo) return;

    if (
      dataForm.name === getRepo.name &&
      dataForm.description === getRepo.description &&
      (!imageType ||
        (defualtImage === getRepo.imageFileHash && selectedFile === getRepo.imageFileHash))
    ) {
      toast.error("تغییری در مخزن وجود ندارد");
      return;
    }

    mutate({
      repoId: getRepo.id,
      name: dataForm.name,
      description: dataForm.description || "",
      callBack: () => {
        setRepo({
          ...getRepo,
          name: dataForm.name,
          description: dataForm.description || "",
        });
        toast.success("مخزن با موفقیت به روز رسانی شد.");
        handleClose();
      },
    });

    if ((selectedFile && selectedFile !== getRepo.imageFileHash) || defualtImage) {
      if (imageType === "default" && !defualtImage) return;
      if (imageType === "custom" && !selectedFile) return;

      const imageHash =
        imageType === "default" && defualtImage
          ? defualtImage
          : imageType === "custom" && selectedFile && selectedFile;

      attachImageToRepo.mutate({
        repoId: getRepo.id,
        fileHash: imageHash || null,
        callBack: () => {
          setRepo({
            ...getRepo,
            imageFileHash: imageHash || "",
          });
          toast.success("عکس با موفقیت به مخزن اضافه شد.");
          handleClose();
        },
      });
    }
  };

  if (openFileManagement && getRepo) {
    return (
      <Files
        userGroupHash={getRepo.userGroupHash}
        resourceId={getRepo.id}
        type="public"
        handleClose={() => {
          setOpenFileManagement(false);
        }}
        setSelectedFile={(file) => {
          return setSelectedFile(file?.hash);
        }}
      />
    );
  }
  return (
    <EditDialog
      isPending={isPending}
      dialogHeader="ویرایش مخزن"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="repo-edit-dialog m-0 h-full w-full max-w-full xs:!h-[600px]"
    >
      <form className="repo-edit-dialog__form flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">
            عنوان مخزن
          </Typography>
          <FormInput
            placeholder="عنوان"
            register={{ ...register("name", { value: getRepo?.name }) }}
          />
          {errors.name && (
            <Typography
              {...({} as React.ComponentProps<typeof Typography>)}
              className="warning_text"
            >
              {errors.name?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">
            توضیحات مخزن
          </Typography>
          <TextareaAtom
            placeholder="توضیحات"
            register={{
              ...register("description", { value: getRepo?.description }),
            }}
          />
          {errors.name && (
            <Typography
              {...({} as React.ComponentProps<typeof Typography>)}
              className="warning_text"
            >
              {errors.description?.message}
            </Typography>
          )}
        </div>
        <RepoAttachCustomImage
          imageType={imageType}
          setImageType={setImageType}
          setOpenFileManagement={setOpenFileManagement}
          onSelect={handleSelect}
          imageHash={selectedFile}
        />
      </form>
    </EditDialog>
  );
};

export default RepoEditDialog;
