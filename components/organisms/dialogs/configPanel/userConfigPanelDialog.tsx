import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userIdAtom } from "@atom/app";
import useUpdateUserConfigPanel from "@hooks/configPanel/useUpdateUserConfigPanel";
import { useForm } from "react-hook-form";
import useGetUserConfigPanel from "@hooks/configPanel/useGetUserConfigPanel";
import { repoAtom } from "@atom/repository";
import { Spinner, Switch, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";

const UserConfigPanelDialog = () => {
  const getRepo = useRecoilValue(repoAtom);
  const [getUserId, setUserId] = useRecoilState(userIdAtom);

  const [blockServices, setBlockServices] = useState<string[]>([]);

  const { data: getUserConfigPanel, isLoading } = useGetUserConfigPanel(getRepo!.id, getUserId!);
  const updateUserConfigPanel = useUpdateUserConfigPanel();

  const { handleSubmit } = useForm();

  const handleClose = () => {
    setUserId(null);
  };

  const handleChange = (serviceName: string) => {
    if (blockServices.includes(serviceName) && getUserConfigPanel) {
      const filteredServices = blockServices.filter((service) => {
        return service !== serviceName;
      });
      setBlockServices(filteredServices);
    } else {
      setBlockServices([...blockServices, serviceName]);
    }
    if (blockServices.includes(serviceName) && getUserConfigPanel) {
      const filteredServices = blockServices.filter((service) => {
        return service !== serviceName;
      });
      setBlockServices(filteredServices);
    } else {
      setBlockServices([...blockServices, serviceName]);
    }
  };

  const onSubmit = () => {
    if (!getRepo || !getUserId) {
      return;
    }
    updateUserConfigPanel.mutate({
      repoId: getRepo.id,
      ssoId: getUserId,
      blockedServices: blockServices,
      callBack: () => {
        toast.success("تنطیمات دسترسی برای کاربر به روز شد.");
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

  return (
    <ConfirmFullHeightDialog
      isPending={updateUserConfigPanel.isPending}
      dialogHeader="محدودسازی دسترسی های کاربر"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="user-limitation-dialog xs:!min-w-[450px] xs:!max-w-[450px]"
    >
      {isLoading ? (
        <div className="flex w-full justify-center">
          <Spinner className="" color="deep-purple" />
        </div>
      ) : (
        <div className="flex h-[calc(100vh-210px)] w-full flex-col gap-2 overflow-y-auto overflow-x-hidden px-2 xs:h-[calc(100vh-300px)]">
          {getUserConfigPanel?.map((userConfig) => {
            return (
              <div
                key={`notif-access-${userConfig.serviceName}`}
                className="hover:border-primary mb-1 flex w-full justify-between rounded-md border p-2"
              >
                <Typography className="form_label">{userConfig.title} </Typography>
                <Switch
                  color="green"
                  defaultChecked={!userConfig.blocked}
                  crossOrigin
                  onChange={() => {
                    return handleChange(userConfig.serviceName);
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </ConfirmFullHeightDialog>
  );
};

export default UserConfigPanelDialog;
