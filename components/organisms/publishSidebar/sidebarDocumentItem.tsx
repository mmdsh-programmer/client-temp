"use client";

import React from "react";
import { DocumentIcon, LockIcon } from "@components/atoms/icons";
import { isPrivate, removeSpecialCharacters, toPersianDigit } from "@utils/index";
import { IDocumentMetadata } from "@interface/document.interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePublishStore } from "@store/publish";

interface IProps {
  document: IDocumentMetadata;
  parentUrl: string;
  categoryIds: number[];
}

const SidebarDocumentItem = ({ document, parentUrl, categoryIds }: IProps) => {
  const pathname = usePathname();
  const isSelected = pathname.includes(`/${encodeURIComponent(toPersianDigit(document.id))}`);
  const { setPublishPageSelectedDocument } = usePublishStore();

  const url = toPersianDigit(
    `/${isPrivate(document) ? "private" : "publish"}${parentUrl}/${removeSpecialCharacters(document.name)}/${document.id}${categoryIds.length ? `?ids=${categoryIds.join("-")}` : ""}`,
  );

  return (
    <Link
      href={url}
      key={`document-tree-item-${document.id}`}
      className={`collapse-document flex w-full gap-2 rounded-[5px] py-2 pl-2.5 pr-[22px] text-right transition-all duration-300 hover:bg-purple-light ${
        isSelected ? "selected pointer-events-none bg-purple-light" : ""
      }`}
      title={document.name}
      tabIndex={0}
      onClick={() => {
        setPublishPageSelectedDocument(document);
      }}
    >
      <DocumentIcon className="h-5 w-5 flex-none self-start stroke-icon-hover" />
      {isPrivate(document) ? <LockIcon className="h-5 w-5 flex-none fill-icon-hover" /> : null}
      <span className="overflow-hidden text-right text-xs font-bold text-gray-700">
        {document.name}
      </span>
    </Link>
  );
};

export default SidebarDocumentItem;
