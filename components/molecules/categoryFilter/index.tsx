import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { EDocumentTypes } from "@interface/enums";
import InputAtom from "@components/atoms/input";
import LoadingButton from "@components/molecules/loadingButton";
import SelectBox from "@components/molecules/selectBox";
import { Typography } from "@material-tailwind/react";
import { filterChildrenAtom } from "@atom/filter";
import { repoAtom } from "@atom/repository";
import useGetTags from "@hooks/tag/useGetTags";

const CategoryFilter = () => {
  const getRepo = useRecoilValue(repoAtom);
  const repoId = getRepo!.id;
  const { data: getTags } = useGetTags(repoId, 30, true);
  const [documentType, setDocumentType] = useState<EDocumentTypes[]>([]);
  const [type, setType] = useState<string[]>([]);
  const [tags, setTags] = useState<number[]>([]);
  const [moreFilter, setMoreFilter] = useState<string[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const setMainFilterChildren = useSetRecoilState(filterChildrenAtom);

  const tagOptions =
    getTags?.pages[0].list.map((tag) => {
      return { label: tag.name, value: tag.id };
    }) || [];

  const handleFilter = () => {
    const mainFilter = {
      default: false,
      type: {
        document: type.includes("document"),
        category: type.includes("category"),
      },
      tagIds: tags,
      contentTypes: documentType,
      isTemplate: moreFilter.includes("template"),
      bookmarked: moreFilter.includes("bookmarked"),
      title: searchTitle,
    };
    setMainFilterChildren(mainFilter);
  };

  return (
    <div className="w-full flex pb-4 px-5 gap-2 h-[calc(100%-60px)]">
      <div className="flex w-full flex-col gap-4 xs:gap-2">
        <div className="flex flex-wrap w-full xs:flex-nowrap max-w-full gap-4 xs:gap-2">
          <InputAtom
            className="flex-grow !h-12 xs:!h-10 placeholder:!font-iranYekan !text-[13px] !text-primary bg-white !font-iranYekan !py-0 outline-none focus:outline-none !border-2 !border-normal focus:!border-normal focus:!border-t-normal"
            placeholder="جستجو در عنوان"
            onChange={(e) => {
              return setSearchTitle(e.target.value);
            }}
          />
          <div className="flex-grow min-w-[150px]">
            <SelectBox
              options={[
                { label: "سند", value: "document" },
                { label: "دسته بندی", value: "category" },
              ]}
              className="h-12 xs:!h-10 w-full"
              selectedOptions={type}
              setSelectedOptions={setType}
              defaultOption="نوع"
            />
          </div>
        </div>
        {type.includes("document") ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 grid-rows-[min-content] flex-wrap gap-4 xs:gap-2 pb-2">
            <SelectBox
              options={[
                { label: "کلاسور", value: "clasor" },
                { label: "اکسل", value: "excel" },
                { label: "فایل", value: "file" },
              ]}
              defaultOption="نوع محتوا"
              className="h-12 xs:!h-10 flex-grow"
              selectedOptions={documentType}
              setSelectedOptions={setDocumentType}
            />
            <SelectBox
              options={tagOptions}
              className="h-12 xs:!h-10 flex-grow"
              selectedOptions={tags}
              setSelectedOptions={setTags}
              defaultOption="تگ‌ها"
            />
            <SelectBox
              options={[
                { label: "نمونه سند", value: "template" },
                { label: "نشان شده", value: "bookmark" },
              ]}
              className="h-12 xs:!h-10 flex-grow"
              selectedOptions={moreFilter}
              setSelectedOptions={setMoreFilter}
              defaultOption="سایر فیلترها"
            />
          </div>
        ) : null}
        <div className="flex flex-grow items-end justify-end w-full">
        <LoadingButton
            className="!h-10 !w-full sm:!w-auto !px-4 bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
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
