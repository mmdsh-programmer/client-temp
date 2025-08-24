import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { useDocumentStore } from "@store/document";
import ChipMolecule from "@components/molecules/chip";
import { XIcon } from "@components/atoms/icons";
import { useRepositoryStore } from "@store/repository";
import { usePathname, useSearchParams } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  tagList?: {
    name: string;
    id: number;
  }[];
}

const DocumentTagList = ({ tagList }: IProps) => {
  const getRepo = useRepositoryStore((s) => {
    return s.repo;
  });
  const document = useDocumentStore((s) => {
    return s.selectedDocument;
  });
  const setTempDocTag = useDocumentStore((s) => {
    return s.setTempDocTag;
  });
  const tempDocTag = useDocumentStore((s) => {
    return s.tempDocTag;
  });
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const repoId = useRepoId();
  const { data: userInfo } = useGetUser();

  const adminOrOwnerRole = () => {
    if (
      currentPath === "/admin/myDocuments" ||
      (currentPath === "/admin/dashboard" && document?.repoId === userInfo?.repository.id)
    ) {
      return true;
    }
    if (
      currentPath === "/admin/sharedDocuments" ||
      sharedDocuments === "true" ||
      (currentPath === "/admin/dashboard" && document?.repoId !== userInfo?.repository.id)
    ) {
      return document?.accesses?.[0] === "admin" || document?.accesses?.[0] === "owner";
    }
    if (getRepo) {
      return getRepo?.roleName === "admin" || getRepo?.roleName === "owner";
    }
  };

  const handleDelete = (tag: { name: string; id: number }) => {
    if (!repoId || !document) return;
    if (!tag) return;
    const currentTags = tagList ?? tempDocTag;
    const nextTags = currentTags.filter((docTag) => {
      return tag.id !== docTag.id;
    });
    setTempDocTag(nextTags);
  };

  return (
    <>
      <Typography className="title_t4 text-secondary">تگ‌های انتخاب شده</Typography>
      <div className="document-tag-list flex flex-col">
        {tagList?.length ? (
          <div className="tag-list flex flex-wrap gap-2">
            {tagList.map((tag) => {
              return (
                <ChipMolecule
                  value={tag.name}
                  key={tag.id}
                  className="tag-item h-6 max-w-[150px] bg-gray-50 px-2 text-primary_normal"
                  actionIcon={
                    adminOrOwnerRole() ? (
                      <Button
                        className="delete-button bg-transparent p-0"
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
