import React from "react";
import { repoAtom } from "@atom/repository";
import useGetInviteRequests from "@hooks/user/useGetInviteRequestsByOwner";
import useGetUsers from "@hooks/user/useGetRepoUsers";
import { useRecoilValue } from "recoil";
import { Spinner, Typography } from "@material-tailwind/react";
import ImageComponent from "@components/atoms/image";
import { UserIcon } from "@components/atoms/icons";
import useGetRoles from "@hooks/user/useGetRoles";
import { useForm } from "react-hook-form";
import { translateRoles } from "@utils/index";

interface IForm {
  userName: string;
  roleName: string;
}

const RepoUsers = () => {
  const getRepo = useRecoilValue(repoAtom);
  const { data: getRoles, isFetching: isFetchingRoles } = useGetRoles();

  const { data: getInviteRequests, isFetching: isFetchingInviteRequests } =
    useGetInviteRequests(getRepo?.id, 10, true);

  const { data: getRepoUsers, isFetching: isFetchingUsers } = useGetUsers(
    getRepo?.id,
    10,
    true
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IForm>();

  return (
    <div className="flex flex-col w-full">
      <div className="h-2 border-b-2 border-gray-300" />
      {isFetchingInviteRequests || isFetchingUsers ? (
        <div className="h-full w-full flex justify-center items-center">
          <Spinner color="deep-purple" className="" />
        </div>
      ) : (
        <div>
          {getRepoUsers?.pages.map((page) => {
            return page.list.map((user) => {
              return (
                <div className="flex" key={user.userInfo.ssoId}>
                  <div
                    key={user.userInfo.ssoId}
                    title={user.userInfo.userName || ""}
                    className={` w-8 h-8 cursor-pointer
                     `}
                  >
                    {user.userInfo.img ? (
                      <ImageComponent
                        src={user.userInfo.img}
                        alt={user.userInfo.userName}
                        className="h-full w-full rounded-full border-[3px] border-white"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-full border-[3px] border-white">
                        <UserIcon className="h-5 w-5 fill-gray-400" />
                      </div>
                    )}
                  </div>
                  <Typography> {user.userInfo.userName}</Typography>
                  <select
                    id="user-create-role"
                    className="text-[14px] font-iranYekan outline-none bg-transparent text-primary"
                    {...register("roleName")}
                  >
                    {getRoles?.map((item: any) => {
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
                </div>
              );
            });
          })}
          {getInviteRequests?.pages.map((page) => {
            return page.list.map((user) => {
              return (
                <div className="flex" key={user.userSSOID}>
                  <div
                    key={user.userSSOID}
                    title={user.user.preferred_username || ""}
                    className={` w-8 h-8 cursor-pointer
                     `}
                  >
                    {user.user.picture ? (
                      <ImageComponent
                        src={user.user.picture}
                        alt={user.user.preferred_username}
                        className="h-full w-full rounded-full border-[3px] border-white"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-full border-[3px] border-white">
                        <UserIcon className="h-5 w-5 fill-gray-400" />
                      </div>
                    )}
                  </div>
                  <Typography> {user.user.preferred_username}</Typography>
                  <select
                    id="user-create-role"
                    className="text-[14px] font-iranYekan outline-none bg-transparent text-primary"
                    {...register("roleName", {
                      value: user.role,
                    })}
                  >
                    {getRoles?.map((item: any) => {
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
