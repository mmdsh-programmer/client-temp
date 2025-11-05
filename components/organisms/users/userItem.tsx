import React from "react";
import SelectAtom, { IOption } from "@components/molecules/select";
import { Typography } from "@material-tailwind/react";
import { useRepositoryStore } from "@store/repository";
import { ERoles } from "@interface/enums";
import { IUser } from "@interface/users.interface";
import ImageComponent from "@components/atoms/image";
import { UserIcon } from "@components/atoms/icons";
import { useUserStore } from "@store/user";
import { toast } from "react-toastify";
import { translateRoles } from "@utils/index";
import useEditUserRole from "@hooks/user/useEditUserRole";
import useGetRoles from "@hooks/user/useGetRoles";
import useGetUser from "@hooks/auth/useGetUser";
import { Spinner } from "@components/atoms/spinner";
import UserMenu from "@components/molecules/userMenu";

interface IProps {
  user: IUser;
}
interface IUserOption {
  label: string;
  value: string;
  className?: string;
}

const UserItem = ({ user }: IProps) => {
  const { repo: getRepo } = useRepositoryStore();
  const { setSelectedUser, notifService, blockService } = useUserStore();

  const { data: userInfo } = useGetUser();
  const { data: getRoles } = useGetRoles();
  const editRole = useEditUserRole();

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
  }

  const handleChange = (value: IOption) => {
    if (!getRepo) return;
    setSelectedUser(user);
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
      (getRepo?.roleName !== ERoles.owner && getRepo?.roleName !== ERoles.admin)
    ) {
      return (
        <div className="repo-user__role flex h-9 w-[100px] items-center justify-between rounded-lg border-[1px] border-normal pl-2 pr-3">
          <Typography
            {...({} as React.ComponentProps<typeof Typography>)}
            className="select_option__text text-primary_normal"
          >
            {translateRoles(user.userRole)}
          </Typography>
        </div>
      );
    }
    if (editRole.isPending) {
      return (
        <div className="w-5">
          <Spinner
            {...({} as React.ComponentProps<typeof Spinner>)}
            className="h-4 w-4 text-primary"
          />
        </div>
      );
    }
    return (
      <SelectAtom
        className="repo-user__change-role flex h-9 !w-[100px] items-center justify-between rounded-lg border-[1px] border-normal pl-2 pr-3"
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
      className="repo-user-item flex h-[45px] min-h-[45px] cursor-pointer items-center gap-x-[10px]"
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
      <Typography
        {...({} as React.ComponentProps<typeof Typography>)}
        className="title_t3 flex-grow text-primary_normal"
      >
        {user.userInfo.name}
      </Typography>
      <div className="flex items-center justify-center gap-2">
        {renderUserRole()}
        {!notifService && !blockService ? (
          <div className="h-6 w-6">
            {getRepo?.roleName === ERoles.owner ||
            userInfo?.username === user.userInfo.userName ||
            (getRepo?.roleName === ERoles.admin &&
              user.userRole !== ERoles.owner &&
              getRepo?.roleName === ERoles.admin &&
              !(
                user.userRole === ERoles.admin && userInfo?.username !== user.userInfo.userName
              )) ? (
              <UserMenu user={user} />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserItem;
