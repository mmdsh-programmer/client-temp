import React from "react";
import { ListItem } from "@material-tailwind/react";
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

const PublishAdvancedSearchResultItem = ({ resultItem, disabled, setDisableItems }: IProps) => {
  const router = useRouter();
  const createLink = useCreateDocumentLink();

  const setOpenSearch = usePublishStore((state) => {
    return state.setOpenPublishPageSearchContent;
  });

  const handleResultItemClick = () => {
    setDisableItems?.(true);

    createLink.mutate({
      repoId: resultItem.repoId,
      documentId: resultItem.id,
      callBack: (res) => {
        const url = toPersianDigit(
          `/${removeSpecialCharacters(res.repoName)}/${resultItem.repoId}/${removeSpecialCharacters(resultItem.name)}/${resultItem.id}`,
        );
        const redirectLink = `${window.location.origin}/publish/${url}`;
        router.replace(redirectLink);
        setOpenSearch(false);
        setDisableItems?.(false);
      },
      errorCallback: () => {
        setOpenSearch(false);
        setDisableItems?.(false);
      },
    });
  };

  return (
    <ListItem
      onClick={handleResultItemClick}
      className="flex min-h-10 gap-1 py-0 px-3"
      itemProp="!p-0"
      ripple
      disabled={disabled}
      {...({} as React.ComponentProps<typeof ListItem>)}
    >
      <div className="flex max-w-[90%] items-center gap-2">
        {resultItem.hasPassword || resultItem.hasBlackList || resultItem.hasWhiteList ? (
          <LockIcon className="h-6 w-6" />
        ) : null}
        <div
          className="label flex-1 overflow-hidden truncate text-ellipsis whitespace-nowrap"
          title={resultItem.name}
        >
          {resultItem.name}
        </div>
      </div>
    </ListItem>
  );
};

export default PublishAdvancedSearchResultItem;
