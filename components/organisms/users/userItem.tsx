import React from "react";
import SelectAtom, { IOption } from "@components/molecules/select";
import { Spinner, Typography } from "@material-tailwind/react";
import { useRecoilState } from "recoil";
import { ERoles } from "@interface/enums";
import { IUser } from "@interface/users.interface";
import ImageComponent from "@components/atoms/image";
import { UserIcon } from "@components/atoms/icons";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import { translateRoles } from "@utils/index";
import useDeleteUser from "@hooks/user/useDeleteUser";
import useEditUserRole from "@hooks/user/useEditUserRole";
import useGetRoles from "@hooks/user/useGetRoles";
import useTranferOwnershipRepository from "@hooks/repository/useTransferOwnershipRepository";
import { selectedUserAtom } from "@atom/user";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  user: IUser;
}
interface IUserOption {
  label: string;
  value: string;
  className?: string;
}

const UserItem = ({ user }: IProps) => {
  const [getRepo, setRepo] = useRecoilState(repoAtom);
  const [getSelectedUser, setSelectedUser] = useRecoilState(selectedUserAtom);

  const { data: userInfo } = useGetUser();
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
    }) as IUserOption[];

  const userOptions: IUserOption[] = [];

  if (getRepo?.roleName === ERoles.owner || getRepo?.roleName === ERoles.admin) {
    userOptions.push(...rolesOption);
    if (getRepo?.roleName === ERoles.owner) {
      userOptions.push({
        label: "انتقال مالکیت",
        value: "transferOwnership",
        className: "repo-user__transfer-ownership",
      });
    }
    if (!getSelectedUser?.userInfo) {
      userOptions.push({
        label: "تنظیمات پیشرفته",
        value: "setting",
        className: "repo-user__advanced-setting",
      });
    }

    userOptions.push({
      label: "حذف کاربر",
      value: "delete",
      className: "!text-error repo-user__delete-user",
    });
  } else if (userInfo?.username === user.userInfo.userName) {
    userOptions.push({
      label: "تنظیمات پیشرفته",
      value: "setting",
      className: "repo-user__advanced-setting",
    });
  }

  const handleChange = (value: IOption) => {
    if (!getRepo) return;
    if (value.value === "setting") {
      return setSelectedUser(user);
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
      ssoId: user.userInfo.ssoId,
      callBack: () => {
        toast.success(`نقش کاربر ${user.userInfo.userName} با موفقیت تغییر کرد.`);
      },
    });
  };

  const renderUserRole = () => {
    if (
      user.userRole === ERoles.owner ||
      (!(getRepo?.roleName === ERoles.admin || getRepo?.roleName === ERoles.owner) &&
        userInfo?.username !== user.userInfo.userName)
    ) {
      return (
        <div className="repo-user__role flex h-9 w-[120px] items-center justify-between rounded-lg border-[1px] border-normal pl-2 pr-3">
          <Typography className="select_option__text text-primary_normal">
            {translateRoles(user.userRole)}
          </Typography>
        </div>
      );
    }
    if (editRole.isPending || deleteUser.isPending || transferOwnership.isPending) {
      return (
        <div className="w-5">
          <Spinner className="h-4 w-4" color="purple" />
        </div>
      );
    }
    return (
      <SelectAtom
        className="repo-user__change-role flex h-9 !w-[120px] items-center justify-between rounded-lg border-[1px] border-normal pl-2 pr-3"
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
      className="repo-user-item flex h-[50px] min-h-[50px] cursor-pointer items-center gap-x-[10px]"
      title={user.userInfo.userName}
    >
      <div className="h-8 w-8">
        {user.userInfo.img ? (
          <ImageComponent
            className="h-full w-full overflow-hidden rounded-[64px]"
            src={user.userInfo.img}
            alt={user.userInfo.userName}
          />
        ) : (
          <UserIcon className="h-full w-full overflow-hidden rounded-[64px] border-[2px] border-normal fill-icon-hover p-1" />
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
