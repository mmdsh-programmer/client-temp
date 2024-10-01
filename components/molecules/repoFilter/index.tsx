import React, { useState } from "react";

import { EDocumentTypes } from "@interface/enums";
import { IOption } from "../select";
import InputAtom from "@components/atoms/input";
import LoadingButton from "@components/molecules/loadingButton";
import SelectBox from "@components/molecules/selectBox";
import { Typography } from "@material-tailwind/react";
import { filterReportAtom } from "@atom/filter";
import useGetTags from "@hooks/tag/useGetTags";
import {useSetRecoilState} from "recoil";

const RepoFilter = ({ repoId }: { repoId: number }) => {

  const { data: getTags } = useGetTags(repoId, 30, true);

  const [documentType, setDocumentType] = useState<EDocumentTypes[]>([]);
  const [tags, setTags] = useState<number[]>([]);
  const [moreFilter, setMoreFilter] = useState<string[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const setMainFilter = useSetRecoilState(filterReportAtom);

  const tagOptions = getTags?.pages[0].list.map((tag) => {
    return {
      label: tag.name,
      value: tag.id,
    };
  });

  const handleFilter = () => {
    const mainFilter = {
      default: true,
      tagIds: tags,
      contentTypes: documentType,
      isTemplate: moreFilter.includes("template"),
      bookmarked: moreFilter.includes("bookmarked"),
      title: searchTitle,
    };
    setMainFilter(mainFilter);
  };

  return (
    <div className="w-full flex flex-wrap h-[calc(100%-60px)] pb-4 px-5">
      <div className="flex flex-col w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 grid-rows-[min-content] flex-wrap gap-4 xs:gap-2 pb-2">
          <div className="flex-grow max-w-full sm:col-span-3 md:col-span-3 lg:col-span-1">
            <InputAtom
              className="!h-12 xs:!h-10 flex-grow placeholder:!font-iranYekan !text-[13px] !text-primary bg-white !font-iranYekan !py-0 outline-none focus:outline-none !border-2 !border-normal focus:!border-normal focus:!border-t-normal"
              placeholder="جستجو در عنوان"
              onChange={(e) => {
                return setSearchTitle(e.target.value);
              }}
            />
          </div>
          <SelectBox
            options={[
              {
                label: "کلاسور",
                value: "clasor",
              },
              {
                label: "اکسل",
                value: "excel",
              },
              {
                label: "فایل",
                value: "file",
              },
            ]}
            defaultOption="نوع محتوا"
            className="h-12 xs:!h-10  sm:col-span-auto md:col-span-auto lg:col-span-auto"
            selectedOptions={documentType}
            setSelectedOptions={setDocumentType}
          />
          <SelectBox
            options={tagOptions as IOption[]}
            className="h-12 xs:!h-10  sm:col-span-auto md:col-span-auto lg:col-span-auto"
            selectedOptions={tags}
            setSelectedOptions={setTags}
            defaultOption="تگ‌ها"
          />
          <SelectBox
            options={[
              {
                label: "نمونه سند",
                value: "template",
              },
              {
                label: "نشان شده",
                value: "bookmark",
              },
            ]}
            className="h-12 xs:!h-10 min-w-[150px] max-w-full sm:col-span-auto md:col-span-auto lg:col-span-auto"
            selectedOptions={moreFilter}
            setSelectedOptions={setMoreFilter}
            defaultOption="سایر فیلترها"
          />
        </div>
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

export default RepoFilter;
