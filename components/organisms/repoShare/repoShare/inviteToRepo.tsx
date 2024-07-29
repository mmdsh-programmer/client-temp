import React, { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAddUser from "@hooks/user/useAddUser";
import useGetRoles from "@hooks/user/useGetRoles";
import { translateRoles } from "@utils/index";
import { useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import Label from "@components/atoms/typograghy/label";
import InputAtom from "@components/atoms/input";
import SelectAtom from "@components/atoms/select/select";
import { ERoles } from "@interface/enums";
import Text from "@components/atoms/typograghy/text";
import WarningText from "@components/atoms/typograghy/warningText";
import LoadingButton from "@components/molecules/loadingButton";

interface IForm {
  username: string;
  accessName: string;
}

const InviteToRepo = () => {
  const getRepo = useRecoilValue(repoAtom);
  const [role, setRole] = useState<ERoles | string>(ERoles.admin);
  const { isPending, mutate } = useAddUser();
  const { data: getRoles, isFetching: isFetchingRoles } = useGetRoles();

  const rolesOption = getRoles
    ?.filter((role) => {
      return role.name !== ERoles.owner && role.name !== ERoles.default;
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
  } = useForm<IForm>();

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
  };

  const onSubmit = async (dataForm: IForm) => {
    if (!getRepo) return;
    mutate({
      repoId: getRepo?.id,
      username: dataForm.username,
      accesName: role,
      callBack: () => {
        toast.success(`${dataForm.username} با موفقیت به مخرن اضافه شد.`);
        handleClose();
      },
    });
  };
  return isFetchingRoles ? (
    <div className="flex p-6 justify-center items-center">
      <Spinner color="deep-purple" />
    </div>
  ) : (
    <form className="pb-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 my-4">
        <div className="flex flex-col gap-2">
          <Label labelFor="username"> اشتراک گذاری با </Label>
          <div className="flex items-center gap-2 !h-12 pr-3 pl-2 !bg-gray-50 border-[1px] !border-normal rounded-lg">
            <InputAtom
              id="username"
              className="!w-auto h-auto overflow-hidden !p-0 border-none"
              placeholder="شناسه پادی"
              register={{ ...register("username") }}
            />
            <SelectAtom
              className="w-auto"
              defaultOption={rolesOption?.[0].label}
              options={rolesOption}
              selectedOption={role}
              setSelectedOption={setRole}
            />
            <LoadingButton
              loading={isPending}
              onClick={handleSubmit(onSubmit)}
              className="!h-8 !bg-white !w-auto !rounded-sm shadow-none hover:shadow-none hover:bg-white"
            >
              <Text className="!text-primary px-3 font-medium text-[13px] leading-[18px] -tracking-[0.12px]">
                دعوت
              </Text>
            </LoadingButton>
          </div>
        </div>
        {errors.username && (
          <WarningText>{errors.username?.message}</WarningText>
        )}
        <Text className="text-placeholder text-[11px] leading-[18px] -tracking-[0.11px] ">
          برای اشتراک‌گذاری با سایر کاربران، نام کاربری و سطوح دسترسی مورد نظر
          را در این قسمت وارد کنید.
        </Text>
      </div>
      <div className="border-b-[1px] bg-gray-200 w-full" />
    </form>
  );
};

export default InviteToRepo;
