import React from "react";
import { Spinner } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import { translateRoles } from "@utils/index";
import useAddUser from "@hooks/user/useAddUser";
import { useForm } from "react-hook-form";
import useGetRoles from "@hooks/user/useGetRoles";
import { useRecoilValue } from "recoil";
import { IRoles } from "@interface/users.interface";

interface IForm {
  username: string;
  accessName: string;
}

const RepoInvite = () => {
  const getRepo = useRecoilValue(repoAtom);
  const {
 isPending, mutate 
} = useAddUser();
  const {
 data: getRoles, isFetching: isFetchingRoles 
} = useGetRoles();

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
      accesName: dataForm.accessName,
      callBack: () => {
        toast.success(`${dataForm.username} با موفقیت به مخرن اضافه شد.`);
        handleClose();
      },
    });
  };

  return isFetchingRoles ? (
    <Spinner color="deep-purple" />
  ) : (
    <form className="repo-invite-form flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm text-primary font-normal">
          اشتراک گذاری با
        </label>
        <div className="border-2 p-2 border-gray-200 bg-gray-50 rounded-lg flex ">
          <input
            id="title"
            type="text"
            placeholder="شناسه پادی"
            {...register("username")}
            className="repo-invite-form__input flex-grow bg-transparent px-[15px] py-[9px] rounded-[4px] focus:px-[15px] focus:outline-none text-[13px] 
               font-iranYekan font-normal text-primary placeholder:text-placeholder w-full
                outline-none"
          />
          <select
            id="user-create-role"
            className="repo-invite-form__select text-[14px] font-iranYekan outline-none bg-transparent text-primary"
            {...register("accessName")}
          >
            {getRoles?.map((item: IRoles) => {
              return (
                <option
                  key={item.name}
                  value={item.name}
                  className="text-primary"
                >
                  {translateRoles(item.name)}
                </option>
              );
            })}
          </select>
          {isPending ? (
            <Spinner className="h-5 w-5" color="deep-purple" />
          ) : (
            <button
              disabled={isPending}
              className="repo-invite-form__button font-iranYekan mr-2 bg-white py-0 px-3 rounded-lg"
            >
              دعوت
            </button>
          )}
        </div>
        {errors.username && (
          <small className="dialog-content__errorText text-dashboard-secondary text-xs w-full h-5">
            {errors.username?.message}
          </small>
        )}
        <span className="text-placeholder text-[11px] font-iranYekan ">
          برای اشتراک‌گذاری با سایر کاربران، نام کاربری و سطوح دسترسی مورد نظر
          را در این قسمت وارد کنید.
        </span>
      </div>
    </form>
  );
};

export default RepoInvite;
