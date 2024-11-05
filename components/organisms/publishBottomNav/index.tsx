"use client";

import React from "react";
import {
  publishPageSelectedDocumentAtom,
  publishVersionAtom,
} from "@atom/publish";
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
    publishPageSelectedDocumentAtom
  );

  const { data: userData } = useGetOptionalUser();

  return (
    <nav className="h-[75px] overflow-x-auto">
      <div className="min-w-fit flex items-center justify-end px-5 xs:px-8 gap-3 overflow-x-auto h-full">
        {getPublishVersion && userData ? (
          <LikeAndDislike
            wrapperClassName="gap-[inherit]"
            likeButtonClassName="border border-gray-400 p-2.5 hover:bg-transparent"
            dislikeButtonClassName="border border-gray-400 p-2.5 hover:bg-transparent"
            iconClassName="!stroke-gray-700"
            version={getPublishVersion}
          />
        ) : null}

        {getPublishPageSelectedDocument ? (
          <PublishNextAndPrev
            selectedDocument={getPublishPageSelectedDocument}
          />
        ) : null}

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
