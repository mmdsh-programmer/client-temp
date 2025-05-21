import React, { useState } from "react";
import SelectAtom, { IOption } from "@components/molecules/select";
import { Spinner, Typography } from "@material-tailwind/react";

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
  const { isPending, mutate } = useAddUser();
  const { data: getRoles, isLoading: isLoadingRoles } = useGetRoles();

  const rolesOption = getRoles
    ?.filter((roleItem) => {
      return roleItem.name !== ERoles.owner && roleItem.name !== ERoles.default;
    })
    .map((item) => {
      return { label: translateRoles(item.name), value: item.name };
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
  return (
    <form className="repo-invite-form pb-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="my-4 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Typography className="label"> اشتراک گذاری با </Typography>
          <div className="flex !h-12 items-center gap-2 rounded-lg border-[1px] !border-normal !bg-gray-50 pl-2 pr-3">
            <InputAtom
              id="username"
              className="repo-invite-form__input h-auto !w-auto overflow-hidden border-none !p-0"
              placeholder="شناسه پادی"
              register={{ ...register("username") }}
            />
            {isLoadingRoles ? (
              <Spinner color="deep-purple" />
            ) : (
              <SelectAtom
                className="repo-invite-form__select w-auto"
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
            )}
            <LoadingButton
              loading={isPending}
              onClick={handleSubmit(onSubmit)}
              className="repo-invite-form__button !h-8 !rounded-sm !bg-white px-3 shadow-none hover:bg-white hover:shadow-none"
            >
              <Typography className="text__label__button font-medium !text-primary_normal">
                دعوت
              </Typography>
            </LoadingButton>
          </div>
        </div>
        {errors.username && (
          <Typography className="warning_text">{errors.username?.message}</Typography>
        )}
        <Typography className="caption_c2 text-placeholder">
          برای اشتراک‌گذاری با سایر کاربران، نام کاربری و سطوح دسترسی مورد نظر را در این قسمت وارد
          کنید.
        </Typography>
      </div>
      <div className="w-full border-b-[1px] bg-gray-200" />
    </form>
  );
};

export default InviteToRepo;
