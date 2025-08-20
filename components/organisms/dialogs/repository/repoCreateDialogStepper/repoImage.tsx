import { DialogBody, DialogFooter, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import CancelButton from "@components/atoms/button/cancelButton";
import LoadingButton from "@components/molecules/loadingButton";
import RepoAttachCustomImage from "@components/molecules/repoAttachImage/repoAttachCustomImage";
import { toast } from "react-toastify";
import useAddImageToRepo from "@hooks/repository/useAddImageToRepo";
import { useForm } from "react-hook-form";
import { useRepositoryStore } from "@store/repository";

interface IProps {
  handleClose: () => void;
  setOpenFileManagement: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFile?: string;
}

interface IForm {
  fileHash: string;
}

const RepoImage = ({
  handleClose,
  setOpenFileManagement,
  selectedFile,
}: IProps) => {
  const { repo: getRepo } = useRepositoryStore();
  const [imageType, setImageType] = useState<"default" | "custom">();
  const [defualtImage, setDefualtImage] = useState<string | null>(null);

  const { isPending, mutate } = useAddImageToRepo();
  const { handleSubmit, clearErrors, reset } = useForm<IForm>();

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleSelect = (image: string) => {
    setDefualtImage(image);
  };

  const onSubmit = async () => {
    if (!getRepo) return;
    if (!imageType) {
      return handleClose();
    };
    if (imageType === "default" && !defualtImage) {
      return toast.error("عکسی انتخاب نشده");
    }
    if (imageType === "custom" && !selectedFile) {
      return toast.error("عکسی انتخاب نشده");
    }

    mutate({
      repoId: getRepo.id,
      fileHash: selectedFile || defualtImage,
      callBack: () => {
        toast.success("عکس با موفقیت به مخزن اضافه شد.");
        handleReset();
        handleClose();
      },
    });
  };

  useEffect(() => {
    if (selectedFile) {
      setImageType("custom");
    }
  }, [selectedFile]);

  return (
    <>
      <DialogBody
        placeholder="dialog body"
        className="repo-image__dialog-body flex-grow px-5 py-3 xs:p-6"
      >
        <RepoAttachCustomImage
          imageType={imageType}
          setImageType={setImageType}
          setOpenFileManagement={setOpenFileManagement}
          onSelect={handleSelect}
          imageHash={selectedFile}
        />
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="repo-image__dialog-footer p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <CancelButton onClick={handleClose} disabled={isPending}>
          انصراف
        </CancelButton>
        <LoadingButton
          className="repo-image__dialog-next-button bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
          onClick={handleSubmit(onSubmit)}
          loading={isPending}
        >
          <Typography className="text__label__button text-white">
            ادامه
          </Typography>
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default RepoImage;