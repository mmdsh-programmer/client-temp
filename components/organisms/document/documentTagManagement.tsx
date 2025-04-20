import React, { useEffect } from "react";
import { selectedDocumentAtom, tempDocTagAtom } from "@atom/document";
import { usePathname, useSearchParams } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import DocumentTagList from "@components/organisms/document/documentTagList";
import SearchableDropdown from "../../molecules/searchableDropdown";
import { Spinner } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import useGetDocument from "@hooks/document/useGetDocument";
import useGetTags from "@hooks/tag/useGetTags";
import useRepoId from "@hooks/custom/useRepoId";
import useGetUser from "@hooks/auth/useGetUser";
import useGetDomainTags from "@hooks/domainTags/useGetDomainTags";

interface IProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setTagName: React.Dispatch<React.SetStateAction<string | number>>;
}

const DocumentTagManagement = ({ setTagName, setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const [getTempDocTag, setTempDocTag] = useRecoilState(tempDocTagAtom);
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const repoId = useRepoId();
  const { data: userInfo } = useGetUser();

  const adminOrOwnerRole = () => {
    if (currentPath === "/admin/myDocuments") {
      return true;
    }
    if (
      currentPath === "/admin/sharedDocuments" ||
      sharedDocuments === "true"
    ) {
      return (
        getDocument?.accesses?.[0] === "admin" ||
        getDocument?.accesses?.[0] === "owner"
      );
    }
    if (getRepo) {
      return getRepo?.roleName === "admin" || getRepo?.roleName === "owner";
    }
  };

  const { data: getDomainTags, isLoading: isLoadingDomainTags } =
    useGetDomainTags(30, !!userInfo?.domainConfig.useDomainTag);

  const { data: getTags, isLoading: isLoadingTags } = useGetTags(
    repoId,
    currentPath === "/admin/sharedDocuments" || sharedDocuments === "true"
      ? true
      : undefined,
    30,
    !userInfo?.domainConfig.useDomainTag
  );

  const { data: documentInfo, isLoading } = useGetDocument(
    repoId,
    getDocument!.id,
    sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
    true,
    true,
    `document-${getDocument!.id}-info-tags`
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
    setTempDocTag((oldValue) => {
      return [...oldValue, { name: val.label, id: +val.value }];
    });
  };

  useEffect(() => {
    if (!documentInfo) return;
    
    const resourceTags = userInfo?.domainConfig.useDomainTag
      ? documentInfo.domainTags
      : documentInfo.tags;

    setTempDocTag(
      resourceTags.map((tag) => {
        return tag;
      })
    );
  }, [documentInfo]);

  return isLoading || isLoadingTags || isLoadingDomainTags ? (
    <div className="w-full flex justify-center mt-2">
      <Spinner className="h-5 w-5" color="deep-purple" />
    </div>
  ) : (
      <div className="flex flex-col gap-2">
        {adminOrOwnerRole() ?
          <SearchableDropdown
            options={updatedAvailableTags}
            handleSelect={handleTagSelect}
            handleChange={setTagName}
            setOpen={setOpen}
            createIcon={
              userInfo?.domainConfig.useDomainTag &&
              (userInfo?.domainRole === "owner" ||
                userInfo.domainRole === "participant") ||
              (!userInfo?.domainConfig.useDomainTag && adminOrOwnerRole())
            }
          />
          : null}
        <DocumentTagList tagList={getTempDocTag} />
      </div>
  );
};

export default DocumentTagManagement;
