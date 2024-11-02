import React, { useEffect } from "react";
import Link from "next/link";
import { IDocumentMetadata } from "@interface/document.interface";
import { usePathname } from "next/navigation";
import { DocumentIcon, LockIcon } from "@components/atoms/icons";
import { useSetRecoilState } from "recoil";
import { publishPageSelectedDocument } from "@atom/publish";

interface IProps {
  document: IDocumentMetadata;
  parentUrl: string;
}

const SidebarDocumentItem = ({ document, parentUrl }: IProps) => {
  const pathname = usePathname();
  const setSelectedPublishDocument = useSetRecoilState(
    publishPageSelectedDocument
  );
  const isPrivateDoc =
    document.hasPassword || document.hasWhiteList || document.hasBlackList;

  const pathSegments = pathname?.split("/") || [];
  const isSelected = pathSegments.includes(String(document.id));

  useEffect(() => {
    if (isSelected) {
      setSelectedPublishDocument(document);
    }
  }, [isSelected, document]);

  return (
    <Link
      href={`${parentUrl}/${document.name}/${document.id}`
        .replace(/\s+/g, "-")
        .toLowerCase()}
      key={`document-tree-item-${document.id}`}
      className={`collapse-document transition-all duration-300 flex items-center gap-2 hover:bg-purple-light rounded-[5px] py-[5px] pl-2.5 w-full text-right pr-[22px] ${
        isSelected ? "bg-purple-light pointer-events-none selected" : ""
      }`}
      title={document.name}
      tabIndex={0}
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
