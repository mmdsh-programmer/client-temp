"use client";

import React from "react";
import { cn } from "@utils/cn";
import { removeSpecialCharacters, toPersianDigit } from "@utils/index";
import { useRouter } from "next/navigation";
import { usePublishStore } from "@store/publish";
import { IDocumentItem } from "@interface/domain.interface";
import { LockIcon } from "@components/atoms/icons";
import useCreateDocumentLink from "@hooks/document/useCreateDocumentLink";

interface IProps {
  resultItem: IDocumentItem;
  setDisableItems?: (value: boolean) => void;
  disabled?: boolean;
}

const PublishAdvancedSearchResultItem = ({
  resultItem,
  disabled,
  setDisableItems,
}: IProps) => {
  const router = useRouter();
  const createLink = useCreateDocumentLink();

  const setOpenSearch = usePublishStore((state) => {
    return state.setOpenPublishPageSearchContent;
  });

  const handleResultItemClick = () => {
    if (disabled) return;

    setDisableItems?.(true);

    createLink.mutate({
      repoId: resultItem.repoId,
      documentId: resultItem.id,
      callBack: (res) => {
        const url = toPersianDigit(
          `/${removeSpecialCharacters(res.repoName)}/${resultItem.repoId}/${
            removeSpecialCharacters(resultItem.name)
          }/${resultItem.id}`
        );
        const redirectLink = `${window.location.origin}/publish/${url}`;
        router.replace(redirectLink);
        setOpenSearch(false);
        setDisableItems?.(false);
      },
      errorCallback: () => {
        setDisableItems?.(false);
      },
    });
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
        "flex w-full items-center gap-1 rounded-md px-3 text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
        "min-h-10 py-0",
        disabled && "pointer-events-none opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer"
      )}
    >
      <div className="flex max-w-[90%] items-center gap-2">
        {resultItem.hasPassword ||
        resultItem.hasBlackList ||
        resultItem.hasWhiteList ? (
          <LockIcon className="h-6 w-6" />
        ) : null}
        <div
          className="flex-1 overflow-hidden truncate text-ellipsis whitespace-nowrap"
          title={resultItem.name}
        >
          {resultItem.name}
        </div>
      </div>
    </div>
  );
};

export default PublishAdvancedSearchResultItem;