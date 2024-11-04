import React, { useEffect } from "react";
import { selectedDocumentAtom, tempDocTagAtom } from "@atom/document";
import { repoAtom } from "@atom/repository";
import { useRecoilState, useRecoilValue } from "recoil";
import useGetTags from "@hooks/tag/useGetTags";
import { Spinner } from "@material-tailwind/react";
import SearchableDropdown from "../../molecules/searchableDropdown";
import DocumentTagList from "@components/organisms/document/documentTagList";
import useGetDocument from "@hooks/document/useGetDocument";
import { ERoles } from "@interface/enums";

interface IProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setTagName: React.Dispatch<React.SetStateAction<string | number>>;
}

const DocumentTagManagement = ({ setTagName, setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const [getTempDocTag, setTempDocTag] = useRecoilState(tempDocTagAtom);

  const adminRole =
    getRepo?.roleName === ERoles.owner ||
    getRepo?.roleName === ERoles.admin ||
    getRepo?.roleName === ERoles.editor;
  const repoId = getRepo!.id;
  const { data: getTags, isLoading: isLoadingTags } = useGetTags(
    repoId,
    30,
    true
  );

  const { data: documentInfo, isLoading } = useGetDocument(
    repoId,
    getDocument!.id,
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
      {adminRole ? (
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
