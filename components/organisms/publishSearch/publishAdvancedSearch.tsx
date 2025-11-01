/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { publishSearchContentSchema } from "./validation.yup";
import { Button, Input, Typography } from "@material-tailwind/react";
import { SearchIcon } from "@components/atoms/icons";
import useGetUser from "@hooks/auth/useGetUser";
import useGetDomainTags from "@hooks/domainTags/useGetDomainTags";
import SelectBox from "@components/molecules/selectBox";
import PublishAdvancedSearchResult from "./publishAdvancedSearchResult";
import { Spinner } from "@components/atoms/spinner";
import SelectAtom from "@components/molecules/select";

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

const PublishAdvancedSearch = () => {
  const [showResult, setShowResult] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [creatorName, setCreatorName] = useState<string | undefined>();
  const [tags, setTags] = useState<number[]>([]);
  const [sortParams, setSortParams] = useState<ISearchSortParams>({
    createdAt: "asc",
    updatedAt: "asc",
    creatorSSOID: "asc",
    repoId: "asc",
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
  const { register, handleSubmit, formState } = form;
  const { isDirty, isValid, errors } = formState;

  const onSubmit = (formData: IForm) => {
    setSearchText(formData.searchText);
    setCreatorName(formData.creatorName);
    setShowResult(true);
  };

  return (
    <div className="flex h-full w-full flex-wrap justify-between xs:h-auto">
      <div className="flex w-full flex-wrap items-start gap-5 py-4">
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-end gap-6">
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="label">
              مرتب سازی براساس
            </Typography>
            <div className="flex gap-3">
              <Button
                {...({} as React.ComponentProps<typeof Button>)}
                className="label cursor-pointer bg-transparent !text-[11px] text-[#0369CD]"
                onClick={() => {
                  setSortParams({
                    ...sortParams,
                    repoId: sortParams.repoId === "asc" ? "desc" : "asc",
                  });
                }}
              >
                مخزن
              </Button>
              <Button
                {...({} as React.ComponentProps<typeof Button>)}
                className="label cursor-pointer bg-transparent !text-[11px] text-[#0369CD]"
                onClick={() => {
                  setSortParams({
                    ...sortParams,
                    creatorSSOID: sortParams.creatorSSOID === "asc" ? "desc" : "asc",
                  });
                }}
              >
                نام سازنده
              </Button>
              <Button
                {...({} as React.ComponentProps<typeof Button>)}
                className="label cursor-pointer bg-transparent !text-[11px] text-[#0369CD]"
                onClick={() => {
                  setSortParams({
                    ...sortParams,
                    createdAt: sortParams.createdAt === "asc" ? "desc" : "asc",
                  });
                }}
              >
                تاریخ ایجاد
              </Button>
              <Button
                {...({} as React.ComponentProps<typeof Button>)}
                className="label cursor-pointer bg-transparent !text-[11px] text-[#0369CD]"
                onClick={() => {
                  setSortParams({
                    ...sortParams,
                    updatedAt: sortParams.updatedAt === "asc" ? "desc" : "asc",
                  });
                }}
              >
                تاریخ ویرایش
              </Button>
            </div>
          </div>
          <div className="flex items-end gap-2">
            <div
              className={`flex max-w-[150px] flex-col gap-1 ${userInfo?.domainConfig.useDomainTag ? "" : "flex-grow"}`}
            >
              <Typography
                {...({} as React.ComponentProps<typeof Typography>)}
                className="label !text-[11px]"
              >
                عنوان
              </Typography>
              <Input
                labelProps={{ className: "before:content-none after:content-none" }}
                containerProps={{ className: "!min-w-0 !h-8" }}
                className="flex !h-full !min-w-full !max-w-full items-center gap-2 border-[1px] !border-none !border-normal !bg-gray-50 !py-0 pl-2 pr-3 text-right !font-iranYekan text-[11px] font-normal text-primary_normal placeholder:font-iranYekan placeholder:text-[11px] placeholder:!text-placeholder placeholder:!opacity-100 focus:!border-normal focus:font-iranYekan"
                {...({} as React.ComponentProps<typeof Input>)}
                type="text"
                id="document-name"
                placeholder="عنوان"
                {...register("searchText")}
              />
            </div>
            <div
              className={`flex max-w-[150px] flex-col gap-1 ${userInfo?.domainConfig.useDomainTag ? "" : "flex-grow"}`}
            >
              <Typography
                {...({} as React.ComponentProps<typeof Typography>)}
                className="label !text-[11px]"
              >
                نام سازنده
              </Typography>
              <Input
                labelProps={{ className: "before:content-none after:content-none" }}
                containerProps={{ className: "!min-w-0 !h-8" }}
                className="flex !h-full !min-w-full !max-w-full items-center gap-2 border-[1px] !border-none !border-normal !bg-gray-50 !py-0 pl-2 pr-3 text-right !font-iranYekan text-[11px] font-normal text-primary_normal placeholder:font-iranYekan placeholder:text-[11px] placeholder:!text-placeholder placeholder:!opacity-100 focus:!border-normal focus:font-iranYekan"
                {...({} as React.ComponentProps<typeof Input>)}
                type="text"
                id="creator-name"
                placeholder="نام کاربری"
                {...register("creatorName")}
              />
            </div>
            {userInfo?.domainConfig.useDomainTag ? (
              <div className="flex flex-grow flex-col gap-1">
                <Typography
                  {...({} as React.ComponentProps<typeof Typography>)}
                  className="label !text-[11px]"
                >
                  انتخاب تگ
                </Typography>
                {isLoading ? (
                  <div className="flex h-8 flex-grow items-center justify-start">
                    <Spinner className="h-6 w-6" />
                  </div>
                ) : tagList?.pages[0].total ? (
                  <SelectBox
                    options={tagOptions}
                    className="!h-8 !bg-gray-50 !text-[11px]"
                    selectedOptions={tags}
                    setSelectedOptions={setTags}
                    defaultOption="تگ‌ها"
                  />
                ) : (
                  <SelectAtom
                    options={[{ label: "تگی وجود ندارد", value: "none" }]}
                    className="h-8 !w-full justify-between border-[2px] border-normal bg-white pl-1 pr-2 xs:!h-8"
                    setSelectedOption={() => {
                      return setTags([]);
                    }}
                    defaultOption={{ label: "تگ‌ها", value: "none" }}
                    selectedOption={{ label: "تگی وجود ندارد", value: "none" }}
                  />
                )}
              </div>
            ) : null}
            <Button
              {...({} as React.ComponentProps<typeof Button>)}
              disabled={!isDirty || !isValid}
              className="max-h-8 border-2 !border-normal px-1 focus:!border-normal"
              variant="outlined"
              type="submit"
            >
              <SearchIcon className="h-6 w-6 stroke-gray-600" />
            </Button>
          </div>
          {errors.searchText ? (
            <Typography
              {...({} as React.ComponentProps<typeof Typography>)}
              className="warning_text"
            >
              {errors.searchText?.message}
            </Typography>
          ) : null}
        </form>
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
