import React, { useEffect, useState } from "react";
import { Switch, Typography } from "@material-tailwind/react";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useGetUserConfigPanel from "@hooks/configPanel/useGetUserConfigPanel";
import { ERoles } from "@interface/enums";
import UserItem from "@components/organisms/users/userItem";
import useGetUser from "@hooks/auth/useGetUser";
import { useRepositoryStore } from "@store/repository";
import { useUserStore } from "@store/user";
import InputAtom from "@components/atoms/input";
import { Spinner } from "@components/atoms/spinner";
import useUpdateUserBlockServices from "@hooks/configPanel/useUpdateUserBlockServices";

const UserConfigPanelBlockServiceDialog = () => {
  const { repo: getRepo } = useRepositoryStore();
  const { data: userInfo } = useGetUser();
  const {
    selectedUser: getSelectedUser,
    setSelectedUser,
    setBlockService,
    setUserDrawer,
  } = useUserStore();

  const [searchValue, setSearchValue] = useState("");
  const [blockServices, setBlockServices] = useState<string[]>([]);

  const { data: getUserConfigPanel, isLoading } = useGetUserConfigPanel(
    getRepo!.id,
    getSelectedUser!.userInfo.ssoId,
  );
  const updateUserBlockServices = useUpdateUserBlockServices();
  const { handleSubmit } = useForm();

  const handleClose = () => {
    setSelectedUser(null);
    setBlockService(false);
    setUserDrawer(false);
  };

  const handleChange = (serviceName: string) => {
    setBlockServices((prev) => {
      return prev.includes(serviceName)
        ? prev.filter((s) => {
            return s !== serviceName;
          })
        : [...prev, serviceName];
    });
  };

  const onSubmit = () => {
    if (!getRepo || !getSelectedUser) return;

    updateUserBlockServices.mutate({
      repoId: getRepo.id,
      ssoId: getSelectedUser.userInfo.ssoId || userInfo!.ssoId,
      blockedServices: blockServices,
      callBack: () => {
        return toast.success("تنظیمات دسترسی برای کاربر به‌روز شد.");
      },
    });
  };

  useEffect(() => {
    if (getUserConfigPanel) {
      const services = getUserConfigPanel
        .filter((userConfig) => {
          return userConfig.blocked;
        })
        .map((userConfig) => {
          return userConfig.serviceName;
        });
      setBlockServices(services);
    }
  }, [getUserConfigPanel]);

  const filteredOptions = getUserConfigPanel?.filter((config) => {
    return config.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <ConfirmFullHeightDialog
      isPending={updateUserBlockServices.isPending}
      dialogHeader="محدودسازی دسترسی‌های کاربر"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="user-limitation-dialog xs:!min-w-[450px] xs:!max-w-[450px]"
      bodyClassName="!pt-1"
      backToMain
      disabled={
        (getRepo?.roleName === ERoles.admin && getSelectedUser?.userRole === ERoles.admin) ||
        getRepo?.roleName === ERoles.editor ||
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer
      }
    >
      {isLoading ? (
        <div className="flex w-full justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
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
          <div className="flex h-[calc(100vh-280px)] w-full flex-col gap-2 overflow-y-auto overflow-x-hidden px-2 xs:h-[calc(100vh-500px)]">
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
                      onChange={() => {
                        return handleChange(userConfig.serviceName);
                      }}
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
      )}
    </ConfirmFullHeightDialog>
  );
};

export default UserConfigPanelBlockServiceDialog;
