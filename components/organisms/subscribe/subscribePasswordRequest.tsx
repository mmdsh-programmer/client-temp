import React, { useState } from "react";
import { Checkbox, Typography } from "@material-tailwind/react";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import FormInput from "@components/atoms/input/formInput";
import { subscribeScheme } from "../dialogs/repository/validation.yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useSubscribeRepo from "@hooks/public/useSubscribeRepo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSetRecoilState } from "recoil";
import { repoGroupingAtom } from "@atom/repository";
import { ERepoGrouping } from "@interface/enums";

interface IDataForm {
  password: string;
}

interface IProps {
  hash: string;
  hasPassword: string;
}

const SubscribePasswordRequest = ({ hash, hasPassword }: IProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const setRepoGroup = useSetRecoilState(repoGroupingAtom);

  const subscribeHook = useSubscribeRepo();

  const form = useForm<IDataForm>({ resolver: yupResolver(subscribeScheme) });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const close = () => {
    router.push("/admin/repositories");
  };

  const onSubmit = async (dataForm: IDataForm) => {
    if (hash && hasPassword) {
      subscribeHook.mutate({
        hash,
        password: dataForm.password,
        callBack: (result) => {
          toast.success("با موفقیت به ریپو منصوب شدید");
          router.push(`/admin/repositories?repoId=${result.data.repository.id}`);
          localStorage.removeItem("CLASOR:LAST_PAGE");
          setRepoGroup(ERepoGrouping.ACCESS_REPO);
        },
        errorCallBack: () => {
          localStorage.removeItem("CLASOR:LAST_PAGE");
          router.push("/admin/dashboard");
        },
      });
    }
  };
  return (
    <ConfirmFullHeightDialog
      isPending={subscribeHook.isPending}
      onSubmit={handleSubmit(onSubmit)}
      dialogHeader="رمز عبور لینک"
      setOpen={close}
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Checkbox
            crossOrigin="anonymous"
            label={
              <Typography className="text-primary font-medium text-[13px] leading-[19.5px] -tracking-[0.13px] ">
                نمایش رمز عبور
              </Typography>
            }
            color="deep-purple"
            checked={showPassword}
            onChange={() => {
              setShowPassword(!showPassword);
            }}
            containerProps={{ className: "-mr-3" }}
          />
          <Typography className="label">رمز عبور</Typography>
          <FormInput
            type={showPassword ? "text" : "password"}
            register={{ ...register("password") }}
          />
          {errors.password && (
            <Typography className="warning_text">
              {errors.password?.message}
            </Typography>
          )}
        </div>
      </form>
    </ConfirmFullHeightDialog>
  );
};

export default SubscribePasswordRequest;
