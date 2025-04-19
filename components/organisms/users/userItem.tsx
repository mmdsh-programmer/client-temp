import SelectAtom, { IOption } from "@components/molecules/select";
import { Spinner, Typography } from "@material-tailwind/react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { ERoles } from "@interface/enums";
import { IUser } from "@interface/users.interface";
import ImageComponent from "@components/atoms/image";
import React from "react";
import { UserIcon } from "@components/atoms/icons";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import { translateRoles } from "@utils/index";
import useDeleteUser from "@hooks/user/useDeleteUser";
import useEditUserRole from "@hooks/user/useEditUserRole";
import useGetRoles from "@hooks/user/useGetRoles";
import useTranferOwnershipRepository from "@hooks/repository/useTransferOwnershipRepository";
import { userIdAtom } from "@atom/app";

interface IProps {
  user: IUser;
}

const UserItem = ({ user }: IProps) => {
  const [getRepo, setRepo] = useRecoilState(repoAtom);
  const  setUserId = useSetRecoilState(userIdAtom);
  const { data: getRoles } = useGetRoles();
  const editRole = useEditUserRole();
  const deleteUser = useDeleteUser();
  const transferOwnership = useTranferOwnershipRepository();

  const rolesOption = getRoles
    ?.filter((role) => {
      return role.name !== ERoles.owner && role.name !== ERoles.default;
    })
    .map((item) => {
      return { label: translateRoles(item.name), value: item.name };
    }) as {
    label: string;
    value: ERoles | string;
    className?: string;
  }[];

  const userOptions = rolesOption.concat([
    {
      label: "انتقال مالکیت",
      value: "transferOwnership",
      className: "repo-user__transfer-ownership",
    },
    {
      label: "تنظیمات پیشرفته",
      value: "setting",
      className: "repo-user__advanced-setting",
    },
    {
      label: "حذف کاربر",
      value: "delete",
      className: "!text-error repo-user__delete-user",
    },
  ]);

  const handleChange = (value: IOption) => {
    if (!getRepo) return;
    if (value.value === "setting") {
      return setUserId(user.userInfo.ssoId);
    }
    if (value.value === "delete") {
      return deleteUser.mutate({
        repoId: getRepo.id,
        userName: user.userInfo.userName,
        callBack: () => {
          toast.success(`کاربر ${user.userInfo.userName} با موفقیت حذف شد.`);
        },
      });
    } 
    if (value.value === "transferOwnership") {
     return transferOwnership.mutate({
        repoId: getRepo.id,
        userName: user.userInfo.userName,
        callBack: () => {
          setRepo({
            ...getRepo,
            roleName: ERoles.admin,
          });
          toast.success("انتقال مالکیت با موفقیت انجام شد.");
        },
      });
    } 
      editRole.mutate({
        repoId: getRepo.id,
        userName: user.userInfo.userName,
        roleName: value.value as string,
        callBack: () => {
          toast.success(
            `نقش کاربر ${user.userInfo.userName} با موفقیت تغییر کرد.`
          );
        },
      });
    
  };

  const renderUserRole = () => {
    if (user.userRole === ERoles.owner) {
      return (
        <div className="repo-user__role w-[120px] flex items-center justify-between pr-3 pl-2 rounded-lg h-9 border-[1px] border-normal">
          <Typography className="select_option__text text-primary_normal">
            {translateRoles(user.userRole)}
          </Typography>
        </div>
      );
    }
    if (
      editRole.isPending ||
      deleteUser.isPending ||
      transferOwnership.isPending
    ) {
      return (
        <div className="w-5">
          <Spinner className="h-4 w-4" color="deep-purple" />
        </div>
      );
    }
    return (
      <SelectAtom
        className="repo-user__change-role !w-[120px] flex items-center justify-between pr-3 pl-2 rounded-lg h-9 border-[1px] border-normal"
        defaultOption={{
          label: translateRoles(user.userRole),
          value: user.userRole,
        }}
        options={userOptions}
        selectedOption={{
          label: translateRoles(user.userRole),
          value: user.userRole,
        }}
        setSelectedOption={handleChange}
      />
    );
  };

  return (
    <div
      className="repo-user-item flex items-center gap-x-[10px] min-h-[50px] h-[50px] cursor-pointer"
      title={user.userInfo.userName}
    >
      <div className="h-8 w-8">
        {user.userInfo.img ? (
          <ImageComponent
            className="w-full h-full rounded-[64px] overflow-hidden"
            src={user.userInfo.img}
            alt={user.userInfo.userName}
          />
        ) : (
          <UserIcon className="w-full h-full p-1 border-[2px] border-normal rounded-[64px] overflow-hidden fill-icon-hover" />
        )}
      </div>
      <Typography className="title_t3 flex-grow text-primary_normal">
        {user.userInfo.name}
      </Typography>
      {renderUserRole()}
    </div>
  );
};

export default UserItem;
