"use client";

import React, { useState, useEffect } from "react";
import { IDocumentMetadata } from "@interface/document.interface";
import { IVersion } from "@interface/version.interface";
import PublishVersionContent from "./index";
import PublishDocumentKey from "./publishDocumentKey";

interface IProps {
  documentInfo: IDocumentMetadata;
  version: IVersion;
  children: React.JSX.Element;
}

const PublishEncryptedWrapper = ({ documentInfo, version, children }: IProps) => {
  const [decryptedContent, setDecryptedContent] = useState<string | null>(null);
  const [needsDecryption, setNeedsDecryption] = useState(false);

  useEffect(() => {
    const { content } = version;
    if (documentInfo.publicKeyId && content) {
      if (content.trim().startsWith("{") && content.includes("\"iv\"")) {
        setNeedsDecryption(true);
      } else {
        setDecryptedContent(content);
        setNeedsDecryption(false);
      }
    } else {
      setNeedsDecryption(false);
    }
  }, [documentInfo, version]);

  if (needsDecryption && decryptedContent === null) {
    return (
      <PublishDocumentKey
        encryptedContent={version.content || ""}
        onDecrypted={(content) => {
          setDecryptedContent(content);
          setNeedsDecryption(false);
        }}
      />
    );
  }

  if (decryptedContent && !needsDecryption && documentInfo.publicKeyId) {
    const decryptedVersion = { ...version, content: decryptedContent };

    return <PublishVersionContent document={documentInfo} version={decryptedVersion} />;
  }

  return children;
};

export default PublishEncryptedWrapper;
