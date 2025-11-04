import React, { useEffect, useState } from "react";
import { Switch, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useGetUserConfigPanel from "@hooks/configPanel/useGetUserConfigPanel";
import useGetUser from "@hooks/auth/useGetUser";
import { useRepositoryStore } from "@store/repository";
import InputAtom from "@components/atoms/input";
import { Spinner } from "@components/atoms/spinner";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import useUpdateMyNotifServices from "@hooks/configPanel/useUpdateMyNotifServices";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const MyNotificationSettingDialog = ({ setOpen }: IProps) => {
  const { repo: getRepo } = useRepositoryStore();
  const { data: userInfo } = useGetUser();

  const [searchValue, setSearchValue] = useState("");
  const [notifServices, setNotifServices] = useState<string[]>([]);

  const { data: getUserConfigPanel, isLoading } = useGetUserConfigPanel(getRepo!.id, undefined);
  const { mutate: updateUserConfigPanel, isPending } = useUpdateMyNotifServices();
  const { handleSubmit } = useForm();

  const handleClose = () => {
    setOpen(false);
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
    if (!getRepo || !userInfo) return;

    updateUserConfigPanel({
      repoId: getRepo.id,
      ssoId: userInfo.ssoId,
      notificationServices: notifServices,
      callBack: () => {
        return toast.success("تنظیمات اعلانات به‌روز شد.");
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
    <ConfirmFullHeightDialog
      isPending={isPending}
      dialogHeader=" اعلانات من"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="user-limitation-dialog xs:!min-w-[450px] xs:!max-w-[450px]"
      bodyClassName="!pt-1"
      backToMain
    >
      {isLoading ? (
        <div className="flex w-full justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
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
    </ConfirmFullHeightDialog>
  );
};

export default MyNotificationSettingDialog;
