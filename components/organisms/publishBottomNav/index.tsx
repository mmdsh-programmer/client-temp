"use client";

import React, { useState } from "react";
import PublishChangeVersion from "./publishChangeVersion";
import PublishNextAndPrev from "./publishNextAndPrev";
import { Button } from "@material-tailwind/react";
import { AttachIcon, MoreLineIcon, SpeedDialIcon } from "@components/atoms/icons";
import PublishTinyLink from "./publishTinyLink";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import { usePublishStore } from "@store/publish";
import PublishLikeAndDislike from "./publishLikeAndDislike";

const PublishBottomNav = () => {
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const {
    publishVersion: getPublishVersion,
    publishPageSelectedDocument: getPublishPageSelectedDocument,
    setOpenPublishOutlineDrawer,
    setOpenPublishFilesDrawer,
  } = usePublishStore();
  const { data: getDomainInfo } = useGetDomainInfo();

  const openOutlineDrawer = () => {
    setOpenPublishOutlineDrawer(true);
  };

  return getPublishVersion ? (
    <div className="fixed bottom-12 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#222] p-1.5 shadow-xl">
      <Button
        {...({} as React.ComponentProps<typeof Button>)}
        className="h-8 w-8 rounded-full bg-transparent p-0 hover:bg-gray-700"
        onClick={() => {
          setOpenSpeedDial(!openSpeedDial);
        }}
      >
        <SpeedDialIcon className="h-5 w-5" />
      </Button>

      {openSpeedDial ? <div className="h-5 w-[1px] bg-white bg-opacity-15" /> : null}

      <div
        className={`max-w-56 items-center gap-1.5 overflow-x-auto xs:max-w-fit xs:overflow-x-visible ${openSpeedDial ? "flex" : "hidden"}`}
      >
        {getPublishPageSelectedDocument ? (
          <PublishNextAndPrev selectedDocument={getPublishPageSelectedDocument} />
        ) : null}
        <PublishTinyLink />
        <Button
          {...({} as React.ComponentProps<typeof Button>)}
          className="w-fit min-w-fit border-none p-1.5"
          onClick={openOutlineDrawer}
          variant="outlined"
        >
          <MoreLineIcon className="block h-5 w-5 stroke-white" />
        </Button>
        <Button
          {...({} as React.ComponentProps<typeof Button>)}
          className="w-fit min-w-fit border-none p-1.5"
          onClick={() => {
            return setOpenPublishFilesDrawer(true);
          }}
          variant="outlined"
        >
          <AttachIcon className="block h-5 w-5 fill-white" />
        </Button>
        <div className="h-5 w-[1px] bg-white bg-opacity-15" />

        {getPublishVersion && getDomainInfo?.hasLikes ? (
          <PublishLikeAndDislike
            document={getPublishPageSelectedDocument}
            wrapperClassName="gap-[inherit]"
            likeButtonClassName="hover:bg-transparent"
            dislikeButtonClassName="hover:bg-transparent"
            iconClassName="w-5 h-5"
          />
        ) : null}

        {getPublishPageSelectedDocument && getPublishVersion ? (
          <PublishChangeVersion
            repoId={getPublishVersion.repoId}
            documentId={getPublishPageSelectedDocument.id}
            selectedVersionId={getPublishVersion.id}
          />
        ) : null}
      </div>
    </div>
  ) : null;
};

export default PublishBottomNav;
