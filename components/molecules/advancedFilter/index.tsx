import React, { useEffect, useState } from "react";
import SelectAtom, { IOption } from "../select";
import { filterChildrenAtom, filterReportAtom } from "@atom/filter";
import { useRecoilState, useRecoilValue } from "recoil";

import { EDocumentTypes } from "@interface/enums";
import InputAtom from "@components/atoms/input";
import LoadingButton from "../loadingButton";
import SelectBox from "../selectBox";
import { Typography } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import useGetTags from "@hooks/tag/useGetTags";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdvancedFilter = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const currentPath = usePathname();
  const [getFilterChildren, setFilterChildren] =
    useRecoilState(filterChildrenAtom);
  const [getFilterReport, setFilterReport] = useRecoilState(filterReportAtom);

  const [searchType, setSearchType] = useState<IOption>({
    value: getFilterChildren ? "currentCategory" : "currentRepo",
    label: getFilterChildren ? "همین دسته‌بندی" : "کل مخزن",
  });
  const [documentType, setDocumentType] = useState<EDocumentTypes[]>([]);
  const [type, setType] = useState<string[]>([]);
  const [tags, setTags] = useState<number[]>([]);
  const [moreFilter, setMoreFilter] = useState<string[]>([]);
  const [searchTitle, setSearchTitle] = useState("");

  const { data: userInfo } = useGetUser();

  const repoId = () => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.id;
    }
    if (currentPath === "/admin/sharedDocuments") {
      return undefined;
    }
    return getRepo!.id;
  };

  const { data: getTags } = useGetTags(
    repoId()!,
    currentPath === "/admin/sharedDocuments",
    30,
    !!repoId()
  );

  const tagOptions =
    getTags?.pages[0].list.map((tag) => {
      return { label: tag.name, value: tag.id };
    }) || [];

  const searchTypeOptions =
    currentPath === "/admin/sharedDocuments"
      ? [{ label: "کل مخزن", value: "currentRepo" }]
      : [
          { label: "همین دسته‌بندی", value: "currentCategory" },
          { label: "کل مخزن", value: "currentRepo" },
        ];

  useEffect(() => {
    if (getFilterChildren) {
      setType([
        ...(getFilterChildren.type.document ? ["document"] : []),
        ...(getFilterChildren.type.category ? ["category"] : []),
      ]);
      setDocumentType(getFilterChildren.contentTypes || []);
      setTags(getFilterChildren.tagIds || []);
      setMoreFilter([
        ...(getFilterChildren.isTemplate ? ["template"] : []),
        ...(getFilterChildren.bookmarked ? ["bookmarked"] : []),
      ]);
      setSearchTitle(getFilterChildren.title || "");
      setSearchType({
        value: "currentCategory",
        label: "همین دسته‌بندی",
      });
    } else if (getFilterReport) {
      setType(["document"]);
      setDocumentType(getFilterReport.contentTypes || []);
      setTags(getFilterReport.tagIds || []);
      setMoreFilter([
        ...(getFilterReport.isTemplate ? ["template"] : []),
        ...(getFilterReport.bookmarked ? ["bookmarked"] : []),
      ]);
      setSearchTitle(getFilterReport.title || "");
      setSearchType({
        value: "currentRepo",
        label: "کل مخزن",
      });
    }
  }, [getFilterChildren, getFilterReport]);

  const handleFilter = () => {
    const childrenFilter = {
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
    const repoFilter = {
      default: true,
      tagIds: tags,
      contentTypes: documentType,
      isTemplate: moreFilter.includes("template"),
      bookmarked: moreFilter.includes("bookmarked"),
      title: searchTitle,
    };

    if (searchType.value === "currentCategory") {
      setFilterChildren(childrenFilter);
      setFilterReport(null);
    } else {
      setFilterReport(repoFilter);
      setFilterChildren(null);
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-wrap h-full xs:h-auto justify-between bg-primary xs:bg-gray-50">
      <div className="flex flex-wrap w-full gap-5 py-4 px-5 items-start">
        <div className="w-full flex pb-4 gap-2 h-[calc(100%-60px)]">
          <div className="flex w-full flex-col gap-4 xs:gap-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 items-end grid-rows-[min-content] flex-grow gap-x-2 gap-y-4 pb-2">
              <div className="flex flex-grow flex-col gap-2">
                <Typography className="form_label">جستجو</Typography>
                <InputAtom
                  className="flex-grow rounded-md !h-12 xs:!h-10 placeholder:!font-iranYekan !text-[13px] !text-primary_normal bg-white !font-iranYekan !py-0 outline-none focus:outline-none !border-2 !border-normal focus:!border-normal focus:!border-t-normal"
                  placeholder="جستجو در عنوان"
                  defaultValue={searchTitle}
                  onChange={(e) => {
                    return setSearchTitle(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-grow flex-col gap-2">
                <Typography className="form_label">نوع جستجو</Typography>
                <SelectAtom
                  options={searchTypeOptions}
                  className="h-12 xs:!h-10 pl-1 pr-2 !w-full bg-white border-[2px] border-normal justify-between"
                  setSelectedOption={setSearchType}
                  defaultOption={searchTypeOptions[0]}
                  selectedOption={searchType}
                />
              </div>
              <div className="flex flex-grow flex-col gap-2">
                <Typography className="form_label">نوع</Typography>
                <SelectBox
                  options={[
                    { label: "سند", value: "document" },
                    { label: "دسته بندی", value: "category" },
                  ]}
                  className="h-12 xs:!h-10 w-full"
                  selectedOptions={type}
                  setSelectedOptions={setType}
                  defaultOption="نوع"
                  disabled={
                    typeof searchType.value === "string" &&
                    searchType.value.includes("currentRepo")
                  }
                />
              </div>
              <div className="flex flex-grow flex-col gap-2">
                <Typography className="form_label">نوع محتوا</Typography>
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
                  disabled={
                    !type.includes("document") &&
                    !(searchType.value as string).includes("currentRepo")
                  }
                />
              </div>
              <div className="flex flex-grow flex-col gap-2">
                <Typography className="form_label">تگ‌ها</Typography>

                {!tagOptions.length && currentPath !== "/admin/sharedDocuments" ? (
                  <SelectAtom
                    options={[{ label: "تگی وجود ندارد", value: "none" }]}
                    className="h-12 xs:!h-10 pl-1 pr-2 !w-full bg-white border-[2px] border-normal justify-between"
                    setSelectedOption={setSearchType}
                    defaultOption={{ label: "تگ‌ها", value: "none" }}
                    selectedOption={{ label: "تگی وجود ندارد", value: "none" }}
                  />
                ) : (
                  <SelectBox
                    options={tagOptions}
                    className="h-12 xs:!h-10 flex-grow"
                    selectedOptions={tags}
                    setSelectedOptions={setTags}
                    defaultOption="تگ‌ها"
                    disabled={
                      (!type.includes("document") &&
                        !(searchType.value as string).includes(
                          "currentRepo"
                        )) ||
                      currentPath === "/admin/sharedDocuments"
                    }
                  />
                )}
              </div>
              <div className="flex flex-grow flex-col gap-2">
                <Typography className="form_label">سایر فیلترها</Typography>
                <SelectBox
                  options={[
                    { label: "نمونه سند", value: "template" },
                    { label: "نشان شده", value: "bookmark" },
                  ]}
                  className="h-12 xs:!h-10 flex-grow"
                  selectedOptions={moreFilter}
                  setSelectedOptions={setMoreFilter}
                  defaultOption="سایر فیلترها"
                  disabled={
                    (!type.includes("document") &&
                      !(searchType.value as string).includes("currentRepo")) ||
                    currentPath === "/admin/sharedDocuments"
                  }
                />
              </div>
              <LoadingButton
                className="!h-10 !w-full col-span-1 sm:col-start-2 md:col-start-2 lg:col-start-3 xl:col-start-7 sm:!w-auto !px-4 bg-secondary hover:bg-secondary active:bg-secondary"
                onClick={handleFilter}
              >
                <Typography className="text__label__button text-white">
                  اعمال فیلتر
                </Typography>
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilter;
