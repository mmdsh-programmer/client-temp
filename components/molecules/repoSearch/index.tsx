import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { repoGroupingAtom, repoSearchParamAtom } from "@atom/repository";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ERepoGrouping } from "@interface/enums";
import InputAtom from "@components/atoms/input";
import { SearchIcon } from "@components/atoms/icons";

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
        className="flex flex-grow overflow-hidden gap-2 w-full items-center h-9 pr-3 pl-0 border-[1px] border-normal bg-primary rounded-lg "
        onKeyDown={(event) => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
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
          className="search-repo__input bg-white flex-grow !h-8 pr-0 outline-none !overflow-hidden border-none focus:border-none !w-full"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
          }}
          value={search}
        />
        <Button
          className="search-repo__button rounded-none h-[34px] px-4 bg-secondary hover:bg-secondary active:bg-secondary"
          onClick={() => {
            if (search.trim() !== "") {
              setSearchParam({ repoType, search });
            } else {
              setSearchParam({ repoType, search: undefined });
            }
          }}
        >
          <Typography className="text__label__button !text-[11px] text-white">
            اعمال
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default RepoSearch;
