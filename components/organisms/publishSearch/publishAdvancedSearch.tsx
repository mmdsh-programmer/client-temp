/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { publishSearchContentSchema } from "./validation.yup";
import { Button, Typography } from "@material-tailwind/react";
import { SearchIcon } from "@components/atoms/icons";
import FormInput from "@components/atoms/input/formInput";
import useGetUser from "@hooks/auth/useGetUser";
import useGetDomainTags from "@hooks/domainTags/useGetDomainTags";
import SelectBox from "@components/molecules/selectBox";
import PublishAdvancedSearchResult from "./publishAdvancedSearchResult";
import { Spinner } from "@components/atoms/spinner";
import SelectAtom from "@components/molecules/select";
import Sort from "@components/molecules/sort";

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
        <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-end gap-2">
            <div
              className={`flex max-w-[150px] flex-col gap-2 ${userInfo?.domainConfig.useDomainTag ? "" : "flex-grow"}`}
            >
              <Typography {...({} as React.ComponentProps<typeof Typography>)} className="label">
                عنوان
              </Typography>
              <div className="flex items-center rounded-lg border-[1px] !border-normal !bg-gray-50 pl-2">
                <FormInput
                  className="!min-w-full !max-w-full !border-none !bg-transparent"
                  id="document-name"
                  placeholder="عنوان"
                  register={{ ...register("searchText") }}
                />
                <Sort
                  onClick={() => {
                    setSortParams({
                      ...sortParams,
                      createdAt: sortParams.createdAt === "asc" ? "desc" : "asc",
                    });
                  }}
                />
              </div>
            </div>
            <div
              className={`flex max-w-[150px] flex-col gap-2 ${userInfo?.domainConfig.useDomainTag ? "" : "flex-grow"}`}
            >
              <Typography {...({} as React.ComponentProps<typeof Typography>)} className="label">
                نام سازنده
              </Typography>
              <div className="flex items-center rounded-lg border-[1px] !border-normal !bg-gray-50 pl-2">
                <FormInput
                  className="!min-w-full !max-w-full !border-none !bg-transparent"
                  id="creator-name"
                  placeholder="نام کاربری"
                  register={{ ...register("creatorName") }}
                />
                <Sort
                  onClick={() => {
                    setSortParams({
                      ...sortParams,
                      creatorSSOID: sortParams.creatorSSOID === "asc" ? "desc" : "asc",
                    });
                  }}
                />
              </div>
            </div>
            {userInfo?.domainConfig.useDomainTag ? (
              <div className="flex flex-grow flex-col gap-2">
                <Typography {...({} as React.ComponentProps<typeof Typography>)} className="label">
                  انتخاب تگ
                </Typography>
                {isLoading ? (
                  <div className="flex h-12 flex-grow items-center justify-start">
                    <Spinner className="h-6 w-6" />
                  </div>
                ) : tagList?.pages[0].total ? (
                  <SelectBox
                    options={tagOptions}
                    className="!h-12 !bg-gray-50"
                    selectedOptions={tags}
                    setSelectedOptions={setTags}
                    defaultOption="تگ‌ها"
                  />
                ) : (
                  <SelectAtom
                    options={[{ label: "تگی وجود ندارد", value: "none" }]}
                    className="h-12 !w-full justify-between border-[2px] border-normal bg-white pl-1 pr-2 xs:!h-10"
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
              className="max-h-12 border-2 !border-normal px-3 focus:!border-normal"
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
