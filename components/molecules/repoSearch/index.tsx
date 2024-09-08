import React, { useState } from "react";
import { SearchIcon } from "@components/atoms/icons";
import InputAtom from "@components/atoms/input";
import SelectAtom from "@components/molecules/select";
import { ERepoGrouping } from "@interface/enums";
import { useRecoilState } from "recoil";
import { repoSearchParamAtom } from "@atom/repository";

const RepoSearch = () => {
  const [getSearchParam, setSearchParam] = useRecoilState(repoSearchParamAtom);
  const [search, setSearch] = useState<string>("");
  const [repoType, setRepoType] = useState<ERepoGrouping>(
    ERepoGrouping.ALL_REPO
  );
  const repoTypeOptions = [
    { value: ERepoGrouping.ALL_REPO, label: "همه‌ی مخزن‌ها" },
    { value: ERepoGrouping.MY_REPO, label: "مخزن‌های من" },
    { value: ERepoGrouping.ACCESS_REPO, label: "مخزن‌های اشتراکی" },
    { value: ERepoGrouping.BOOKMARK_REPO, label: "مخزن‌های نشان‌شده" },
    { value: ERepoGrouping.ARCHIVE_REPO, label: "مخزن‌های بایگانی" },
  ];
  return (
    <div className="hidden w-full gap-4 py-5 xs:flex justify-between">
      <div
        className="flex flex-grow gap-2 w-[100px] max-w-[300px] ml-2 items-center h-9 px-3 border-[1px] border-normal bg-primary rounded-lg "
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
          className="bg-white !h-8 pr-0 outline-none !overflow-hidden border-none focus:border-none !w-auto"
          onChange={(event: any) => {
            setSearch(event.target.value);
          }}
          value={search}
        />
      </div>
      <div className="flex items-center justify-center">
        <SelectAtom
          className="w-[150px] flex items-center justify-between pr-3 pl-2 rounded-lg h-9 border-[1px] border-normal"
          defaultOption={getSearchParam?.repoType}
          options={repoTypeOptions}
          selectedOption={repoType}
          setSelectedOption={setRepoType}
        />
      </div>
    </div>
  );
};

export default RepoSearch;
