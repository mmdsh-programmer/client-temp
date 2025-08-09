import React from "react";
import { ListItem } from "@material-tailwind/react";
import { IContentSearchListItem } from "@interface/contentSearch.interface";
import { openPublishPageSearchContent } from "@atom/publish";
import { toPersianDigit } from "@utils/index";
import useCreateDocumentLink from "@hooks/document/useCreateDocumentLink";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { Spinner } from "@components/atoms/spinner";

interface IProps {
  resultItem: IContentSearchListItem;
  setDisableItems?: (value: boolean) => void;
  disabled?: boolean;
}

const PublishSearchResultItem = ({
  resultItem,
  disabled,
  setDisableItems,
}: IProps) => {
  const router = useRouter();
  const setOpenSearch = useSetRecoilState(openPublishPageSearchContent);

  const createDocumentLinkHook = useCreateDocumentLink(
    resultItem.repoId,
    resultItem.documentId
  );

  const handleResultItemClick = () => {
    setDisableItems?.(true);
    createDocumentLinkHook.mutate({
      repoId: resultItem.repoId,
      documentId: resultItem.documentId,
      callBack: (data) => {
        const redirectLink = `${window.location.origin}/publish/${toPersianDigit(`${data.repoName.replaceAll(/\s+/g, "-")}`)}/${data.repoId}
        /${data.id}/${toPersianDigit(
          `${data.name.replaceAll(/\s+/g, "-")}`
        )}/v-${resultItem.versionId}`;

        router.replace(redirectLink);
        setOpenSearch(false);
      },
      errorCallback: () => {
        setDisableItems?.(false);
      },
    });
  };

  return (
    <ListItem
      onClick={handleResultItemClick}
      className="flex min-h-12 gap-2"
      disabled={disabled}
    >
      {createDocumentLinkHook.isPending ? (
        <div className="w-fit flex-shrink-0 flex justify-center items-center">
          <Spinner className="h-4 w-4 text-primary" />
        </div>
      ) : null}
      <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {resultItem.repoName} <span>{">"}</span> {resultItem.documentName}{" "}
        <span>{">"}</span> {resultItem.versionName}
      </div>
    </ListItem>
  );
};

export default PublishSearchResultItem;
