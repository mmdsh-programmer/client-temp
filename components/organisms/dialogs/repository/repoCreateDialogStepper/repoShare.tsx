import { repoActiveStep } from "@atom/stepper";
import { UserIcon } from "@components/atoms/icons";
import Text from "@components/atoms/typograghy/text";
import LoadingButton from "@components/molecules/loadingButton";
import useAddUser from "@hooks/user/useAddUser";
import useGetRoles from "@hooks/user/useGetRoles";
import { ERoles } from "@interface/enums";
import {
  Button,
  DialogBody,
  DialogFooter,
  Select,
} from "@material-tailwind/react";
import { translateRoles } from "@utils/index";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { yupResolver } from "@hookform/resolvers/yup";
import { repoUserSchema } from "../validation.yup";

interface IForm {
  username: string;
  accessName?: ERoles;
}

interface IProps {
  repo: any;
  handleClose: () => void;
}

const RepoShare = ({ repo, handleClose }: IProps) => {
  const setActiveStep = useSetRecoilState(repoActiveStep);
  const [userList, setUserList] =
    useState<{ username: string; accessName: ERoles | undefined }[]>();

  const { isPending, mutate } = useAddUser();
  const { data: getRoles } = useGetRoles();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(repoUserSchema),
  });

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const onSubmit = async (dataForm: IForm) => {
    if (!dataForm.accessName) return;
    mutate({
      repoId: repo.id,
      username: dataForm.username,
      accesName: dataForm.accessName,
      callBack: () => {
        toast.success(`${dataForm.username} با موفقیت به مخرن اضافه شد.`);
        clearErrors();
        reset();
        setUserList((prevUser) => {
          return prevUser
            ? [
                ...prevUser,
                {
                  username: dataForm.username,
                  accessName: dataForm.accessName,
                },
              ]
            : [
                {
                  username: dataForm.username,
                  accessName: dataForm.accessName,
                },
              ];
        });
      },
    });
  };
  return (
    <>
      <DialogBody placeholder="edit user dialog body" className="p-0 mt-[30px]">
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm text-primary font-normal">
              اشتراک گذاری با
            </label>
            <div className="border-2 px-2 py-[6px] justify-between items-center border-gray-200 bg-gray-50 rounded-lg flex ">
              <input
                id="title"
                type="text"
                placeholder="شناسه پادی"
                {...register("username")}
                className="flex-grow bg-transparent px-[15px] py-[9px] rounded-[4px] focus:px-[15px] focus:outline-none text-[13px] 
              font-iranYekan font-normal text-primary placeholder:text-placeholder w-full
               outline-none"
              />
              <div className="flex gap-x-2">
                <select
                  id="user-create-role"
                  className="text-sm flex items-center font-normal outline-none bg-transparent text-primary font-iranYekan"
                  {...register("accessName")}
                >
                  {getRoles?.data.map((item: any) => {
                    return item.name !== "owner" ? (
                      <option
                        key={item.name}
                        value={item.name}
                        className="text-primary"
                      >
                        {translateRoles(item.name)}
                      </option>
                    ) : null;
                  })}
                </select>
                <LoadingButton
                  className="bg-white font-iranYekan flex justify-center items-center rounded-lg px-4 py-2 text-[13px] text-primary font-normal "
                  onClick={handleSubmit(onSubmit)}
                  loading={isPending}
                >
                  دعوت
                </LoadingButton>
              </div>
            </div>
            {errors.username && (
              <small className="dialog-content__errorText text-dashboard-secondary text-xs w-full h-5">
                {errors.username?.message}
              </small>
            )}
          </div>
        </form>
        <div className="mt-5 ">
          {userList?.map((user) => {
            return (
              <div className="gap-x-2 w-fit rounded-lg px-6 py-3 flex items-center shadow-lg" key={user.username}>
                <div className="flex items-center">
                  <div className="rounded-full flex justify-center items-center h-10 w-10 bg-white shadow-md">
                    <UserIcon className="h-5 w-5 fill-gray-400" />
                  </div>
                  <Text text={user.username} className="text-primary mr-2 font-medium " />
                </div>
                <Text
                  className="text-primary font-normal mr-8"
                  text={translateRoles(user.accessName)}
                />
              </div>
            );
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
            setActiveStep(2);
          }}
        >
          ادامه
        </Button>
      </DialogFooter>
    </>
  );
};

export default RepoShare;
