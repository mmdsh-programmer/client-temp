import { Button, Typography } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { selectedDocumentAtom, tempDocTagAtom } from "@atom/document";
import { useRecoilValue, useSetRecoilState } from "recoil";

import ChipMolecule from "@components/molecules/chip";
import React from "react";
import { XIcon } from "@components/atoms/icons";
import { repoAtom } from "@atom/repository";
import { usePathname } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";

interface IProps {
  tagList?: {
    name: string;
    id: number;
  }[];
}

const DocumentTagList = ({ tagList }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);
  const setTempDocTag = useSetRecoilState(tempDocTagAtom);
  const currentPath = usePathname();

  const repoId = useRepoId();

  const adminOrOwnerRole = () => {
    if (currentPath === "/admin/myDocuments") {
      return true;
    }
    if (currentPath === "/admin/sharedDocuments") {
      return (
        document?.accesses?.[0] === "admin" ||
        document?.accesses?.[0] === "owner"
      );
    }
    if (getRepo) {
      return getRepo?.roleName === "admin" || getRepo?.roleName === "owner";
    }
  };

  const handleDelete = (tag: { name: string; id: number }) => {
    if (!repoId || !document) return;
    if (!tag) return;
    setTempDocTag((oldValue) => {
      return [
        ...oldValue.filter((docTag) => {
          return +tag.id !== docTag.id;
        }),
      ];
    });
  };

  return (
    <>
      <Typography className="title_t4 text-secondary ">
        تگ‌های انتخاب شده
      </Typography>
      <div className="document-tag-list flex flex-col">
        {tagList?.length ? (
          <div className="tag-list flex flex-wrap gap-2">
            {tagList.map((tag) => {
              return (
                <ChipMolecule
                  value={tag.name}
                  key={tag.id}
                  className="tag-item bg-gray-50 h-6 px-2 text-primary_normal max-w-[150px] "
                  actionIcon={
                    adminOrOwnerRole() ? (
                      <Button
                        className="delete-button p-0 bg-transparent"
                        onClick={() => {
                          return handleDelete(tag);
                        }}
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
