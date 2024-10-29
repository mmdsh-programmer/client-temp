"use client";

import React from "react";
import { publishPageDocumentIdAtom, publishVersionAtom } from "@atom/publish";
import { useRecoilValue } from "recoil";
import PublishChangeVersion from "./publishChangeVersion";
import PublishOutlineDrawer from "./publishOutlineDrawer";
import PublishReaction from "./publishReaction";

const PublishBottomNav = () => {
  const getPublishVersion = useRecoilValue(publishVersionAtom);
  const getPublishDocumentId = useRecoilValue(publishPageDocumentIdAtom);

  return getPublishVersion && getPublishDocumentId ? (
    <nav className="h-[75px] flex items-center justify-end">
      <div className="w-full flex justify-end px-0 xs:px-8 gap-3">
        <PublishReaction />

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
