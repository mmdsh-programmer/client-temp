import React from "react";
import { ListItem } from "@material-tailwind/react";
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

const PublishAdvancedSearchVersionItem = ({ resultItem, disabled, setDisableItems }: IProps) => {
  const router = useRouter();
  const createLink = useCreateDocumentLink();

  const setOpenSearch = usePublishStore((state) => {
    return state.setOpenPublishPageSearchContent;
  });

  const handleResultItemClick = () => {
    setDisableItems?.(true);

    createLink.mutate({
      repoId: resultItem.repoId,
      documentId: resultItem.documentId,
      callBack: (res) => {
        const url = toPersianDigit(
          `/${removeSpecialCharacters(res.repoName)}/${resultItem.repoId}/${removeSpecialCharacters(res.name)}/${res.id}/${removeSpecialCharacters(resultItem.number)}/v-${resultItem.id}`,
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
    <ListItem
      onClick={handleResultItemClick}
      className="flex min-h-8 gap-1 px-3 py-0"
      disabled={disabled}
      {...({} as React.ComponentProps<typeof ListItem>)}
    >
      <div className="flex max-w-[90%] items-center gap-2">
        <div
          className="label flex-1 overflow-hidden truncate text-ellipsis whitespace-nowrap"
          title={resultItem.number}
        >
          {resultItem.number}
        </div>
      </div>
    </ListItem>
  );
};

export default PublishAdvancedSearchVersionItem;
