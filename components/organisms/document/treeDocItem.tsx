import React from "react";
import { IDocumentTreeItem } from "atom/category";
import { documentTemplate } from "atom/document";
import { useRecoilState } from "recoil";
import { DocIcon, InvisibleIcon, TickIcon } from "@components/atoms/icons";
import { Button, Typography } from "@material-tailwind/react";

interface IProps {
  docItem: IDocumentTreeItem;
}

const TreeDocItem = ({ docItem }: IProps) => {
  const [getDocumentTemplate, setDocumentTemplate] =
    useRecoilState(documentTemplate);

  const handleDocClick = () => {
    setDocumentTemplate((prevState) => {
      return prevState?.id === docItem.id ? null : docItem;
    });
  };

  return (
    <div className="pr-4">
      <div className="flex">
        <Button
          placeholder="button"
          className="flex p-2 bg-transparent "
          onClick={handleDocClick}
        >
          <div className="flex">
            {getDocumentTemplate?.id === docItem.id ? (
              <TickIcon className="stroke-gray-300 w-5 h-5 flex-none" />
            ) : null}
            <DocIcon className="fill-gray-300 w-5 h-5 flex-none" />
            {docItem.isHidden && (
              <InvisibleIcon className="w-5 h-5 stroke-neutral-content flex-none" />
            )}
          </div>
          <Typography className="text-primary lowercase mr-2" key={docItem.id}>
            {docItem.name}
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default TreeDocItem;
