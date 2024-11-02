"use client";

import React from "react";
import { publishPageSelectedDocument, publishVersionAtom } from "@atom/publish";
import { useRecoilValue } from "recoil";
import PublishChangeVersion from "./publishChangeVersion";
import PublishOutlineDrawer from "./publishOutlineDrawer";
import LikeAndDislike from "../like&dislike";
import PublishCommentsDrawer from "./publishCommentsDrawer";
import PublishNextAndPrev from "./publishNextAndPrev";
import useGetOptionalUser from "@hooks/auth/useGetOptionalUser";

const PublishBottomNav = () => {
  const getPublishVersion = useRecoilValue(publishVersionAtom);
  const getPublishPageSelectedDocument = useRecoilValue(
    publishPageSelectedDocument
  );

  const { data: userData } = useGetOptionalUser();

  return (
    <nav className="h-[75px] flex items-center justify-end">
      <div className="w-full flex items-center justify-end px-0 xs:px-8 gap-3">
        {getPublishVersion && userData ? (
          <LikeAndDislike
            wrapperClassName="gap-[inherit]"
            likeButtonClassName="border border-gray-400 p-2.5 hover:bg-transparent"
            dislikeButtonClassName="border border-gray-400 p-2.5 hover:bg-transparent"
            iconClassName="!stroke-gray-700"
            version={getPublishVersion}
          />
        ) : null}

        {getPublishPageSelectedDocument ? <PublishNextAndPrev /> : null}

        {getPublishVersion ? (
          <>
            {userData ? (
              <PublishCommentsDrawer version={getPublishVersion} />
            ) : null}
            <PublishOutlineDrawer outline={getPublishVersion.outline || "[]"} />
          </>
        ) : null}

        {getPublishPageSelectedDocument && getPublishVersion ? (
          <PublishChangeVersion
            repoId={getPublishVersion.repoId}
            documentId={getPublishPageSelectedDocument.id}
            selectedVersionId={getPublishVersion.id}
          />
        ) : null}
      </div>
    </nav>
  );
};

export default PublishBottomNav;
