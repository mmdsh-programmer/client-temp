"use client";

import { ERepoSubscriptionStatus } from "@interface/enums";
import { IRepo } from "@interface/repo.interface";
import LoadingButton from "@components/molecules/loadingButton";
import React from "react";
import { TUserData } from "@interface/app.interface";
import { toast } from "react-toastify";
import useGetRepoSubscriptionStatus from "@hooks/repository/useGetRepoSubscriptionStatus";
import useSubscribeRepo from "@hooks/repository/useSubscribeRepo";
import useUnsubscribeRepo from "@hooks/repository/useUnsubscribeRepo";

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
    subscriptionStatusLoading ||
    subscribeRepoHook.isPending ||
    unsubscribeRepoHook.isPending;

  const handleSubscribeRepo = () => {
    if (loading) return;
    subscribeRepoHook.mutate({
      repoId: repository.id,
      ssoId: userInfo?.ssoId,
      callBack: () => {
        toast.success(
          "درخواست دریافت اعلانات مخزن با موفقیت برای مالک کخزن ارسال شد"
        );
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
          <LoadingButton
            className="flex justify-center items-center leading-5 py-6 !w-fit px-2 sm:!px-10 rounded-lg lg:mt-0 sm:bg-secondary text-white font-iranYekan !max-h-[unset] bg-transparent"
            onClick={handleUnsubscribeRepo}
            loading={loading}
            disabled={loading}
          >
            درخواست دریافت اعلانات تایید شده - لغو درخواست
          </LoadingButton>
        );
      case ERepoSubscriptionStatus.PENDING:
        return (
          <LoadingButton
            className="flex justify-center items-center leading-5 py-6 !w-fit px-2 sm:!px-10 rounded-lg lg:mt-0 sm:bg-secondary text-white font-iranYekan !max-h-[unset] bg-transparent"
            onClick={handleUnsubscribeRepo}
            loading={loading}
            disabled={loading}
          >
            درخواست دریافت اعلانات ارسال شده - لغو درخواست
          </LoadingButton>
        );
      case ERepoSubscriptionStatus.REJECTED:
        return (
          <LoadingButton
            className="flex justify-center items-center leading-5 py-6 !w-fit px-2 sm:!px-10 rounded-lg lg:mt-0 sm:bg-secondary text-white font-iranYekan !max-h-[unset] bg-transparent"
            onClick={handleSubscribeRepo}
            loading={loading}
            disabled={loading}
          >
            درخواست دریافت اعلانات رد شده <br /> (درخواست مجدد)
          </LoadingButton>
        );
      default:
        return (
          <LoadingButton
            className="flex justify-center items-center leading-5 py-6 !w-fit px-2 sm:!px-10 rounded-lg lg:mt-0 sm:bg-secondary text-white font-iranYekan !max-h-[unset] bg-transparent"
            onClick={handleSubscribeRepo}
            loading={loading}
            disabled={loading}
          >
            درخواست دریافت اعلانات
          </LoadingButton>
        );
    }
  };

  return <div className="w-full flex justify-center">{renderButton()}</div>;
};

export default PublishRepoSubscribeButton;
