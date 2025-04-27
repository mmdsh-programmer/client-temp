import React, { useEffect, useState } from "react";
import { Spinner, Switch, Typography } from "@material-tailwind/react";
import { useRecoilState, useRecoilValue } from "recoil";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useGetUserConfigPanel from "@hooks/configPanel/useGetUserConfigPanel";
import useUpdateUserConfigPanel from "@hooks/configPanel/useUpdateUserConfigPanel";
import { selectedUserAtom } from "@atom/user";
import { ERoles } from "@interface/enums";
import UserItem from "@components/organisms/users/userItem";

const UserConfigPanelDialog = () => {
  const getRepo = useRecoilValue(repoAtom);
  const [getSelectedUser, setSelectedUser] = useRecoilState(selectedUserAtom);

  const [blockServices, setBlockServices] = useState<string[]>([]);

  const { data: getUserConfigPanel, isLoading } = useGetUserConfigPanel(
    getRepo!.id,
    getSelectedUser!.userInfo.ssoId,
  );
  const updateUserConfigPanel = useUpdateUserConfigPanel();

  const { handleSubmit } = useForm();

  const handleClose = () => {
    setSelectedUser(null);
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
    if (!getRepo || !getSelectedUser) {
      return;
    }
    updateUserConfigPanel.mutate({
      repoId: getRepo.id,
      ssoId: getSelectedUser.userInfo.ssoId,
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
      backToMain
    >
      {isLoading ? (
        <div className="flex w-full justify-center">
          <Spinner className="" color="purple" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {getSelectedUser ? <UserItem user={getSelectedUser} /> : null}
          <div className="border-b-[1px] border-b-normal" />
          <div className="flex h-[calc(100vh-210px)] w-full flex-col gap-2 overflow-y-auto overflow-x-hidden px-2 xs:h-[calc(100vh-300px)]">
            {getUserConfigPanel?.map((userConfig) => {
              return (
                <div
                  key={`notif-access-${userConfig.serviceName}`}
                  className="hover:border-primary mb-1 flex w-full justify-between rounded-md border p-2"
                >
                  <Typography className="title_t2 !text-primary_normal">
                    {userConfig.title}
                  </Typography>
                  <Switch
                    color="green"
                    defaultChecked={!userConfig.blocked}
                    crossOrigin
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
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </ConfirmFullHeightDialog>
  );
};

export default UserConfigPanelDialog;
