import { Button, Typography } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { selectedDocumentAtom, tempDocTagAtom } from "@atom/document";
import { useRecoilValue, useSetRecoilState } from "recoil";

import ChipMolecule from "@components/molecules/chip";
import { ITag } from "@interface/tags.interface";
import React from "react";
import { XIcon } from "@components/atoms/icons";
import { repoAtom } from "@atom/repository";

interface IProps {
  tagList?: ITag[];
}

const DocumentTagList = ({ tagList }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);
  const setTempDocTag = useSetRecoilState(tempDocTagAtom);

  const adminRole =
    getRepo?.roleName === "owner" || getRepo?.roleName === "admin";

  const handleDelete = (tag: ITag) => {
    if (!getRepo || !document) return;
    if (!tag) return;
    setTempDocTag((oldValue) => {
      return [
        ...oldValue.filter((id) => {
          return +tag.id !== id;
        }),
      ];
    });
  };

  return (
    <>
      <Typography className="title_t4 text-secondary ">
        لیست تگ‌های سند
      </Typography>
      <div className="flex flex-col">
        {tagList?.length ? (
          <div className="flex flex-wrap gap-2">
            {tagList.map((tag) => {
              return (
                <ChipMolecule
                  value={tag.name}
                  key={tag.id}
                  className="bg-gray-50 h-6 px-2 text-primary max-w-[150px] "
                  actionIcon={
                    adminRole ? (
                      <Button
                        className="p-0 bg-transparent"
                        onClick={() => handleDelete(tag)}
                      >
                        <XIcon className="h-4 w-4 fill-icon-active" />
                      </Button>
                    ) : null
                  }
                />
              );
            })}
          </div>
        ) : (
          <EmptyList type={EEmptyList.DOC_TAGS} />
        )}
      </div>
    </>
  );
};

export default DocumentTagList;
