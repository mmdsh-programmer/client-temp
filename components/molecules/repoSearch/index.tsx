import React, { useState } from "react";
import { SearchIcon } from "@components/atoms/icons";
import InputAtom from "@components/atoms/input";
import SelectAtom from "@components/molecules/select";
import { ERepoGrouping } from "@interface/enums";
import { useRecoilState, useRecoilValue } from "recoil";
import { repoGroupingAtom, repoSearchParamAtom } from "@atom/repository";

const RepoSearch = () => {
  const getRepoGroup = useRecoilValue(repoGroupingAtom);
  const [getSearchParam, setSearchParam] = useRecoilState(repoSearchParamAtom);
  const [search, setSearch] = useState<string>("");
  const [repoType, setRepoType] = useState<ERepoGrouping>(
    getRepoGroup === ERepoGrouping.DASHBOARD
      ? ERepoGrouping.ALL_REPO
      : getRepoGroup ?? ERepoGrouping.ALL_REPO
  );

  const repoTypeOptions = () => {
    switch (getRepoGroup) {
      case ERepoGrouping.DASHBOARD:
        return [
          { value: ERepoGrouping.ALL_REPO, label: "همه‌ی مخزن‌ها" },
          { value: ERepoGrouping.MY_REPO, label: "مخزن‌های من" },
          { value: ERepoGrouping.ACCESS_REPO, label: "مخزن‌های اشتراکی" },
          { value: ERepoGrouping.BOOKMARK_REPO, label: "مخزن‌های نشان‌شده" },
          { value: ERepoGrouping.ARCHIVE_REPO, label: "مخزن‌های بایگانی" },
        ];
      case ERepoGrouping.MY_REPO:
        return [{ value: ERepoGrouping.MY_REPO, label: "مخزن‌های من" }];
      case ERepoGrouping.ACCESS_REPO:
        return [
          { value: ERepoGrouping.ACCESS_REPO, label: "مخزن‌های اشتراکی" },
        ];
      case ERepoGrouping.BOOKMARK_REPO:
        return [
          { value: ERepoGrouping.BOOKMARK_REPO, label: "مخزن‌های نشان‌شده" },
        ];
      case ERepoGrouping.ARCHIVE_REPO:
        return [
          { value: ERepoGrouping.ARCHIVE_REPO, label: "مخزن‌های بایگانی" },
        ];
    }
  };

  return (
    <div className="searchRepo hidden w-full xs:flex justify-between">
      <div
        className="flex flex-grow gap-2 w-full items-center h-9 px-3 border-[1px] border-normal bg-primary rounded-lg "
        onKeyDown={(event) => {
          if (event.code === "Enter") {
            event.preventDefault();
            if (search) {
              setSearchParam({ repoType, search });
            } else {
              setSearchParam({ repoType, search: undefined });
            }
          }
        }}
      >
        <SearchIcon className="h-5 w-5 stroke-icon-hover" />
        <InputAtom
          placeholder="جستجو ..."
          className="bg-white flex-grow !h-8 pr-0 outline-none !overflow-hidden border-none focus:border-none !w-full"
          onChange={(event: any) => {
            setSearch(event.target.value);
          }}
          value={search}
        />
        <SelectAtom
          className="w-[150px] flex items-center justify-between pr-3 pl-2 rounded-lg h-9 "
          defaultOption={getRepoGroup ? { value: getRepoGroup, label: getRepoGroup } : undefined}
          options={repoTypeOptions()}
          selectedOption={repoType ? { value: repoType, label: repoType } : undefined}
          setSelectedOption={(option) => setRepoType(option.value as ERepoGrouping)}
        />
      </div>
    </div>
  );
};

export default RepoSearch;
