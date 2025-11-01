import React, { useState } from "react";
import { Switch, Typography } from "@material-tailwind/react";
import useGetUserConfigPanel from "@hooks/configPanel/useGetUserConfigPanel";
import { ERoles } from "@interface/enums";
import UserItem from "@components/organisms/users/userItem";
import useGetUser from "@hooks/auth/useGetUser";
import { useRepositoryStore } from "@store/repository";
import { useUserStore } from "@store/user";
import InputAtom from "@components/atoms/input";
import { Spinner } from "@components/atoms/spinner";

const SelfBlockServices = () => {
  const { repo: getRepo } = useRepositoryStore();
  const { data: userInfo } = useGetUser();
  const { selectedUser: getSelectedUser } = useUserStore();

  const [searchValue, setSearchValue] = useState("");

  const { data: getUserConfigPanel, isLoading } = useGetUserConfigPanel(
    getRepo!.id,
    +userInfo!.ssoId === +getSelectedUser!.userInfo.ssoId
      ? undefined
      : getSelectedUser!.userInfo.ssoId,
  );

  const filteredOptions = getUserConfigPanel?.filter((config) => {
    return config.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return isLoading ? (
    <div className="flex w-full justify-center">
      <Spinner className="h-6 w-6 text-primary" />
    </div>
  ) : (
    <div className="mt-3 flex flex-col gap-3">
      {getSelectedUser && <UserItem user={getSelectedUser} />}
      <div className="border-b border-b-normal" />
      <InputAtom
        type="text"
        value={searchValue}
        onChange={(e) => {
          return setSearchValue(e.target.value);
        }}
        placeholder="جستجو..."
        className="!h-8 !border-normal !bg-white"
        dir="rtl"
      />
      <div className="flex h-[calc(100vh-280px)] w-full flex-col gap-2 overflow-y-auto overflow-x-hidden px-2 xs:h-[calc(100vh-380px)]">
        {filteredOptions?.length ? (
          filteredOptions.map((userConfig) => {
            return (
              <div
                key={`notif-access-${userConfig.serviceName}`}
                className="hover:border-primary mb-1 flex w-full justify-between rounded-md border p-2 transition-colors"
              >
                <Typography
                  placeholder=""
                  className="title_t4 !text-primary_normal"
                  {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
                >
                  {userConfig.title}
                </Typography>
                <Switch
                  color="green"
                  defaultChecked={!userConfig.blocked}
                  readOnly={
                    (getRepo?.roleName === ERoles.admin &&
                      getSelectedUser?.userRole === ERoles.admin) ||
                    getRepo?.roleName === ERoles.editor ||
                    getRepo?.roleName === ERoles.writer ||
                    getRepo?.roleName === ERoles.viewer
                  }
                  disabled={
                    (getRepo?.roleName === ERoles.admin &&
                      getSelectedUser?.userRole === ERoles.admin) ||
                    getRepo?.roleName === ERoles.editor ||
                    getRepo?.roleName === ERoles.writer ||
                    getRepo?.roleName === ERoles.viewer
                  }
                  {...({} as Omit<
                    React.ComponentProps<typeof Switch>,
                    "color" | "defaultChecked" | "onChange" | "readOnly" | "disabled"
                  >)}
                />
              </div>
            );
          })
        ) : (
          <Typography
            placeholder=""
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            className="label mt-6 text-center text-gray-500"
          >
            موردی یافت نشد
          </Typography>
        )}
      </div>
    </div>
  );
};

export default SelfBlockServices;
