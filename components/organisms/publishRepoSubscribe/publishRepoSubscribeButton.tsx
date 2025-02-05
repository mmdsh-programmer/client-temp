"use client";

import React from "react";
import { TUserData } from "@interface/app.interface";
import { IRepo } from "@interface/repo.interface";
import useGetRepoSubscriptionStatus from "@hooks/repository/useGetRepoSubscriptionStatus";
import useSubscribeRepo from "@hooks/repository/useSubscribeRepo";
import { ERepoSubscriptionStatus } from "@interface/enums";
import { toast } from "react-toastify";
import LoadingButton from "@components/molecules/loadingButton";
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
    switch (subscriptionStatus?.status.userFollowRequestStatus) {
      case ERepoSubscriptionStatus.FOLLOW_REQUEST_ACCEPTED:
        return (
          <LoadingButton
            className="flex justify-center items-center leading-5 py-6 !w-fit px-2 sm:!px-10 rounded-lg lg:mt-0 sm:bg-purple-normal text-white font-iranYekan !max-h-[unset] bg-transparent"
            onClick={handleUnsubscribeRepo}
            loading={loading}
            disabled={loading}
          >
            درخواست دریافت اعلانات تایید شده - لغو درخواست
          </LoadingButton>
        );
      case ERepoSubscriptionStatus.FOLLOW_REQUEST_SENT:
        return (
          <LoadingButton
            className="flex justify-center items-center leading-5 py-6 !w-fit px-2 sm:!px-10 rounded-lg lg:mt-0 sm:bg-purple-normal text-white font-iranYekan !max-h-[unset] bg-transparent"
            onClick={handleUnsubscribeRepo}
            loading={loading}
            disabled={loading}
          >
            درخواست دریافت اعلانات ارسال شده - لغو درخواست
          </LoadingButton>
        );
      case ERepoSubscriptionStatus.FOLLOW_REQUEST_REJECTED:
        return (
          <LoadingButton
            className="flex justify-center items-center leading-5 py-6 !w-fit px-2 sm:!px-10 rounded-lg lg:mt-0 sm:bg-purple-normal text-white font-iranYekan !max-h-[unset] bg-transparent"
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
            className="flex justify-center items-center leading-5 py-6 !w-fit px-2 sm:!px-10 rounded-lg lg:mt-0 sm:bg-purple-normal text-white font-iranYekan !max-h-[unset] bg-transparent"
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
