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
      documentId: resultItem.id,
      callBack: (res) => {
        const url = toPersianDigit(
          `/${removeSpecialCharacters(res.repoName)}/${resultItem.repoId}/${removeSpecialCharacters(resultItem.number)}/${resultItem.id}`,
        );
        const redirectLink = `${window.location.origin}/publish/${url}`;

        router.replace(redirectLink);
        setOpenSearch(false);
        setDisableItems?.(false);
      },
    });
  };

  return (
    <ListItem
      onClick={handleResultItemClick}
      className="flex min-h-12 gap-2"
      disabled={disabled}
      {...({} as React.ComponentProps<typeof ListItem>)}
    >
      <div className="max-w-[90%] flex items-center gap-2">
        <div
          className="body_b3 flex-1 overflow-hidden truncate text-ellipsis whitespace-nowrap"
          title={resultItem.number}
        >
          {resultItem.number}
        </div>
      </div>
    </ListItem>
  );
};

export default PublishAdvancedSearchVersionItem;
