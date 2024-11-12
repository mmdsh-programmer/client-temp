"use client";

import React, { useState } from "react";
import {
  openPublishOutlineDrawer,
  publishPageSelectedDocumentAtom,
  publishVersionAtom,
} from "@atom/publish";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PublishChangeVersion from "./publishChangeVersion";
import LikeAndDislike from "../like&dislike";
import PublishNextAndPrev from "./publishNextAndPrev";
import useGetOptionalUser from "@hooks/auth/useGetOptionalUser";
import { Button } from "@material-tailwind/react";
import { MoreLineIcon, SpeedDialIcon } from "@components/atoms/icons";

const PublishBottomNav = () => {
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const getPublishVersion = useRecoilValue(publishVersionAtom);
  const getPublishPageSelectedDocument = useRecoilValue(
    publishPageSelectedDocumentAtom
  );
  const setOpenPublishOutlineDrawer = useSetRecoilState(
    openPublishOutlineDrawer
  );

  const { data: userData } = useGetOptionalUser();

  const openOutlineDrawer = () => {
    setOpenPublishOutlineDrawer(true);
  };

  return getPublishVersion ? (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 p-2 flex items-center gap-2 rounded-full shadow-xl bg-[#222] z-50">
      <Button
        className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700"
        onClick={() => {
          setOpenSpeedDial(!openSpeedDial);
        }}
      >
        <SpeedDialIcon className="h-6 w-6" />
      </Button>

      {openSpeedDial ? (
        <div className="w-[1px] h-5 bg-white bg-opacity-15" />
      ) : null}

      <div
        className={`max-w-56 xs:max-w-fit overflow-x-auto xs:overflow-x-visible items-center gap-2 ${openSpeedDial ? "flex" : "hidden"}`}
      >
        {getPublishPageSelectedDocument ? (
          <PublishNextAndPrev
              selectedDocument={getPublishPageSelectedDocument}
            />
        ) : null}

        <Button
          className="w-fit min-w-fit p-3 border-none"
          onClick={openOutlineDrawer}
          variant="outlined"
        >
          <MoreLineIcon className="stroke-white w-6 h-6 block" />
        </Button>
        <div className="w-[1px] h-5 bg-white bg-opacity-15" />

        {getPublishVersion && userData ? (
          <LikeAndDislike
            wrapperClassName="gap-[inherit]"
            likeButtonClassName="hover:bg-transparent"
            dislikeButtonClassName="hover:bg-transparent"
            iconClassName="w-6 h-6"
            version={getPublishVersion}
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
