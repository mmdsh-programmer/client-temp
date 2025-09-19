"use client";

import React from "react";
import { ERepoSubscriptionStatus } from "@interface/enums";
import { IRepo } from "@interface/repo.interface";
import LoadingButton from "@components/molecules/loadingButton";
import { TUserData } from "@interface/app.interface";
import { toast } from "react-toastify";
import useGetRepoSubscriptionStatus from "@hooks/repository/useGetRepoSubscriptionStatus";
import useSubscribeRepo from "@hooks/repository/useSubscribeRepo";
import useUnsubscribeRepo from "@hooks/repository/useUnsubscribeRepo";
import { Typography } from "@material-tailwind/react";
import { Spinner } from "@components/atoms/spinner";

const PublishRepoSubscribeButton = ({
  repository,
  userInfo,
}: {
  repository: IRepo;
  userInfo: TUserData;
}) => {
  const { data: subscriptionStatus, isLoading: subscriptionStatusLoading } =
    useGetRepoSubscriptionStatus(repository.id, userInfo.ssoId);

  const subscribeRepoHook = useSubscribeRepo();
  const unsubscribeRepoHook = useUnsubscribeRepo();

  const loading =
    subscriptionStatusLoading || subscribeRepoHook.isPending || unsubscribeRepoHook.isPending;

  const handleSubscribeRepo = () => {
    if (loading) return;
    subscribeRepoHook.mutate({
      repoId: repository.id,
      ssoId: userInfo?.ssoId,
      callBack: () => {
        toast.success("درخواست دریافت اعلانات مخزن با موفقیت برای مدیر دامنه ارسال شد");
      },
    });
  };

  const handleUnsubscribeRepo = () => {
    if (loading) return;
    unsubscribeRepoHook.mutate({
      repoId: repository.id,
      ssoId: userInfo?.ssoId,
      callBack: () => {
        toast.success("درخواست دریافت اعلانات مخزن با موفقیت حذف شد");
      },
    });
  };

  const renderButton = () => {
    switch (subscriptionStatus?.status) {
      case ERepoSubscriptionStatus.ACCEPTED:
        return (
          <div className="flex flex-col items-center gap-2">
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="caption_c1">
              درخواست دریافت اعلانات توسط مدیر دامنه تایید شده
            </Typography>
            <LoadingButton
              className="flex !h-8 !max-h-[unset] !w-fit items-center justify-center rounded-lg bg-error !px-10 py-5 font-iranYekan leading-5 text-white"
              onClick={handleUnsubscribeRepo}
              loading={loading}
              disabled={loading}
              isPrimary
            >
              <Typography {...({} as React.ComponentProps<typeof Typography>)} className="body_b3">لغو دریافت اعلان</Typography>
            </LoadingButton>
          </div>
        );
      case ERepoSubscriptionStatus.PENDING:
        return (
          <div className="flex flex-col items-center gap-3">
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="caption_c1 text-center">
              درخواست دریافت اعلانات برای مدیر دامنه ارسال شده
            </Typography>
            <LoadingButton
              className="flex !h-8 !max-h-[unset] !w-fit items-center justify-center rounded-lg bg-error !px-10 py-5 font-iranYekan leading-5 text-white"
              onClick={handleUnsubscribeRepo}
              loading={loading}
              disabled={loading}
            >
              لغو درخواست
            </LoadingButton>
          </div>
        );
      case ERepoSubscriptionStatus.REJECTED:
        return (
          <div className="flex flex-col items-center gap-2">
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="body_b3 text-warning">
              درخواست دریافت اعلانات توسط مدیر دامنه رد شده
            </Typography>
            <LoadingButton
              className="flex !max-h-[unset] !w-fit items-center justify-center rounded-lg bg-primary-normal px-2 py-6 font-iranYekan leading-5 text-white sm:!px-10 lg:mt-0"
              onClick={handleSubscribeRepo}
              loading={loading}
              disabled={loading}
            >
              درخواست مجدد
            </LoadingButton>
          </div>
        );
      default:
        return (
          <LoadingButton
            className="flex !max-h-[unset] !w-fit items-center justify-center rounded-lg bg-primary-normal px-2 py-6 font-iranYekan leading-5 text-white sm:!px-10 lg:mt-0"
            onClick={handleSubscribeRepo}
            loading={loading}
            disabled={loading}
          >
            درخواست دریافت اعلانات
          </LoadingButton>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex w-full justify-center">
        <Spinner {...({} as React.ComponentProps<typeof Spinner>)} className="h-5 w-5 text-primary" />
      </div>
    );
  }

  return <div className="flex w-full justify-center">{renderButton()}</div>;
};

export default PublishRepoSubscribeButton;
