import React from "react";
import Link from "next/link";
import { IDocumentMetadata } from "@interface/document.interface";
import { usePathname } from "next/navigation";
import { DocumentIcon, LockIcon } from "@components/atoms/icons";

interface IProps {
  document: IDocumentMetadata;
  parentUrl: string;
}

const SidebarDocumentItem = ({ document, parentUrl }: IProps) => {
  const pathname = usePathname();
  const isPrivateDoc =
    document.hasPassword || document.hasWhiteList || document.hasBlackList;

  const pathSegments = pathname?.split("/") || [];
  const isSelected = pathSegments.includes(String(document.id));

  return (
    <Link
      href={`${parentUrl}/${document.name}/${document.id}`
        .replace(/\s+/g, "-")
        .toLowerCase()}
      key={`document-tree-item-${document.id}`}
      className={`collapse-document py-2 transition-all duration-300 flex gap-2 hover:bg-purple-light rounded-[5px] pl-2.5 w-full text-right pr-[22px] ${
        isSelected ? "bg-purple-light pointer-events-none selected" : ""
      }`}
      title={document.name}
      tabIndex={0}
    >
      <DocumentIcon className="w-5 h-5 stroke-icon-hover flex-none self-start" />
      {isPrivateDoc && <LockIcon className="flex-none w-5 h-5 fill-icon-hover" />}
      <span className="text-sm text-gray-700 font-bold overflow-hidden text-right">
        {document.name}
      </span>
    </Link>
  );
};

export default SidebarDocumentItem;
