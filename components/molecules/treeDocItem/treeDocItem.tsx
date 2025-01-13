import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { DocIcon, InvisibleIcon, TickIcon } from "@components/atoms/icons";
import { IDocumentTreeItem } from "atom/category";
import { documentTemplateAtom } from "atom/document";
import { useRecoilState } from "recoil";
import DocumentMenu from "../documentMenu";

interface IProps {
  docItem: IDocumentTreeItem;
  enableAction?: boolean;
}

const TreeDocItem = ({ docItem, enableAction }: IProps) => {
  const [getDocumentTemplate, setDocumentTemplate] =
    useRecoilState(documentTemplateAtom);

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
              <TickIcon className="fill-purple-normal w-5 h-5 flex-none" />
            ) : null}
            <DocIcon className="fill-gray-300 w-5 h-5 flex-none" />
            {docItem.isHidden && (
              <InvisibleIcon className="w-5 h-5 stroke-neutral-content flex-none" />
            )}
          </div>
          <Typography className="text-primary lowercase mr-2" key={docItem.id}>
            {docItem.name}
          </Typography>
          {enableAction ? (
            <div className="mr-4">
              <DocumentMenu />
            </div>
          ) : null}
        </Button>
      </div>
    </div>
  );
};

export default TreeDocItem;
