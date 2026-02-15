"use client";

import React from "react";
import { cn } from "@utils/cn";
import { removeSpecialCharacters, toPersianDigit } from "@utils/index";
import { useRouter } from "next/navigation";
import { usePublishStore } from "@store/publish";
import { IVersionItem } from "@interface/domain.interface";
import useCreateDocumentLink from "@hooks/document/useCreateDocumentLink";

interface IProps {
  resultItem: IVersionItem;
  setDisableItems?: (value: boolean) => void;
  disabled?: boolean;
}

const PublishAdvancedSearchVersionItem = ({
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
      documentId: resultItem.documentId,
      callBack: (res) => {
        const url = toPersianDigit(
          `/${removeSpecialCharacters(res.repoName)}/${resultItem.repoId}/${
            removeSpecialCharacters(res.name)
          }/${res.id}/${removeSpecialCharacters(resultItem.number)}/v-${
            resultItem.id
          }`
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
        "flex w-full items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
        "min-h-8 py-0",
        disabled && "pointer-events-none opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer"
      )}
    >
      <div className="flex max-w-[90%] items-center gap-2">
        <div
          className="flex-1 overflow-hidden truncate text-ellipsis whitespace-nowrap"
          title={resultItem.number}
        >
          {resultItem.number}
        </div>
      </div>
    </div>
  );
};

export default PublishAdvancedSearchVersionItem;