"use client";

import React from "react";
import { TUserData } from "@interface/app.interface";
import { IRepo } from "@interface/repo.interface";
import useGetRepoSubscriptionStatus from "@hooks/repository/useGetRepoSubscriptionStatus";
import useSubscribeRepo from "@hooks/repository/useSubscribeRepo";
import { ERepoSubscriptionStatus } from "@interface/enums";
import { toast } from "react-toastify";
import LoadingButton from "@components/molecules/loadingButton";

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

  const loading = subscriptionStatusLoading || subscribeRepoHook.isPending;
  const disabled =
    loading ||
    subscriptionStatus?.status.userFollowRequestStatus ===
      ERepoSubscriptionStatus.FOLLOW_REQUEST_SENT ||
    subscriptionStatus?.status.userFollowRequestStatus ===
      ERepoSubscriptionStatus.FOLLOW_REQUEST_ACCEPTED;

  const renderStatus = () => {
    switch (subscriptionStatus?.status.userFollowRequestStatus) {
      case ERepoSubscriptionStatus.FOLLOW_REQUEST_ACCEPTED:
        return "درخواست دریافت اعلانات تایید شده";
      case ERepoSubscriptionStatus.FOLLOW_REQUEST_SENT:
        return "درخواست دریافت اعلانات ارسال شده";
      case ERepoSubscriptionStatus.FOLLOW_REQUEST_REJECTED:
        return (
          <>
            درخواست دریافت اعلانات رد شده <br /> (درخواست مجدد)
          </>
        );
      default:
        return "درخواست دریافت اعلانات";
    }
  };

  const handleSubscribeRepo = () => {
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

  return (
    <div className="w-full flex justify-center">
      <LoadingButton
        className="flex justify-center items-center leading-5 py-6 !w-fit px-2 sm:!px-10 rounded-lg lg:mt-0 sm:bg-purple-normal text-white font-iranYekan !max-h-[unset] bg-transparent"
        onClick={handleSubscribeRepo}
        loading={loading}
        disabled={disabled}
      >
        {renderStatus()}
      </LoadingButton>
    </div>
  );
};

export default PublishRepoSubscribeButton;
