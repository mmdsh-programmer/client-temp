import React from "react";
import { DialogFooter, DialogBody } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingButton from "@components/molecules/loadingButton";
import useCreateRepo from "@hooks/repository/useCreateRepo";
import { useSetRecoilState } from "recoil";
import { repoActiveStep } from "@atom/stepper";
import { yupResolver } from "@hookform/resolvers/yup";
import { repoCreateSchema } from "../validation.yup";
import CancelButton from "@components/atoms/button/cancelButton";
import FormInput from "@components/atoms/input/formInput";
import WarningText from "@components/atoms/typograghy/warningText";
import TextareaAtom from "@components/atoms/textarea/textarea";
import Text from "@components/atoms/typograghy/text";
import { repoAtom } from "@atom/repository";
import Label from "@components/atoms/typograghy/label";

interface IForm {
  name: string;
  description?: string;
}

interface IProps {
  handleClose: () => void;
}

const RepoCreateDialog = ({ handleClose }: IProps) => {
  const setActiveStep = useSetRecoilState(repoActiveStep);
  const setRepo = useSetRecoilState(repoAtom);

  const { isPending, mutate } = useCreateRepo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(repoCreateSchema),
  });

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const onSubmit = async (dataForm: IForm) => {
    mutate({
      name: dataForm.name,
      description: dataForm.description,
      callBack: (result) => {
        toast.success("مخزن با موفقیت ایجاد شد.");
        handleReset();
        setActiveStep(1);
        setRepo(result.data);
      },
    });
  };

  return (
    <>
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6"
      >
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label>عنوان مخزن</Label>
            <FormInput
              className="w-full"
              placeholder="عنوان مخزن"
              register={{...register("name")}}
              id="repo-name"
            />
            {errors.name && <WarningText>{errors.name?.message}</WarningText>}
          </div>
          <div className="flex flex-col gap-2">
            <Label>توضیحات مخزن</Label>
            <TextareaAtom
              className="w-full"
              placeholder="توضیحات مخزن"
              register={{
                ...register("description"),
              }}
            />
            {errors.description && (
              <WarningText>{errors.description?.message}</WarningText>
            )}
          </div>
        </form>
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
            ادامه
          </Text>
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default RepoCreateDialog;
