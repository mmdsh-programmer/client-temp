import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";
import SelectBox from "@components/molecules/selectBox";
import { Button, Typography } from "@material-tailwind/react";
import { filterChildren } from "@atom/filter";
import { EDocumentTypes } from "@interface/enums";
import useGetTags from "@hooks/tag/useGetTags";
import SelectAtom from "@components/molecules/select";
import InputAtom from "@components/atoms/input";
import LoadingButton from "@components/molecules/loadingButton";

const CategoryFilter = () => {
  const getRepo = useRecoilValue(repoAtom);
  const {
    data: getTags,
    isLoading,
    isFetching,
  } = useGetTags(getRepo?.id, 30, true);

  const [documentType, setDocumentType] = useState<EDocumentTypes[]>([]);
  const [type, setType] = useState<any[]>([]);
  const [tags, setTags] = useState<number[]>([]);
  const [moreFilter, setMoreFilter] = useState<string>();
  const [searchTitle, setSearchTitle] = useState("");
  const setMainFilterChildren = useSetRecoilState(filterChildren);

  const tagOptions = getTags?.pages[0].list.map((tag) => {
    return { label: tag.name, value: tag.id };
  });

  const handleFilter = () => {
    const mainFilter = {
      default: false,
      type: {
        document: type.includes("document"),
        category: type.includes("category"),
      },
      tagIds: tags,
      contentTypes: documentType,
      isTemplate: moreFilter === "template",
      bookmarked: moreFilter === "bookmarked",
      title: searchTitle,
    };
    setMainFilterChildren(mainFilter);
  };

  return (
    <div className="w-full flex  mb-4 gap-2">
      <div className="flex w-full flex-wrap flex-col">
        <div className="flex-grow max-w-full">
          <InputAtom
            className="min-w-0 placeholder:!font-iranYekan !text-[13px] !text-primary !font-iranYekan !py-0 !h-[32px] outline-none focus:outline-none !border-2 !border-normal focus:!border-normal focus:!border-t-normal"
            placeholder="جستجو در عنوان"
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full">
          <SelectBox
            options={[
              { label: "سند", value: "document" },
              { label: "دسته بندی", value: "category" },
            ]}
            className="flex-grow"
            selectedOptions={type}
            setSelectedOptions={setType}
            defaultOption="نوع"
          />

          {type.length === 1 && type[0] === "category" ? null : (
            <div className="flex-grow flex flex-wrap mb-4 gap-4">
              <SelectBox
                options={[
                  { label: "کلاسور", value: "clasor" },
                  { label: "اکسل", value: "excel" },
                  { label: "فایل", value: "file" },
                ]}
                defaultOption="نوع محتوا"
                className="flex-grow"
                selectedOptions={documentType}
                setSelectedOptions={setDocumentType}
              />
              <SelectBox
                options={tagOptions as any[]}
                className="flex-grow"
                selectedOptions={tags}
                setSelectedOptions={setTags}
                defaultOption="تگ‌ها"
              />
              <SelectAtom
                options={[
                  { label: "نمونه سند", value: "template" },
                  { label: "نشان شده", value: "bookmark" },
                ]}
                className="flex-grow flex justify-between text-[13px] font-iranYekan py-1 pl-1 pr-2 border-2 border-normal"
                selectedOption={moreFilter}
                setSelectedOption={setMoreFilter}
                defaultOption="سایر فیلترها"
              />
            </div>
          )}
          <LoadingButton
            className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
            onClick={handleFilter}
          >
            <Typography className="text__label__button text-white">
              اعمال فیلتر
            </Typography>
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
