import React, { useEffect, useState } from "react";
import SelectAtom, { IOption } from "../select";
import { useFilterStore } from "@store/filter";
import { EDocumentTypes } from "@interface/enums";
import InputAtom from "@components/atoms/input";
import LoadingButton from "../loadingButton";
import SelectBox from "../selectBox";
import { Typography } from "@material-tailwind/react";
import useGetTags from "@hooks/tag/useGetTags";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";
import useGetDomainTags from "@hooks/domainTags/useGetDomainTags";
import useRepoId from "@hooks/custom/useRepoId";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdvancedFilter = ({ setOpen }: IProps) => {
  const currentPath = usePathname();
  const repoId = useRepoId();
  const { filterChildren: getFilterChildren, setFilterChildren } = useFilterStore();
  const { filterReport: getFilterReport, setFilterReport } = useFilterStore();

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

  const { data: getTags } = useGetTags(
    repoId!,
    currentPath === "/admin/sharedDocuments",
    30,
    !!repoId,
  );
  const { data: getDomainTags } = useGetDomainTags(30, !!userInfo?.domainConfig.useDomainTag);
  const tagList = userInfo?.domainConfig.useDomainTag ? getDomainTags : getTags;

  const tagOptions =
    tagList?.pages[0].list.map((tag) => {
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
      type: {
        document: type.includes("document"),
        category: type.includes("category"),
      },
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
    <div className="flex h-full flex-wrap justify-between bg-primary xs:h-auto xs:bg-gray-50">
      <div className="flex w-full flex-wrap items-start gap-5 px-5 py-4">
        <div className="flex h-[calc(100%-60px)] w-full gap-2 pb-4">
          <div className="flex w-full flex-col gap-4 xs:gap-2">
            <div className="grid flex-grow grid-cols-1 grid-rows-[min-content] items-end gap-x-2 gap-y-4 pb-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
              <div className="flex flex-grow flex-col gap-2">
                <Typography className="form_label">جستجو</Typography>
                <InputAtom
                  className="!h-12 flex-grow rounded-md !border-2 !border-normal bg-white !py-0 !font-iranYekan !text-[13px] !text-primary_normal outline-none placeholder:!font-iranYekan focus:!border-normal focus:!border-t-normal focus:outline-none xs:!h-10"
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
                  className="h-12 !w-full justify-between border-[2px] border-normal bg-white pl-1 pr-2 xs:!h-10"
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
                  className="h-12 w-full xs:!h-10"
                  selectedOptions={type}
                  setSelectedOptions={setType}
                  defaultOption="نوع"
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
                  className="h-12 flex-grow xs:!h-10"
                  selectedOptions={documentType}
                  setSelectedOptions={setDocumentType}
                  disabled={!type.includes("document")}
                />
              </div>
              <div className="flex flex-grow flex-col gap-2">
                <Typography className="form_label">تگ‌ها</Typography>

                {!tagOptions.length && currentPath !== "/admin/sharedDocuments" ? (
                  <SelectAtom
                    options={[{ label: "تگی وجود ندارد", value: "none" }]}
                    className="h-12 !w-full justify-between border-[2px] border-normal bg-white pl-1 pr-2 xs:!h-10"
                    setSelectedOption={setSearchType}
                    defaultOption={{ label: "تگ‌ها", value: "none" }}
                    selectedOption={{ label: "تگی وجود ندارد", value: "none" }}
                  />
                ) : (
                  <SelectBox
                    options={tagOptions}
                    className="h-12 flex-grow xs:!h-10"
                    selectedOptions={tags}
                    setSelectedOptions={setTags}
                    defaultOption="تگ‌ها"
                    disabled={
                      (!type.includes("document") &&
                        !(searchType.value as string).includes("currentRepo")) ||
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
                    { label: "نشان شده", value: "bookmarked" },
                  ]}
                  className="h-12 flex-grow xs:!h-10"
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
                className="col-span-1 !h-10 !w-full bg-primary-normal !px-4 hover:bg-primary-normal active:bg-primary-normal sm:col-start-2 sm:!w-auto md:col-start-2 lg:col-start-3 xl:col-start-7"
                onClick={handleFilter}
              >
                <Typography className="text__label__button text-white">اعمال فیلتر</Typography>
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilter;
