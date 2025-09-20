import React from "react";
import { ListItem } from "@material-tailwind/react";
import { IContentSearchListItem } from "@interface/contentSearch.interface";
import { removeSpecialCharacters, toPersianDigit } from "@utils/index";
import { usePathname, useRouter } from "next/navigation";
import { usePublishStore } from "@store/publish";

interface IProps {
  resultItem: IContentSearchListItem;
  setDisableItems?: (value: boolean) => void;
  disabled?: boolean;
}

const PublishSearchResultItem = ({ resultItem, disabled, setDisableItems }: IProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const setOpenSearch = usePublishStore((state) => {
    return state.setOpenPublishPageSearchContent;
  });
  const repoName = decodeURIComponent(pathname.split("/")[2]);

  const handleResultItemClick = () => {
    setDisableItems?.(true);

    const url = toPersianDigit(
      `/${removeSpecialCharacters(resultItem.repoName || repoName)}/${resultItem.repoId}/${removeSpecialCharacters(resultItem.documentName)}/${resultItem.documentId}/${removeSpecialCharacters(resultItem.versionName)}/v-${resultItem.versionId}`,
    );
    const redirectLink = `${window.location.origin}/publish/${url}`;

    router.replace(redirectLink);
    setOpenSearch(false);
    setDisableItems?.(false);
  };

  return (
    <ListItem onClick={handleResultItemClick} className="flex min-h-12 gap-2" disabled={disabled}>
      <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {resultItem.repoName || repoName} <span>{">"}</span> {resultItem.documentName}{" "}
        <span>{">"}</span> {resultItem.versionName}
      </div>
    </ListItem>
  );
};

export default PublishSearchResultItem;
