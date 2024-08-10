import React, { useState } from "react";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";
import SelectBox from "@components/molecules/selectBox";
import { Button } from "@material-tailwind/react";
import {  filterReport } from "@atom/filter";
import { EDocumentTypes } from "@interface/enums";
import useGetTags from "@hooks/tag/useGetTags";
import SelectAtom from "@components/molecules/select";
import InputAtom from "@components/atoms/input";

const RepoFilter = () => {
  const getRepo = useRecoilValue(repoAtom);
  const {
    data: getTags,
    isLoading,
    isFetching,
  } = useGetTags(getRepo?.id, 30, true);

  const [documentType, setDocumentType] = useState<EDocumentTypes[]>([]);
  const [tags, setTags] = useState<number[]>([]);
  const [moreFilter, setMoreFilter] = useState<string>();
  const [searchTitle, setSearchTitle] = useState("");
  const [documentAddress, setDocumentAddress] = useState("");
  const setMainFilter = useSetRecoilState(filterReport);

  const tagOptions = getTags?.pages[0].list.map((tag) => {
    return { label: tag.name, value: tag.id };
  });

  const handleFilter = () => {
    const mainFilter = {
      default: true,
      tagIds: tags,
      contentTypes: documentType,
      isTemplate: moreFilter === "template",
      bookmarked: moreFilter === "bookmarked",
      title: searchTitle,
    };
    setMainFilter(mainFilter);
  };

  return (
    <div className="w-full flex flex-wrap mb-4 gap-4">
      <div className="flex flex-col gap-y-2">
        <SelectBox
          options={[
            { label: "کلاسور", value: "clasor" },
            { label: "اکسل", value: "excel" },
            { label: "فایل", value: "file" },
          ]}
          defaultOption="نوع محتوا"
          className="w-[150px]"
          selectedOptions={documentType}
          setSelectedOptions={setDocumentType}
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <SelectBox
          options={tagOptions as any[]}
          className="w-[150px]"
          selectedOptions={tags}
          setSelectedOptions={setTags}
          defaultOption="تگ‌ها"
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <SelectAtom
          options={[
            { label: "نمونه سند", value: "template" },
            { label: "نشان شده", value: "bookmark" },
          ]}
          className="w-[120px]"
          selectedOption={moreFilter}
          setSelectedOption={setMoreFilter}
          defaultOption="سایر فیلترها"
        />
      </div>
      <div className="flex-grow max-w-full">
        <InputAtom
          className="min-w-0 !py-0 !h-[32px]"
          placeholder="جستجو در عنوان"
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>
      <Button
        className="font-iranYekan shadow-none hover:shadow-none bg-primary-normal !h-[32px] flex items-center"
        placeholder=""
        onClick={handleFilter}
      >
        اعمال فیلتر
      </Button>
    </div>
  );
};

export default RepoFilter;
