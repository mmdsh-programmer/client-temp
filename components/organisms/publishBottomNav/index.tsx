"use client";

import React from "react";
import { publishPageDocumentIdAtom, publishVersionAtom } from "@atom/publish";
import { useRecoilValue } from "recoil";
import PublishChangeVersion from "./publishChangeVersion";
import PublishOutlineDrawer from "./publishOutlineDrawer";
import LikeAndDislike from "../like&dislike";
import PublishCommentsDrawer from "./publishCommentsDrawer";

const PublishBottomNav = () => {
  const getPublishVersion = useRecoilValue(publishVersionAtom);
  const getPublishDocumentId = useRecoilValue(publishPageDocumentIdAtom);

  return getPublishVersion && getPublishDocumentId ? (
    <nav className="h-[75px] flex items-center justify-end">
      <div className="w-full flex items-center justify-end px-0 xs:px-8 gap-3">

        <LikeAndDislike
          wrapperClassName="gap-[inherit]"
          likeButtonClassName="border border-gray-400 p-2.5 hover:bg-transparent"
          dislikeButtonClassName="border border-gray-400 p-2.5 hover:bg-transparent"
          iconClassName="!stroke-gray-700"
          version={getPublishVersion}
        />

        <PublishCommentsDrawer version={getPublishVersion} />
        
        <PublishOutlineDrawer outline={getPublishVersion.outline || "[]"} />

        <PublishChangeVersion
          repoId={getPublishVersion.repoId}
          documentId={getPublishDocumentId}
          selectedVersionId={getPublishVersion.id}
        />
      </div>
    </nav>
  ) : null;
};

export default PublishBottomNav;
