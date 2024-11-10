"use client";

import { useEffect } from "react";
import { publishPageSelectedDocumentAtom, publishVersionAtom } from "@atom/publish";
import { useSetRecoilState } from "recoil";
import { IVersion } from "@interface/version.interface";
import { IDocumentMetadata } from "@interface/document.interface";

interface IProps {
  version: IVersion;
  document: IDocumentMetadata;
}

const PublishVersion = ({ version, document }: IProps) => {
  const setPublishVersion = useSetRecoilState(publishVersionAtom);
  const setSelectedPublishDocument = useSetRecoilState(
    publishPageSelectedDocumentAtom
  );

  useEffect(() => {
    setPublishVersion(version);
    setSelectedPublishDocument(document);
    return () => {
      setPublishVersion(null);
      setSelectedPublishDocument(null);
    };
  }, []);

  return null;
};

export default PublishVersion;
