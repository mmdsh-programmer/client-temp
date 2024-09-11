import {
  Button,
  DialogBody,
  DialogFooter,
  Radio,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

import { AddImageIcon } from "@components/atoms/icons";
import CancelButton from "@components/atoms/button/cancelButton";
import { IFile } from "cls-file-management";
import LoadingButton from "@components/molecules/loadingButton";
import RepoDefaultImage from "@components/molecules/repoDefaultImage";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useAddImageToRepo from "@hooks/repository/useAddImageToRepo";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

interface IProps {
  handleClose: () => void;
  setOpenFileManagement: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFile: IFile | null;
}

interface IForm {
  fileHash: string;
}

const RepoImage = ({
  handleClose,
  setOpenFileManagement,
  selectedFile,
}: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const [imageType, setImageType] = useState<"default" | "custom">(
    selectedFile ? "custom" : "default",
  );
  const [defualtImage, setDefualtImage] = useState<string | null>(null);

  const { isPending, mutate } = useAddImageToRepo();
  const {
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IForm>();

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleSelect = (image: string) => {
    setDefualtImage(image);
  };

  const onSubmit = async () => {
    if (!getRepo) return;
    if (imageType === "default" && !defualtImage) return;
    if (imageType === "custom" && !selectedFile) return;
    mutate({
      repoId: getRepo.id,
      fileHash: selectedFile ? selectedFile.hash : defualtImage,
      callBack: () => {
        toast.success("عکس با موفقیت به مخزن اضافه شد.");
        handleReset();
        handleClose();
      },
    });
  };

  return (
    <>
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Radio
              crossOrigin="anonymous"
              name="default_image"
              color="deep-purple"
              label={
                <div>
                  <Typography className="text-primary font-medium text-[13px] leading-[19.5px] -tracking-[0.13px] ">
                    تصویر پیش‌فرض
                  </Typography>
                  <Typography className="text-hint text-[12px] leading-[20px] -tracking-[0.12px] font-normal">
                    انتخاب تصویر پیش‌فرض برای مخزن
                  </Typography>
                </div>
              }
              containerProps={{
                className: "-mt-5",
              }}
              checked={imageType === "default"}
              onClick={() => {
                setImageType("default");
              }}
            />
            <div className="">
              <RepoDefaultImage
                onClick={handleSelect}
                disabled={imageType !== "default"}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Radio
              crossOrigin="anonymous"
              name="custom_image"
              color="deep-purple"
              label={
                <div>
                  <Typography className="text-primary font-medium text-[13px] leading-[19.5px] -tracking-[0.13px] ">
                    تصویر سفارشی
                  </Typography>
                  <Typography className="text-hint text-[12px] leading-[20px] -tracking-[0.12px] font-normal">
                    انتخاب تصویر دلخواه برای مخزن
                  </Typography>
                </div>
              }
              containerProps={{
                className: "-mt-5",
              }}
              checked={imageType === "custom"}
              onClick={() => {
                setImageType("custom");
              }}
            />
            <Button
              onClick={() => {
                setOpenFileManagement(true);
              }}
              className="flex justify-center items-center rounded-lg border-[1px] border-dashed border-normal bg-secondary w-[82px] h-[82px]"
              placeholder=""
              disabled={imageType !== "custom"}
            >
              <AddImageIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <CancelButton onClick={handleClose} disabled={isPending}>
          انصراف
        </CancelButton>
        <LoadingButton
          className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
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
