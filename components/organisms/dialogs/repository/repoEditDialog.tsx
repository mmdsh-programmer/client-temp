import React, { useState } from "react";
import EditDialog from "@components/templates/dialog/editDialog";
import Files from "./repoCreateDialogStepper/files";
import FormInput from "@components/atoms/input/formInput";
import { IRepo } from "@interface/repo.interface";
import RepoAttachCustomImage from "@components/molecules/repoAttachImage/repoAttachCustomImage";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useAddImageToRepo from "@hooks/repository/useAddImageToRepo";
import useEditRepo from "@hooks/repository/useEditRepo";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";

interface IProps {
  repo?: IRepo;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IForm {
  name: string;
  description: string;
}

const RepoEditDialog = ({ repo, setOpen }: IProps) => {
  const setRepo = useSetRecoilState(repoAtom);
  const [openFileManagement, setOpenFileManagement] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | undefined>(
    repo?.imageFileHash
  );
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
  } = useForm<IForm>();

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
    if (!repo) return;
    if (
      dataForm.name !== repo.name ||
      dataForm.description !== repo.description
    ) {
      mutate({
        repoId: repo.id,
        name: dataForm.name,
        description: dataForm.description,
        callBack: () => {
          setRepo({
            ...repo,
            name: dataForm.name,
            description: dataForm.description,
          });
          toast.success("مخزن با موفقیت به روز رسانی شد.");
          handleClose();
        },
      });
    }

    if ((selectedFile && selectedFile !== repo.imageFileHash) || defualtImage) {
      if (imageType === "default" && !defualtImage) return;
      if (imageType === "custom" && !selectedFile) return;

      const imageHash =
        imageType === "default" && defualtImage
          ? defualtImage
          : imageType === "custom" && selectedFile && selectedFile;

      attachImageToRepo.mutate({
        repoId: repo.id,
        fileHash: imageHash || null,
        callBack: () => {
          setRepo({
            ...repo,
            imageFileHash: imageHash || "",
          });
          toast.success("عکس با موفقیت به مخزن اضافه شد.");
          handleClose();
        },
      });
    }
  };

  if (openFileManagement && repo) {
    return (
      <Files
        userGroupHash={repo.userGroupHash}
        resourceId={repo.id}
        type="public"
        handleClose={() => {
          setOpenFileManagement(false);
        }}
        setSelectedFile={setSelectedFile}
      />
    );
  }
  return (
    <EditDialog
      isPending={isPending}
      dialogHeader="ویرایش مخزن"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="!h-screen xs:!h-[600px] max-w-full w-full m-0"
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography className="label">عنوان مخزن</Typography>
          <FormInput
            placeholder="عنوان"
            register={{ ...register("name", { value: repo?.name }) }}
          />
          {errors.name && (
            <Typography className="warning_text">
              {errors.name?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="label">توضیحات مخزن</Typography>
          <TextareaAtom
            placeholder="توضیحات"
            register={{
              ...register("description", { value: repo?.description }),
            }}
          />
          {errors.name && (
            <Typography className="warning_text">
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
