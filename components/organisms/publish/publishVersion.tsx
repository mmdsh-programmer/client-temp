"use client";

import { useEffect } from "react";
import { IVersion } from "@interface/version.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { usePublishStore } from "@store/publish";

interface IProps {
  version: IVersion;
  document: IDocumentMetadata;
}

const PublishVersion = ({ version, document }: IProps) => {
  const setPublishVersion = usePublishStore((state) => {
    return state.setPublishVersion;
  });
  const setSelectedPublishDocument = usePublishStore((state) => {
    return state.setPublishPageSelectedDocument;
  });

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
