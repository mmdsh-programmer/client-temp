"use client";

import React from "react";
import { cn } from "@/utils/cn";
import { IContentSearchListItem } from "@interface/contentSearch.interface";
import { removeSpecialCharacters, toPersianDigit } from "@utils/index";
import { usePathname, useRouter } from "next/navigation";
import { usePublishStore } from "@store/publish";

interface IProps {
  resultItem: IContentSearchListItem;
  setDisableItems?: (value: boolean) => void;
  disabled?: boolean;
}

const PublishContentSearchResultItem = ({ resultItem, disabled, setDisableItems }: IProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const setOpenSearch = usePublishStore((state) => {
    return state.setOpenPublishPageSearchContent;
  });

  const repoName = pathname ? decodeURIComponent(pathname.split("/")[2]) : "";

  const handleResultItemClick = () => {
    if (disabled) return;

    setDisableItems?.(true);

    const url = toPersianDigit(
      `/${removeSpecialCharacters(resultItem.repoName || repoName)}/${
        resultItem.repoId
      }/${removeSpecialCharacters(resultItem.documentName)}/${
        resultItem.documentId
      }/${removeSpecialCharacters(resultItem.versionName)}/v-${resultItem.versionId}`,
    );
    const redirectLink = `${window.location.origin}/publish/${url}`;

    router.replace(redirectLink);
    setOpenSearch(false);
    setDisableItems?.(false);
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={handleResultItemClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleResultItemClick();
        }
      }}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
        "min-h-12",
        "text-right",
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
        !disabled && "cursor-pointer",
      )}
    >
      <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {resultItem.repoName || repoName} <span className="text-muted-foreground/60">{">"}</span>{" "}
        {resultItem.documentName} <span className="text-muted-foreground/60">{">"}</span>{" "}
        {resultItem.versionName}
      </div>
    </div>
  );
};

export default PublishContentSearchResultItem;
