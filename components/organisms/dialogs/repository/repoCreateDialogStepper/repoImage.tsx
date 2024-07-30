import { repoActiveStep } from "@atom/stepper";
import { AddImageIcon } from "@components/atoms/icons";
import LoadingButton from "@components/molecules/loadingButton";
import useAddImageToRepo from "@hooks/repository/useAddImageToRepo";
import {
  Button,
  DialogBody,
  DialogFooter,
  Radio,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";
import CancelButton from "@components/atoms/button/cancelButton";
import Text from "@components/atoms/typograghy/text";
import RepoDefaultImage from "@components/molecules/repoDefaultImage";

interface IProps {
  handleClose: () => void;
  setOpenFileManagement: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IForm {
  fileHash: string;
}

const RepoImage = ({ handleClose, setOpenFileManagement }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const setActiveStep = useSetRecoilState(repoActiveStep);
  const [getSelectedFile, setSelectedFile] = useState();

  const { isPending, mutate } = useAddImageToRepo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    getValues,
  } = useForm<IForm>();

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleSelect = (image: string) => {
    console.log("-------------------- select image -----------------", image);
  };

  const onSubmit = async () => {
    if (!getSelectedFile || !getRepo) return;
    mutate({
      repoId: getRepo.id,
      fileHash: getSelectedFile,
      callBack: () => {
        toast.success("عکس با موفقیت به مخزن اضافه شد.");
        handleReset();
        setActiveStep(1);
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
              name="description"
              color="deep-purple"
              label={
                <div>
                  <Text className="text-primary font-medium text-[13px] leading-[19.5px] -tracking-[0.13px] ">
                    تصویر پیش‌فرض
                  </Text>
                  <Text className="text-hint text-[12px] leading-[20px] -tracking-[0.12px] font-normal">
                    انتخاب تصویر پیش‌فرض برای مخزن
                  </Text>
                </div>
              }
              containerProps={{
                className: "-mt-5",
              }}
              crossOrigin=""
            />
            <RepoDefaultImage onClick={handleSelect} />
          </div>
          <div className="flex flex-col gap-4">
            <Radio
              name="description"
              color="deep-purple"
              label={
                <div>
                  <Text className="text-primary font-medium text-[13px] leading-[19.5px] -tracking-[0.13px] ">
                    تصویر سفارشی
                  </Text>
                  <Text className="text-hint text-[12px] leading-[20px] -tracking-[0.12px] font-normal">
                    انتخاب تصویر دلخواه برای مخزن
                  </Text>
                </div>
              }
              containerProps={{
                className: "-mt-5",
              }}
              crossOrigin=""
            />
            <Button
              onClick={() => {
                setOpenFileManagement(true);
              }}
              className="flex justify-center items-center rounded-lg border-[1px] border-dashed border-normal bg-secondary w-[82px] h-[82px]"
              placeholder=""
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
          <Text className="text-[12px] font-medium leading-[18px] -tracking-[0.12px] text-white">
            ایجاد
          </Text>
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default RepoImage;
