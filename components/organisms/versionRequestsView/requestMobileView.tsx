import React from "react";
import MobileCard from "@components/molecules/mobileCard";
import { IVersion } from "@interface/version.interface";
import { FaDateFromTimestamp } from "@utils/index";
import VersionRequestMenu from "@components/molecules/versionRequestMenu";
import DraftRequestMenu from "@components/molecules/draftRequestMenu";
import { EVersionStatus } from "@interface/enums";

interface IProps {
  request: IVersion;
  onClick?: () => void;
}

const RequestMobileView = ({ request, onClick }: IProps) => {
  return (
    <MobileCard
      key={request.id}
      className="repo-request__mobile-view !shadow-sm border-[1px] border-normal"
      name={request.versionNumber}
      description={[
        {
          title: "نام سند",
          value: request.documentTitle,
        },
        {
          title: "تاریخ ایجاد",
          value: FaDateFromTimestamp(+request.createDate) || "--",
        },
        {
          title: "تاریخ ویرایش",
          value: FaDateFromTimestamp(+request.updateDate) || "--",
        },
        { title: "سازنده", value: request.creator?.name || "--" },
      ]}
      cardAction={
        request?.status === EVersionStatus.private ? (
          <VersionRequestMenu request={request} />
        ) : (
          <DraftRequestMenu request={request} />
        )
      }
      onClick={onClick}
    />
  );
};

export default RequestMobileView;
