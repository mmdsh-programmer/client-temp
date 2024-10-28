import React, { useMemo } from "react";
import { IDocumentMetadata } from "@interface/document.interface";
import { toEnglishDigit } from "@utils/index";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { DocumentIcon, LockIcon } from "@components/atoms/icons";

interface IProps {
  document: IDocumentMetadata;
  parentUrl: string;
}

const SidebarDocumentItem = ({ document, parentUrl }: IProps) => {
  const segment = useSelectedLayoutSegment();
  const isPrivateDoc =
    document.hasPassword || document.hasWhiteList || document.hasBlackList;

  const isSelected = useMemo(() => {
    if (segment) {
      const decodedSegment = toEnglishDigit(decodeURIComponent(segment));
      return decodedSegment.includes(document.id.toString());
    }
    return false;
  }, [segment, document.id]);

  return (
    <Link
      href={`${parentUrl}/${document.name}/${document.id}`
        .replace(/\s+/g, "-")
        .toLowerCase()}
      key={`document-tree-item-${document.id}`}
      className={`collapse-document transition-all duration-300 flex items-center gap-2 hover:bg-purple-light rounded-[5px] py-[5px] pl-2.5 w-full text-right pr-[22px] ${
        isSelected ? "selected" : ""
      }`}
      title={document.name}
      role="link"
      tabIndex={0}
      prefetch={false}
    >
      <DocumentIcon className="w-5 h-5 stroke-icon-hover flex-none self-start" />
      {isPrivateDoc && <LockIcon className="w-5 h-5 text-gray-400" />}
      <span className="text-sm text-gray-700 font-bold overflow-hidden text-right">
        {document.name}
      </span>
    </Link>
  );
};

export default SidebarDocumentItem;
