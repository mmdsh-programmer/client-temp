import React, { useEffect } from "react";
import { useDocumentStore } from "@store/document";
import { usePathname, useSearchParams } from "next/navigation";
import DocumentTagList from "@components/organisms/document/documentTagList";
import SearchableDropdown from "../../molecules/searchableDropdown";
import { useRepositoryStore } from "@store/repository";
import useGetDocument from "@hooks/document/useGetDocument";
import useGetDomainTags from "@hooks/domainTags/useGetDomainTags";
import useGetTags from "@hooks/tag/useGetTags";
import useGetUser from "@hooks/auth/useGetUser";
import useRepoId from "@hooks/custom/useRepoId";
import { Spinner } from "@components/atoms/spinner";

interface IProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setTagName: React.Dispatch<React.SetStateAction<string | number>>;
}

const DocumentTagManagement = ({ setTagName, setOpen }: IProps) => {
  const getRepo = useRepositoryStore((s) => {
    return s.repo;
  });
  const getDocument = useDocumentStore((s) => {
    return s.selectedDocument;
  });
  const getTempDocTag = useDocumentStore((s) => {
    return s.tempDocTag;
  });
  const setTempDocTag = useDocumentStore((s) => {
    return s.setTempDocTag;
  });
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const repoId = useRepoId();
  const { data: userInfo } = useGetUser();

  const adminOrOwnerRole = () => {
    if (
      currentPath === "/admin/myDocuments" ||
      (currentPath === "/admin/dashboard" && getDocument?.repoId === userInfo?.repository.id)
    ) {
      return true;
    }
    if (
      currentPath === "/admin/sharedDocuments" ||
      sharedDocuments === "true" ||
      (currentPath === "/admin/dashboard" && getDocument?.repoId !== userInfo?.repository.id)
    ) {
      return getDocument?.accesses?.[0] === "admin" || getDocument?.accesses?.[0] === "owner";
    }
    if (getRepo) {
      return getRepo?.roleName === "admin" || getRepo?.roleName === "owner";
    }
  };

  const { data: getDomainTags, isLoading: isLoadingDomainTags } = useGetDomainTags(
    30,
    !!userInfo?.domainConfig.useDomainTag,
  );

  const { data: getTags, isLoading: isLoadingTags } = useGetTags(
    repoId!,
    currentPath === "/admin/sharedDocuments" ||
      sharedDocuments === "true" ||
      (currentPath === "/admin/dashboard" && getDocument?.repoId !== userInfo?.repository.id)
      ? true
      : undefined,
    30,
    !userInfo?.domainConfig.useDomainTag,
  );

  const { data: documentInfo, isLoading } = useGetDocument(
    repoId!,
    getDocument!.id,
    sharedDocuments === "true" ||
      currentPath === "/admin/sharedDocuments" ||
      (currentPath === "/admin/dashboard" && getDocument?.repoId !== userInfo?.repository.id),
    true,
    true,
    `document-${getDocument!.id}-info-tags`,
  );

  const tags = userInfo?.domainConfig.useDomainTag ? getDomainTags : getTags;

  const updatedAvailableTags = tags?.pages[0].list
    .filter((repoTag) => {
      return getTempDocTag.every((tag) => {
        return tag.id !== +repoTag.id;
      });
    })
    .map((tag) => {
      return {
        label: tag.name,
        value: tag.id,
      };
    });

  const handleTagSelect = (val: { label: string; value: number | string }) => {
    setTagName(val.value);
    const newTags = [...getTempDocTag, { name: val.label, id: Number(val.value) }];
    setTempDocTag(newTags);
  };

  useEffect(() => {
    if (!documentInfo) return;

    const resourceTags = userInfo?.domainConfig.useDomainTag
      ? documentInfo.domainTags
      : documentInfo.tags;

    setTempDocTag(
      resourceTags.map((tag) => {
        return tag;
      }),
    );
  }, [documentInfo, userInfo?.domainConfig.useDomainTag, setTempDocTag]);

  return isLoading || isLoadingTags || isLoadingDomainTags ? (
    <div className="mt-2 flex w-full justify-center">
      <Spinner className="h-5 w-5 text-primary" />
    </div>
  ) : (
    <div className="flex flex-col gap-2">
      {adminOrOwnerRole() ? (
        <SearchableDropdown
          options={updatedAvailableTags}
          handleSelect={handleTagSelect}
          handleChange={setTagName}
          setOpen={setOpen}
          createIcon={!userInfo?.domainConfig.useDomainTag && adminOrOwnerRole()}
        />
      ) : null}
      <DocumentTagList tagList={getTempDocTag} />
    </div>
  );
};

export default DocumentTagManagement;
