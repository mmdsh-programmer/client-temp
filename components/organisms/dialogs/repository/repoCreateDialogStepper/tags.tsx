import React from "react";
import {
  DialogBody,
  DialogFooter,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import CancelButton from "@components/atoms/button/cancelButton";
import ChipMolecule from "@components/molecules/chip";
import InputAtom from "@components/atoms/input";
import LoadingButton from "@components/molecules/loadingButton";
import { repoActiveStepAtom } from "@atom/stepper";
import { repoAtom } from "@atom/repository";
import { repoTagSchema } from "../validation.yup";
import { toast } from "react-toastify";
import useCreateTag from "@hooks/tag/useCreateTag";
import { useForm } from "react-hook-form";
import useGetTags from "@hooks/tag/useGetTags";
import { yupResolver } from "@hookform/resolvers/yup";

interface IForm {
  name: string;
}
interface IProps {
  handleClose: () => void;
}

const Tags = ({ handleClose }: IProps) => {
  const setActiveStep = useSetRecoilState(repoActiveStepAtom);
  const getRepo = useRecoilValue(repoAtom);
  const repoId = getRepo!.id;

  const { isPending, mutate } = useCreateTag();
  const { data: tagList, isLoading } = useGetTags(repoId, undefined, 30, true);

  const { register, handleSubmit, clearErrors, reset } = useForm<IForm>({
    resolver: yupResolver(repoTagSchema),
  });

  const onSubmit = async (dataForm: IForm) => {
    if (!getRepo) return;
    mutate({
      repoId: getRepo.id,
      name: dataForm.name,
      callBack: () => {
        toast.success(`${dataForm.name} با موفقیت ایجاد شد.`);
        clearErrors();
        reset();
      },
    });
  };

  return (
    <>
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6"
      >
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Typography className="label"> تگ</Typography>
            <div className="flex items-center gap-2 !h-12 pr-3 pl-2 !bg-gray-50 border-[1px] !border-normal rounded-lg">
              <InputAtom
                className="!w-auto h-auto overflow-hidden !p-0 border-none"
                placeholder="عنوان تگ"
                register={{ ...register("name") }}
              />
              <LoadingButton
                loading={isPending}
                onClick={handleSubmit(onSubmit)}
                className="!h-8 !bg-white !w-auto !rounded-sm shadow-none hover:shadow-none hover:bg-white"
              >
                <Typography className="!text-primary text__label__button px-3">
                  افزودن
                </Typography>
              </LoadingButton>
            </div>
          </div>
        </form>
        {isLoading ? (
          <div className="mt-4 w-full justify-center">
            <Spinner color="deep-purple" className="w-5 h-5" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 py-4">
            {tagList?.pages.map((page) => {
              return page.list.map((tag) => {
                return (
                  <ChipMolecule
                    value={tag.name}
                    key={tag.id}
                    className="bg-gray-50 h-6 px-3 text-primary max-w-[150px] "
                  />
                );
              });
            })}
          </div>
        )}
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
          onClick={() => {
            return setActiveStep(3);
          }}
        >
          <Typography className="text__label__button text-white">
            ادامه
          </Typography>
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default Tags;
