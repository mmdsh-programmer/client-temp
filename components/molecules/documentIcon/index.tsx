import React from "react";
import {
  DocIcon,
  DocumentClassicIcon,
  DocumentExcelIcon,
  DocumentFileIcon,
  DocumentFlowchartIcon,
  DocumentWordIcon,
  TemplateClassicIcon,
  TemplateExcelIcon,
  TemplateFileIcon,
  TemplateFlowchartIcon,
  TemplateWordIcon,
} from "@components/atoms/icons";
import { EDocumentTypes } from "@interface/enums";
import { IDocumentMetadata } from "@interface/document.interface";

interface IProps {
  document: IDocumentMetadata;
}

const DocumentIcon = ({ document }: IProps) => {
  switch (document.contentType) {
    case EDocumentTypes.classic:
      return document.isTemplate ? (
        <TemplateClassicIcon className="fill-icon-hover w-5 h-5" />
      ) : (
        <DocumentClassicIcon className="fill-icon-hover w-5 h-5" />
      );
    case EDocumentTypes.word:
      return document.isTemplate ? (
        <TemplateWordIcon className="fill-icon-hover w-5 h-5" />
      ) : (
        <DocumentWordIcon className="fill-icon-hover w-5 h-5" />
      );
    case EDocumentTypes.excel:
      return document.isTemplate ? (
        <TemplateExcelIcon className="fill-icon-hover w-5 h-5" />
      ) : (
        <DocumentExcelIcon className="fill-icon-hover w-5 h-5" />
      );
    case EDocumentTypes.flowchart:
      return document.isTemplate ? (
        <TemplateFlowchartIcon className="fill-icon-hover w-5 h-5" />
      ) : (
        <DocumentFlowchartIcon className="fill-icon-hover w-5 h-5" />
      );
    case EDocumentTypes.file:
      return document.isTemplate ? (
        <TemplateFileIcon className="fill-icon-hover w-5 h-5" />
      ) : (
        <DocumentFileIcon className="fill-icon-hover w-5 h-5" />
      );
    default:
      return <DocIcon className="fill-icon-hover w-5 h-5" />;
  }
};

export default DocumentIcon;
