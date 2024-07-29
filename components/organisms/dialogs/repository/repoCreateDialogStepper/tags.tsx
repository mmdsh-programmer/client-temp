import { repoActiveStep } from "@atom/stepper";
import { XIcon } from "@components/atoms/icons";
import Text from "@components/atoms/typograghy/text";
import LoadingButton from "@components/molecules/loadingButton";
import useCreateTag from "@hooks/tag/useCreateTag";
import useDeleteTag from "@hooks/tag/useDeleteTag";
import useGetTags from "@hooks/tag/useGetTags";
import { ITag } from "@interface/tags.interface";
import {
  Button,
  Chip,
  DialogBody,
  DialogFooter,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { yupResolver } from "@hookform/resolvers/yup";
import { repoTagSchema } from "../validation.yup";

interface IForm {
  name: string;
}

interface IProps {
  repo: any;
  handleClose: () => void;
}

const Tags = ({ repo, handleClose }: IProps) => {
  const setActiveStep = useSetRecoilState(repoActiveStep);

  const { isPending, mutate, isSuccess } = useCreateTag();
  const deleteTag = useDeleteTag();
  const { data: tagList } = useGetTags(repo.id, 5, isSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(repoTagSchema),
  });

  const handleReset = () => {
    clearErrors();
    reset();
    setActiveStep(0);
  };

  const onSubmit = async (dataForm: IForm) => {
    mutate({
      repoId: repo.id,
      name: dataForm.name,
      callBack: () => {
        toast.success(`${dataForm.name} با موفقیت ایجاد شد.`);
        clearErrors();
        reset();
      },
    });
  };

  const handleDelete = (tag: ITag) => {
    if (!repo) return;

    deleteTag.mutate({
      repoId: repo.id,
      tagId: tag.id,
      callBack: () => {
        toast.error("تگ حذف شد.");
        reset();
        clearErrors();
      },
    });
  };
  return (
    <>
      <DialogBody placeholder="edit user dialog body" className="p-0 mt-[30px]">
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm text-primary font-normal">
              تگ
            </label>
            <div className="border-2 px-2 py-[6px] justify-between items-center border-gray-200 bg-gray-50 rounded-lg flex ">
              <input
                id="title"
                type="text"
                placeholder="تگ موردنظر خود را وارد کنید"
                {...register("name")}
                className="flex-grow bg-transparent px-[15px] py-[9px] rounded-[4px] focus:px-[15px] focus:outline-none text-[13px] 
            font-iranYekan font-normal text-primary placeholder:text-placeholder w-full
             outline-none"
              />
              <LoadingButton
                className="bg-white font-iranYekan flex justify-center items-center rounded-lg px-4 py-3 w-[100px] text-[13px] text-primary font-normal "
                onClick={handleSubmit(onSubmit)}
                loading={isPending}
              >
                افزودن
              </LoadingButton>
            </div>
            {errors.name && (
              <Typography placeholder="error-message" className="text-error font-iranYekan text-xs w-full h-5">
                {errors.name?.message}
              </Typography>
            )}
          </div>
        </form>
        <div className="mt-5 flex flex-wrap gap-2">
          {tagList?.pages?.map((page) => {
            return page.list.map((tag) => {
              return (
                <div key={tag.id} className="flex">
                  <Chip
                    value={tag.name}
                    className="chip flex items-center justify-between lowercase bg-gray-200 text-primary rounded-lg font-normal max-w-[150px] truncate cursor-pointer"
                    icon={
                      deleteTag.isPending &&
                      deleteTag.variables.tagId === tag.id ? (
                        <Spinner className="h-4 w-4" color="purple" />
                      ) : (
                        <div
                        className="h-4 w-4 mt-[2px]" 
                          onClick={() => {
                            handleDelete(tag);
                          }}
                        >
                          <XIcon className="h-full w-full" />
                        </div>
                      )
                    }
                  />
                </div>
              );
            });
          })}
        </div>
      </DialogBody>
      <DialogFooter
        placeholder="create user dialog footer"
        className="p-0 flex gap-2.5 mt-[30px]"
      >
        <Button
          placeholder="cancel button"
          variant="text"
          className="text-primary bg-gray-50 text-[13px] font-iranYekan w-[100px]"
          disabled={isPending}
          onClick={() => {
            handleReset();
            handleClose();
          }}
        >
          انصراف
        </Button>
        <Button
          placeholder=""
          className="bg-purple-normal flex justify-center items-center rounded-lg px-4 py-3 text-[13px] text-white font-iranYekan w-[100px]"
          onClick={() => {
            setActiveStep(3);
          }}
        >
          ادامه
        </Button>
      </DialogFooter>
    </>
  );
};

export default Tags;
