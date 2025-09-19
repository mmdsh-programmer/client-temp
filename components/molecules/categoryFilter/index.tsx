import React, { useState } from "react";
import { EDocumentTypes } from "@interface/enums";
import InputAtom from "@components/atoms/input";
import LoadingButton from "@components/molecules/loadingButton";
import SelectBox from "@components/molecules/selectBox";
import { Typography } from "@material-tailwind/react";
import useGetTags from "@hooks/tag/useGetTags";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";
import { useRepositoryStore } from "@store/repository";
import { useFilterStore } from "@store/filter";

const CategoryFilter = () => {
  const currentPath = usePathname();
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const setMainFilterChildren = useFilterStore((state) => {
    return state.setFilterChildren;
  });

  const [documentType, setDocumentType] = useState<EDocumentTypes[]>([]);
  const [type, setType] = useState<string[]>([]);
  const [tags, setTags] = useState<number[]>([]);
  const [moreFilter, setMoreFilter] = useState<string[]>([]);
  const [searchTitle, setSearchTitle] = useState("");

  const { data: userInfo } = useGetUser();

  const repoId = currentPath === "/admin/myDocuments" ? userInfo!.repository.id : getRepo!.id;

  const { data: getTags } = useGetTags(
    repoId,
    currentPath === "/admin/sharedDocuments" ? true : undefined,
    30,
    true,
  );
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
    <div className="flex h-[calc(100%-60px)] w-full gap-2 px-5 pb-4">
      <div className="flex w-full flex-col gap-4 xs:gap-2">
        <div className="flex w-full max-w-full flex-wrap gap-4 xs:flex-nowrap xs:gap-2">
          <InputAtom
            className="!h-12 flex-grow !border-2 !border-normal bg-white !py-0 !font-iranYekan !text-[13px] !text-primary_normal outline-none placeholder:!font-iranYekan focus:!border-normal focus:!border-t-normal focus:outline-none xs:!h-10"
            placeholder="جستجو در عنوان"
            onChange={(e) => {
              return setSearchTitle(e.target.value);
            }}
          />
          <div className="min-w-[150px] flex-grow">
            <SelectBox
              options={[
                { label: "سند", value: "document" },
                { label: "دسته بندی", value: "category" },
              ]}
              className="h-12 w-full xs:!h-10"
              selectedOptions={type}
              setSelectedOptions={setType}
              defaultOption="نوع"
            />
          </div>
        </div>
        {type.includes("document") ? (
          <div className="grid grid-cols-1 grid-rows-[min-content] flex-wrap gap-4 pb-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xs:gap-2">
            <SelectBox
              options={[
                { label: "کلاسور", value: "clasor" },
                { label: "اکسل", value: "excel" },
                { label: "فایل", value: "file" },
              ]}
              defaultOption="نوع محتوا"
              className="h-12 flex-grow xs:!h-10"
              selectedOptions={documentType}
              setSelectedOptions={setDocumentType}
            />
            <SelectBox
              options={tagOptions}
              className="h-12 flex-grow xs:!h-10"
              selectedOptions={tags}
              setSelectedOptions={setTags}
              defaultOption="تگ‌ها"
            />
            <SelectBox
              options={[
                { label: "نمونه سند", value: "template" },
                { label: "نشان شده", value: "bookmark" },
              ]}
              className="h-12 flex-grow xs:!h-10"
              selectedOptions={moreFilter}
              setSelectedOptions={setMoreFilter}
              defaultOption="سایر فیلترها"
            />
          </div>
        ) : null}
        <div className="flex w-full flex-grow items-end justify-end">
          <LoadingButton
            className="!h-10 !w-full bg-secondary !px-4 hover:bg-secondary active:bg-secondary sm:!w-auto"
            onClick={handleFilter}
          >
            <Typography
              placeholder=""
              className="text__label__button text-white"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              اعمال فیلتر
            </Typography>
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
