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

  const { data: getTags, isLoading: isLoadingTags } = useGetTags(
    repoId,
    currentPath === "/admin/sharedDocuments" || sharedDocuments === "true"
      ? true
      : undefined,
    30,
    true
  );

  const { data: documentInfo, isLoading } = useGetDocument(
    repoId,
    getDocument!.id,
    sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
    true,
    true,
    `document-${getDocument!.id}-info-tags`
  );

  const updatedAvailableTags = getTags?.pages[0].list
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
    setTempDocTag(
      documentInfo?.tags.map((tag) => {
        return tag;
      })
    );
  }, [documentInfo]);

  return isLoading || isLoadingTags ? (
    <Spinner className="h-5 w-5" color="deep-purple" />
  ) : (
    <div className="flex flex-col gap-2">
      {adminOrOwnerRole() ? (
        <SearchableDropdown
          options={updatedAvailableTags}
          handleSelect={handleTagSelect}
          handleChange={setTagName}
          setOpen={setOpen}
          createIcon
        />
      ) : null}
      <DocumentTagList tagList={getTempDocTag} />
    </div>
  );
};

export default DocumentTagManagement;
