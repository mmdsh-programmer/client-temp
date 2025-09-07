import React from "react";
import { ListItem } from "@material-tailwind/react";
import { IContentSearchListItem } from "@interface/contentSearch.interface";
import { removeSpecialCharacters, toPersianDigit } from "@utils/index";
import useCreateDocumentLink from "@hooks/document/useCreateDocumentLink";
import { useRouter } from "next/navigation";
import { Spinner } from "@components/atoms/spinner";
import { usePublishStore } from "@store/publish";

interface IProps {
  resultItem: IContentSearchListItem;
  setDisableItems?: (value: boolean) => void;
  disabled?: boolean;
}

const PublishSearchResultItem = ({ resultItem, disabled, setDisableItems }: IProps) => {
  const router = useRouter();
  const setOpenSearch = usePublishStore((state) => {
    return state.setOpenPublishPageSearchContent;
  });
  const createDocumentLinkHook = useCreateDocumentLink(resultItem.repoId, resultItem.documentId);

  const handleResultItemClick = () => {
    setDisableItems?.(true);
    createDocumentLinkHook.mutate({
      repoId: resultItem.repoId,
      documentId: resultItem.documentId,
      callBack: (data) => {
        const url = toPersianDigit(
          `/${removeSpecialCharacters(data.repoName)}/${data.repoId}/${removeSpecialCharacters(data.name)}/${data.id}/${removeSpecialCharacters(resultItem.versionName)}/v-${resultItem.versionId}`,
        );
        const redirectLink = `${window.location.origin}/publish/${url}`;

        router.replace(redirectLink);
        setOpenSearch(false);
      },
      errorCallback: () => {
        setDisableItems?.(false);
      },
    });
  };

  return (
    <ListItem onClick={handleResultItemClick} className="flex min-h-12 gap-2" disabled={disabled}>
      {createDocumentLinkHook.isPending ? (
        <div className="flex w-fit flex-shrink-0 items-center justify-center">
          <Spinner className="h-4 w-4 text-primary" />
        </div>
      ) : null}
      <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {resultItem.repoName} <span>{">"}</span> {resultItem.documentName} <span>{">"}</span>{" "}
        {resultItem.versionName}
      </div>
    </ListItem>
  );
};

export default PublishSearchResultItem;
