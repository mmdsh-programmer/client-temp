import React, { useState } from "react";
import { SearchIcon } from "@components/atoms/icons";
import InputAtom from "@components/atoms/input";
import { ERepoGrouping } from "@interface/enums";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { repoGroupingAtom, repoSearchParamAtom } from "@atom/repository";

const RepoSearch = () => {
  const getRepoGroup = useRecoilValue(repoGroupingAtom);
  const setSearchParam = useSetRecoilState(repoSearchParamAtom);
  const [search, setSearch] = useState<string>("");
  const repoType =
    getRepoGroup === ERepoGrouping.DASHBOARD
      ? ERepoGrouping.ALL_REPO
      : (getRepoGroup ?? ERepoGrouping.ALL_REPO);

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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
          }}
          value={search}
        />
      </div>
    </div>
  );
};

export default RepoSearch;
