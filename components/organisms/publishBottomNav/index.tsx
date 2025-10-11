"use client";

import React, { useState } from "react";
import PublishChangeVersion from "./publishChangeVersion";
import LikeAndDislike from "../like&dislike";
import PublishNextAndPrev from "./publishNextAndPrev";
import useGetOptionalUser from "@hooks/auth/useGetOptionalUser";
import { Button } from "@material-tailwind/react";
import { ImageIcon, MoreLineIcon, SpeedDialIcon } from "@components/atoms/icons";
import PublishTinyLink from "./publishTinyLink";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import { usePublishStore } from "@store/publish";

const PublishBottomNav = () => {
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const {
    publishVersion: getPublishVersion,
    publishPageSelectedDocument: getPublishPageSelectedDocument,
    setOpenPublishOutlineDrawer,
    setOpenPublishFilesDrawer,
  } = usePublishStore();
  const { data: userData } = useGetOptionalUser();
  const { data: getDomainInfo } = useGetDomainInfo();

  const openOutlineDrawer = () => {
    setOpenPublishOutlineDrawer(true);
  };

  return getPublishVersion ? (
    <div className="fixed bottom-12 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#222] p-2 shadow-xl">
      <Button
        {...({} as React.ComponentProps<typeof Button>)}
        className="h-8 w-8 rounded-full bg-transparent p-0 hover:bg-gray-700"
        onClick={() => {
          setOpenSpeedDial(!openSpeedDial);
        }}
      >
        <SpeedDialIcon className="h-6 w-6" />
      </Button>

      {openSpeedDial ? <div className="h-5 w-[1px] bg-white bg-opacity-15" /> : null}

      <div
        className={`max-w-56 items-center gap-2 overflow-x-auto xs:max-w-fit xs:overflow-x-visible ${openSpeedDial ? "flex" : "hidden"}`}
      >
        {getPublishPageSelectedDocument ? (
          <PublishNextAndPrev selectedDocument={getPublishPageSelectedDocument} />
        ) : null}
        <PublishTinyLink />
        <Button
          {...({} as React.ComponentProps<typeof Button>)}
          className="w-fit min-w-fit border-none p-3"
          onClick={openOutlineDrawer}
          variant="outlined"
        >
          <MoreLineIcon className="block h-6 w-6 stroke-white" />
        </Button>
        <Button
          {...({} as React.ComponentProps<typeof Button>)}
          className="w-fit min-w-fit border-none p-3"
          onClick={() => {
            return setOpenPublishFilesDrawer(true);
          }}
          variant="outlined"
        >
          <ImageIcon className="block h-6 w-6 fill-white" />
        </Button>
        <div className="h-5 w-[1px] bg-white bg-opacity-15" />

        {getPublishVersion && userData && getDomainInfo?.hasLikes ? (
          <LikeAndDislike
            wrapperClassName="gap-[inherit]"
            likeButtonClassName="hover:bg-transparent"
            dislikeButtonClassName="hover:bg-transparent"
            iconClassName="w-6 h-6"
            postId={getPublishVersion.postId}
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
