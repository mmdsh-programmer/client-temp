"use client";

import { DocumentIcon, LockIcon } from "@components/atoms/icons";

import { IDocumentMetadata } from "@interface/document.interface";
import Link from "next/link";
import React from "react";
import { toPersianDigit } from "@utils/index";
import { usePathname } from "next/navigation";

interface IProps {
  document: IDocumentMetadata;
  parentUrl: string;
  categoryIds: number[];
}

const SidebarDocumentItem = ({ document, parentUrl, categoryIds }: IProps) => {
  const pathname = usePathname();
  const isSelected = pathname.includes(`/${encodeURIComponent(toPersianDigit(document.id))}`);

  const url = toPersianDigit(`${parentUrl}/${document.name}/${document.id}?ids=${categoryIds}`
    .replace(/\s+/g, "-"));

  return (
    <Link
      href={url}
      key={`document-tree-item-${document.id}`}
      className={`collapse-document py-2 transition-all duration-300 flex gap-2 hover:bg-purple-light rounded-[5px] pl-2.5 w-full text-right pr-[22px] ${
        isSelected ? "bg-purple-light pointer-events-none selected" : ""
      }`}
      title={document.name}
      tabIndex={0}
    >
      <DocumentIcon className="w-5 h-5 stroke-icon-hover flex-none self-start" />
      {document.hasPassword ? (
        <LockIcon className="flex-none w-5 h-5 fill-icon-hover" />
      ) : null}
      <span className="text-xs text-gray-700 font-bold overflow-hidden text-right">
        {document.name}
      </span>
    </Link>
  );
};

export default SidebarDocumentItem;
