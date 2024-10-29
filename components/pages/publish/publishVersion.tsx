"use client";

import { useEffect } from "react";
import { publishPageDocumentIdAtom, publishVersionAtom } from "@atom/publish";
import { useSetRecoilState } from "recoil";
import { IVersion } from "@interface/version.interface";

interface IProps {
  version: IVersion;
  documentId: number;
}

const PublishVersion = ({ version, documentId }: IProps) => {
  const setPublishVersion = useSetRecoilState(publishVersionAtom);
  const setPublishDocumentId = useSetRecoilState(publishPageDocumentIdAtom);

  useEffect(() => {
    setPublishVersion(version);
    setPublishDocumentId(documentId);

    return () => {
      setPublishVersion(null);
      setPublishDocumentId(null);
    };
  }, []);

  return null;
};

export default PublishVersion;
