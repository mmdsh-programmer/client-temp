import React from "react";
import { repoActiveStep } from "@atom/stepper";
import Text from "@components/atoms/typograghy/text";
import LoadingButton from "@components/molecules/loadingButton";
import useCreateTag from "@hooks/tag/useCreateTag";
import useGetTags from "@hooks/tag/useGetTags";
import { DialogBody, DialogFooter, Spinner } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { yupResolver } from "@hookform/resolvers/yup";
import { repoTagSchema } from "../validation.yup";
import Label from "@components/atoms/typograghy/label";
import InputAtom from "@components/atoms/input";
import CancelButton from "@components/atoms/button/cancelButton";
import ChipMolecule from "@components/molecules/chip";
import { repoAtom } from "@atom/repository";

interface IForm {
  name: string;
}
interface IProps {
  handleClose: () => void;
}

const Tags = ({ handleClose }: IProps) => {
  const setActiveStep = useSetRecoilState(repoActiveStep);
  const getRepo = useRecoilValue(repoAtom);
  const repoId = getRepo!.id;

  const { isPending, mutate, isSuccess } = useCreateTag();
  const {
    data: tagList,
    isLoading,
    isFetching,
  } = useGetTags(repoId, 10, isSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IForm>({
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
            <Label labelFor="username"> تگ</Label>
            <div className="flex items-center gap-2 !h-12 pr-3 pl-2 !bg-gray-50 border-[1px] !border-normal rounded-lg">
              <InputAtom
                id="username"
                className="!w-auto h-auto overflow-hidden !p-0 border-none"
                placeholder="عنوان تگ"
                register={{ ...register("name") }}
              />
              <LoadingButton
                loading={isPending}
                onClick={handleSubmit(onSubmit)}
                className="!h-8 !bg-white !w-auto !rounded-sm shadow-none hover:shadow-none hover:bg-white"
              >
                <Text className="!text-primary px-3 font-medium text-[13px] leading-[18px] -tracking-[0.12px]">
                  افزودن
                </Text>
              </LoadingButton>
            </div>
          </div>
        </form>
        {isLoading || isFetching ? (
          <Spinner color="purple" className="" />
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
          onClick={() => setActiveStep(3)}
        >
          <Text className="text-[12px] font-medium leading-[18px] -tracking-[0.12px] text-white">
            ادامه
          </Text>
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default Tags;
