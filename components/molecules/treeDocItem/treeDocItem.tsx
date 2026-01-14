import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import DocumentIcon from "../documentIcon";
import DocumentMenu from "../documentMenu";
import { TickIcon } from "@components/atoms/icons";
import { useDocumentStore } from "@store/document";
import { IDocumentTreeItem } from "@store/category";

interface IProps {
  docItem: IDocumentTreeItem;
  enableAction?: boolean;
}

const TreeDocItem = ({ docItem, enableAction }: IProps) => {
  const { documentTemplate: getDocumentTemplate, setDocumentTemplate } = useDocumentStore();
  const handleDocClick = () => {
    setDocumentTemplate(getDocumentTemplate?.id === docItem.id ? null : docItem);
  };

  return (
    <div className={`${docItem.creatorSSOID ? "" : "bg-gray-300"} document-tree-item`}>
      <div className="flex pr-4">
        <Button
          {...({} as React.ComponentProps<typeof Button>)}
          className="flex bg-transparent p-2"
          onClick={handleDocClick}
        >
          <div className="flex">
            {!enableAction && getDocumentTemplate?.id === docItem.id ? (
              <TickIcon className="h-5 w-5 flex-none fill-purple-normal" />
            ) : null}
          </div>
          <DocumentIcon document={docItem} />
          <Typography
            {...({} as React.ComponentProps<typeof Typography>)}
            className="mr-2 lowercase text-primary_normal"
            key={docItem.id}
          >
            {docItem.name}
          </Typography>
          {enableAction ? (
            <div className="mr-4">
              <DocumentMenu document={docItem} />
            </div>
          ) : null}
        </Button>
      </div>
    </div>
  );
};

export default TreeDocItem;
