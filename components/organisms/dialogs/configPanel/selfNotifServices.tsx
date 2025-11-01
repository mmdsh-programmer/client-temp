import React, { useEffect, useState } from "react";
import { Switch, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useGetUserConfigPanel from "@hooks/configPanel/useGetUserConfigPanel";
import UserItem from "@components/organisms/users/userItem";
import useGetUser from "@hooks/auth/useGetUser";
import { useRepositoryStore } from "@store/repository";
import { useUserStore } from "@store/user";
import InputAtom from "@components/atoms/input";
import { Spinner } from "@components/atoms/spinner";
import LoadingButton from "@components/molecules/loadingButton";
import CancelButton from "@components/atoms/button/cancelButton";
import useUpdateSelfConfigPanel from "@hooks/configPanel/useUpdateSelfConfigPanel";

const SelfNotifServices = () => {
  const { repo: getRepo } = useRepositoryStore();
  const { data: userInfo } = useGetUser();
  const { selectedUser: getSelectedUser, setSelectedUser } = useUserStore();

  const [searchValue, setSearchValue] = useState("");
  const [notifServices, setNotifServices] = useState<string[]>([]);

  const { data: getUserConfigPanel, isLoading } = useGetUserConfigPanel(
    getRepo!.id,
    +userInfo!.ssoId === +getSelectedUser!.userInfo.ssoId
      ? undefined
      : getSelectedUser!.userInfo.ssoId,
  );
  const { mutate: updateUserConfigPanel, isPending } = useUpdateSelfConfigPanel();
  const { handleSubmit } = useForm();

  const handleClose = () => {
    return setSelectedUser(null);
  };

  const handleChange = (serviceName: string) => {
    setNotifServices((prev) => {
      return prev.includes(serviceName)
        ? prev.filter((s) => {
            return s !== serviceName;
          })
        : [...prev, serviceName];
    });
  };

  const onSubmit = () => {
    if (!getRepo || !getSelectedUser) return;

    updateUserConfigPanel({
      repoId: getRepo.id,
      ssoId: getSelectedUser.userInfo.ssoId,
      notificationServices: notifServices,
      callBack: () => {
        return toast.success("تنظیمات دسترسی برای کاربر به‌روز شد.");
      },
    });
  };

  useEffect(() => {
    if (getUserConfigPanel) {
      const services = getUserConfigPanel
        .filter((userConfig) => {
          return userConfig.notificationAccess;
        })
        .map((userConfig) => {
          return userConfig.serviceName;
        });
      setNotifServices(services);
    }
  }, [getUserConfigPanel]);

  const filteredOptions = getUserConfigPanel?.filter((config) => {
    return config.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
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
          <div className="flex h-[calc(100vh-330px)] w-full flex-col gap-2 overflow-y-auto overflow-x-hidden px-2 xs:h-[calc(100vh-420px)]">
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
                      defaultChecked={userConfig.notificationAccess}
                      onChange={() => {
                        return handleChange(userConfig.serviceName);
                      }}
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
      <div className="dialog-footer border-t-none flex gap-2 border-normal xs:gap-3 xs:border-t-[0.5px]" />
      <div className="flex gap-2 justify-end">
        <CancelButton onClick={handleClose} disabled={isPending}>
          انصراف
        </CancelButton>
        <LoadingButton
          className="dialog-footer__submit-button bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
          onClick={handleSubmit(onSubmit)}
          loading={isPending}
          disabled={isPending}
        >
          <Typography
            className="text__label__button text-white"
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            تایید
          </Typography>
        </LoadingButton>
      </div>
    </div>
  );
};

export default SelfNotifServices;
