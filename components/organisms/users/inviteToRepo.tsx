import React, { useState } from "react";
import SelectAtom, { IOption } from "@components/molecules/select";
import {
 Spinner,
 Typography
} from "@material-tailwind/react";

import { ERoles } from "@interface/enums";
import InputAtom from "@components/atoms/input";
import LoadingButton from "@components/molecules/loadingButton";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import { translateRoles } from "@utils/index";
import useAddUser from "@hooks/user/useAddUser";
import { useForm } from "react-hook-form";
import useGetRoles from "@hooks/user/useGetRoles";
import { useRecoilValue } from "recoil";
import { userSchema } from "./validation.yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IForm {
  username: string;
}

const InviteToRepo = () => {
  const getRepo = useRecoilValue(repoAtom);
  const [role, setRole] = useState<IOption>({
    label: translateRoles(ERoles.admin),
    value: ERoles.admin,
  });
  const {
 isPending, mutate 
} = useAddUser();
  const {
 data: getRoles, isFetching: isFetchingRoles 
} = useGetRoles();

  const rolesOption = getRoles
    ?.filter((roleItem) => {
      return roleItem.name !== ERoles.owner && roleItem.name !== ERoles.default;
    })
    .map((item) => {
      return {
        label: translateRoles(item.name),
        value: item.name,
      };
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IForm>({ resolver: yupResolver(userSchema) });

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const onSubmit = async (dataForm: IForm) => {
    if (!getRepo) return;
    mutate({
      repoId: getRepo?.id,
      username: dataForm.username,
      accesName: role.value as ERoles,
      callBack: () => {
        toast.success(`${dataForm.username} با موفقیت به مخرن اضافه شد.`);
        setRole({
          label: translateRoles(ERoles.admin),
          value: ERoles.admin,
        });
        handleReset();
      },
    });
  };
  return isFetchingRoles ? (
    <div className="flex p-6 justify-center items-center">
      <Spinner color="deep-purple" />
    </div>
  ) : (
    <form className="pb-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 my-4">
        <div className="flex flex-col gap-2">
          <Typography className="label"> اشتراک گذاری با </Typography>
          <div className="flex items-center gap-2 !h-12 pr-3 pl-2 !bg-gray-50 border-[1px] !border-normal rounded-lg">
            <InputAtom
              id="username"
              className="!w-auto h-auto overflow-hidden !p-0 border-none"
              placeholder="شناسه پادی"
              register={{ ...register("username") }}
            />
            <SelectAtom
              className="w-auto"
              defaultOption={rolesOption?.[0]}
              options={rolesOption}
              selectedOption={role}
              setSelectedOption={(value) => {
                return setRole({
                  label: value.label,
                  value: value.value,
                });
              }}
            />
            <LoadingButton
              loading={isPending}
              onClick={handleSubmit(onSubmit)}
              className="!h-8 !bg-white !w-auto !rounded-sm shadow-none hover:shadow-none hover:bg-white"
            >
              <Typography className="text__label__button !text-primary px-3 font-medium">
                دعوت
              </Typography>
            </LoadingButton>
          </div>
        </div>
        {errors.username && (
          <Typography className="warning_text">
            {errors.username?.message}
          </Typography>
        )}
        <Typography className="caption_c2 text-placeholder">
          برای اشتراک‌گذاری با سایر کاربران، نام کاربری و سطوح دسترسی مورد نظر
          را در این قسمت وارد کنید.
        </Typography>
      </div>
      <div className="border-b-[1px] bg-gray-200 w-full" />
    </form>
  );
};

export default InviteToRepo;
