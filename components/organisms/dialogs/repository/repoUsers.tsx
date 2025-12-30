import { Typography } from "@material-tailwind/react";
import { Spinner } from "@components/atoms/spinner";
import { IRoles } from "@interface/users.interface";
import ImageComponent from "@components/atoms/image";
import React from "react";
import { UserIcon } from "@components/atoms/icons";
import { translateRoles } from "@utils/index";
import { useForm } from "react-hook-form";
import useGetInviteRequests from "@hooks/user/useGetInviteRequestsByOwner";
import useGetRoles from "@hooks/user/useGetRoles";
import useGetUsers from "@hooks/user/useGetRepoUsers";
import { useRepositoryStore } from "@store/repository";

interface IForm {
  userName: string;
  roleName: string;
}

const RepoUsers = () => {
  const { repo: getRepo } = useRepositoryStore();
  const repoId = getRepo!.id;
  const { data: getRoles } = useGetRoles();

  const { data: getInviteRequests, isFetching: isFetchingInviteRequests } = useGetInviteRequests(
    repoId,
    10,
  );

  const { data: getRepoUsers, isFetching: isFetchingUsers } = useGetUsers(repoId, 10, true);

  const { register } = useForm<IForm>();

  return (
    <div className="repo-users flex w-full flex-col">
      <div className="h-2 border-b-2 border-gray-300" />
      {isFetchingInviteRequests || isFetchingUsers ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      ) : (
        <div className="repo-users__list">
          {getRepoUsers?.pages.map((page) => {
            return page.list.map((user) => {
              return (
                <div className="repo-user-item flex" key={user.userInfo.ssoId}>
                  <div
                    key={user.userInfo.ssoId}
                    title={user.userInfo.userName || ""}
                    className="h-8 w-8 cursor-pointer"
                  >
                    {user.userInfo.img ? (
                      <ImageComponent
                        src={user.userInfo.img}
                        alt={user.userInfo.userName}
                        className="h-full w-full rounded-full border-[3px] border-white"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full border-[3px] border-white bg-gray-50">
                        <UserIcon className="h-5 w-5 fill-gray-400" />
                      </div>
                    )}
                  </div>
                  <Typography {...({} as React.ComponentProps<typeof Typography>)}>
                    {user.userInfo.userName}
                  </Typography>
                  <select
                    id="user-create-role"
                    className="repo-users__select-role bg-transparent font-iranYekan text-[14px] text-primary_normal outline-none"
                    {...register("roleName")}
                  >
                    {getRoles?.map((item: IRoles) => {
                      return item.name !== "owner" ? (
                        <option key={item.name} value={item.name} className="text-primary_normal">
                          {translateRoles(item.name)}
                        </option>
                      ) : null;
                    })}
                  </select>
                </div>
              );
            });
          })}
          {getInviteRequests?.pages.map((page) => {
            return page.list.map((user) => {
              return (
                <div className="repo-user-item flex" key={user.userSSOID}>
                  <div
                    key={user.userSSOID}
                    title={user.user.preferred_username || ""}
                    className="h-8 w-8 cursor-pointer"
                  >
                    {user.user.picture ? (
                      <ImageComponent
                        src={user.user.picture}
                        alt={user.user.preferred_username}
                        className="h-full w-full rounded-full border-[3px] border-white"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full border-[3px] border-white bg-gray-50">
                        <UserIcon className="h-5 w-5 fill-gray-400" />
                      </div>
                    )}
                  </div>
                  <Typography {...({} as React.ComponentProps<typeof Typography>)}>
                    {user.user.preferred_username}
                  </Typography>
                  <select
                    id="user-create-role"
                    className="bg-transparent font-iranYekan text-[14px] text-primary_normal outline-none"
                    {...register("roleName", { value: user.role })}
                  >
                    {getRoles?.map((item: IRoles) => {
                      return (
                        <option key={item.name} value={item.name} className="text-primary_normal">
                          {translateRoles(item.name)}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            });
          })}
        </div>
      )}
    </div>
  );
};

export default RepoUsers;
