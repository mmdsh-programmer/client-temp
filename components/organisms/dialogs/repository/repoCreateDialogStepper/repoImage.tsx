import { repoActiveStep } from "@atom/stepper";
import ButtonAtom from "@components/atoms/button";
import { AddImageIcon } from "@components/atoms/icons";
import LoadingButton from "@components/molecules/loadingButton";
import useAddImageToRepo from "@hooks/repository/useAddImageToRepo";
import { Button, DialogBody, DialogFooter } from "@material-tailwind/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import Files from "./files";

interface IProps {
  repo: any;
  handleClose: () => void;
}

interface IForm {
  fileHash: string;
}

const RepoImage = ({ repo, handleClose }: IProps) => {
  const setActiveStep = useSetRecoilState(repoActiveStep);
  const [getSelectedFile, setSelectedFile] = useState();
  const [openFileManagement, setOpenFileManagement] = useState(false);

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

  const onSubmit = async () => {
    if (!getSelectedFile) return;
    mutate({
      repoId: repo.id,
      fileHash: getSelectedFile,
      callBack: () => {
        toast.success("عکس با موفقیت به مخزن اضافه شد.");
        handleReset();
        setActiveStep(1);
      },
    });
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <DialogBody placeholder="repo-image-dialog-body " className="p-0 flex-grow">
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="image"
              className="text-base font-semibold text-primary"
            >
              تصویر سفارشی
            </label>

            <Button
              onClick={() => {
                setOpenFileManagement(true);
              }}
              className="flex justify-center items-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-200 w-32 h-32"
              placeholder=""
            >
              {/* {getSelectedFile ? } */}
              <AddImageIcon className="h-10 w-10" />
            </Button>
          </div>
        </form>
      </DialogBody>
      <DialogFooter
        placeholder="create user dialog footer"
        className="p-0 flex gap-2.5 mt-[30px]"
      >
        <Button
          placeholder="cancel button"
          variant="text"
          onClick={handleReset}
          className="text-primary bg-gray-50 text-[13px] font-iranYekan w-[100px]"
          disabled={isPending}
        >
          انصراف
        </Button>
        <LoadingButton
          className="bg-purple-normal flex justify-center items-center rounded-lg px-4 py-3 text-[13px] text-white font-iranYekan"
          onClick={handleSubmit(onSubmit)}
          loading={isPending}
        >
          ادامه
        </LoadingButton>
      </DialogFooter>
      {openFileManagement && (
        <Files
          userGroupHash={repo?.userGroupHash}
          resourceId={repo?.id}
          type="public"
          setSelectedFile={setSelectedFile}
          handleClose={()=>{ setOpenFileManagement(false)}}
        />
      )}
    </div>
  );
};

export default RepoImage;
