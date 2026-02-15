import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useGetUser from "@hooks/auth/useGetUser";
import useGetDomainTags from "@hooks/domainTags/useGetDomainTags";
import SelectBox from "@components/molecules/selectBox";
import PublishAdvancedSearchResult from "@components/organisms/publishSearch/publishAdvancedSearchResult";
import { publishSearchContentSchema } from "@components/organisms/publishSearch/validation.yup";
import { Spinner } from "@components/ui/spinner";
import { SearchIcon } from "@components/atoms/icons";
import SelectAtom, { IOption } from "@components/molecules/select";
import { cn } from "@/utils/cn";

export interface ISearchSortParams {
  createdAt?: "asc" | "desc";
  updatedAt?: "asc" | "desc";
  creatorSSOID?: "asc" | "desc";
  repoId?: "asc" | "desc";
}

interface IForm {
  searchText: string;
  creatorName?: string;
}

const sortOptions: IOption[] = [
  { label: "تاریخ ایجاد", value: "createdAt" },
  { label: "تاریخ ویرایش", value: "updatedAt" },
  { label: "نام سازنده", value: "creatorSSOID" },
  { label: "مخزن", value: "repoId" },
];

const inputClassName =
  "flex h-8 min-w-0 min-h-full max-w-full items-center gap-2 border border-normal bg-gray-50 py-0 pl-2 pr-3 text-right font-iranYekan text-[11px] font-normal text-primary_normal placeholder:font-iranYekan placeholder:text-[11px] placeholder:text-placeholder placeholder:opacity-100 focus:border-normal focus:font-iranYekan";

const PublishAdvancedSearch = () => {
  const [showResult, setShowResult] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [creatorName, setCreatorName] = useState<string | undefined>();
  const [tags, setTags] = useState<number[]>([]);

  const [selectedSort, setSelectedSort] = useState<IOption>(sortOptions[0]);

  const [sortParams, setSortParams] = useState<ISearchSortParams>({
    createdAt: "desc",
  });

  const { data: userInfo } = useGetUser();
  const { data: tagList, isLoading } = useGetDomainTags(30, !!userInfo?.domainConfig.useDomainTag);

  const tagOptions =
    tagList?.pages[0].list.map((tag) => {
      return { label: tag.name, value: tag.id };
    }) || [];

  const form = useForm<IForm>({
    mode: "onChange",
    resolver: yupResolver(publishSearchContentSchema),
  });

  const onSubmit = (formData: IForm) => {
    setSearchText(formData.searchText);
    setCreatorName(formData.creatorName);
    setShowResult(true);
  };

  const handleSortChange = (option: IOption) => {
    setSelectedSort(option);
    const newSortParams: ISearchSortParams = {};

    switch (option.value) {
      case "createdAt":
        newSortParams.createdAt = "desc";
        break;
      case "updatedAt":
        newSortParams.updatedAt = "desc";
        break;
      case "creatorSSOID":
        newSortParams.creatorSSOID = "asc";
        break;
      case "repoId":
        newSortParams.repoId = "asc";
        break;
      default:
        newSortParams.createdAt = "desc";
    }

    setSortParams(newSortParams);
  };

  return (
    <div className="flex h-full w-full flex-wrap justify-between xs:h-auto">
      <div className="flex w-full flex-wrap items-start gap-5 py-4">
        <Form {...form}>
          <form
            className="flex w-full flex-col items-start gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex justify-end gap-2">
              <Label className="label flex items-center">مرتب سازی:</Label>
              <div className="flex">
                <SelectAtom
                  className="flex !h-full !w-[120px] !min-w-full !max-w-full items-center gap-2 border-[1px] !border-none !border-normal !bg-gray-50 !py-2 pl-2 pr-3 text-right !font-iranYekan !text-[11px] font-normal text-primary_normal placeholder:font-iranYekan placeholder:text-[11px] placeholder:!text-placeholder placeholder:!opacity-100 focus:!border-normal focus:font-iranYekan"
                  defaultOption={sortOptions[0]}
                  options={sortOptions}
                  selectedOption={selectedSort}
                  setSelectedOption={handleSortChange}
                />
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FormField
                control={form.control}
                name="searchText"
                render={({ field }) => {
                  return (
                    <FormItem
                      className={cn(
                        "flex flex-col",
                        userInfo?.domainConfig.useDomainTag ? "max-w-[150px]" : "flex-grow",
                      )}
                    >
                      <FormLabel className="label !text-[11px]">عنوان</FormLabel>
                      <FormControl>
                        <Input
                          className={cn(inputClassName)}
                          type="text"
                          placeholder="عنوان"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="warning_text" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="creatorName"
                render={({ field }) => {
                  return (
                    <FormItem
                      className={cn(
                        "flex flex-col",
                        userInfo?.domainConfig.useDomainTag ? "max-w-[150px]" : "flex-grow",
                      )}
                    >
                      <FormLabel className="label !text-[11px]">نام سازنده</FormLabel>
                      <FormControl>
                        <Input
                          className={cn(inputClassName)}
                          type="text"
                          placeholder="نام کاربری"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="warning_text" />
                    </FormItem>
                  );
                }}
              />
              {userInfo && userInfo.domainConfig.useDomainTag ? (
                <div className="flex flex-grow flex-col gap-1">
                  <Label className="label !text-[11px]">انتخاب تگ</Label>
                  {isLoading ? (
                    <div className="flex h-8 flex-grow items-center justify-start">
                      <Spinner className="size-6" />
                    </div>
                  ) : tagList?.pages[0].total ? (
                    <SelectBox
                      options={tagOptions}
                      className="!h-8 !bg-gray-50 !text-[11px]"
                      selectedOptions={tags}
                      setSelectedOptions={(opts) => {
                        setTags(
                          opts.filter((o): o is number => {
                            return typeof o === "number";
                          }),
                        );
                      }}
                      defaultOption="تگ‌ها"
                    />
                  ) : (
                    <SelectAtom
                      options={[{ label: "تگی وجود ندارد", value: "none" }]}
                      className="h-8 !w-full justify-between border-[2px] border-normal bg-white pl-1 pr-2 xs:!h-8"
                      setSelectedOption={() => {
                        setTags([]);
                      }}
                      defaultOption={{ label: "تگ‌ها", value: "none" }}
                      selectedOption={{
                        label: "تگی وجود ندارد",
                        value: "none",
                      }}
                    />
                  )}
                </div>
              ) : null}
              <div className="space-y-2 flex flex-col flex-grow">
                <Label className="label !text-[11px] invisible">تایید</Label>

                <Button
                  variant="outline"
                  size="icon"
                  type="submit"
                  disabled={!form.formState.isDirty || !form.formState.isValid}
                  className={cn("max-h-8 border-2 border-normal px-1 focus:border-normal")}
                >
                  <SearchIcon className="h-6 w-6 stroke-gray-600" />
                </Button>
              </div>
            </div>
          </form>
        </Form>
        {showResult ? (
          <PublishAdvancedSearchResult
            searchText={searchText}
            tags={tags}
            creatorName={creatorName}
            sortParams={sortParams}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PublishAdvancedSearch;
