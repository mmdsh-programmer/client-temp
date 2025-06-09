"use client";

import { useEffect } from "react";
import { ISeo } from "@interface/social.interface";

type IProps = {
  schema: ISeo["articleSchema"];
  documentId: number;
};

const ArticleSchema = ({ schema, documentId }: IProps) => {
  useEffect(() => {
    if (!schema) return;

    const scriptId = `article-schema-${documentId}`;
    const oldScript = document.getElementById(scriptId);
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      ...schema,
      datePublished: schema.datePublished
        ? new Date(schema.datePublished).toISOString()
        : undefined,
      dateModified: schema.dateModified
        ? new Date(schema.dateModified).toISOString()
        : undefined,
    }).replace(/</g, "\\u003c");

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [schema, documentId]);

  return null;
};

export default ArticleSchema;