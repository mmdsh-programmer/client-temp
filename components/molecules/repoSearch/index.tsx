import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { ERepoGrouping } from "@interface/enums";
import InputAtom from "@components/atoms/input";
import { SearchIcon } from "@components/atoms/icons";
import { useRepositoryStore } from "@store/repository";
import { useRepoSearchParamStore } from "@store/repoSearchParam";

const RepoSearch = () => {
  const { repoGrouping } = useRepositoryStore();
  const { setRepoSearchParam } = useRepoSearchParamStore();

  const [search, setSearch] = useState<string>("");
  const repoType =
    repoGrouping === ERepoGrouping.DASHBOARD
      ? ERepoGrouping.ALL_REPO
      : (repoGrouping ?? ERepoGrouping.ALL_REPO);

  return (
    <div className="searchRepo hidden w-full justify-between xs:flex">
      <div
        className="flex h-9 w-full flex-grow items-center gap-2 overflow-hidden rounded-lg border-[1px] border-normal bg-white pl-0 pr-3"
        onKeyDown={(event) => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();
            if (search) {
              setRepoSearchParam({ repoType, search });
            } else {
              setRepoSearchParam({ repoType, search: undefined });
            }
          }
        }}
      >
        <SearchIcon className="h-5 w-5 stroke-icon-hover" />
        <InputAtom
          placeholder="جستجو ..."
          className="search-repo__input !h-8 !w-full flex-grow !overflow-hidden border-none bg-white pr-0 outline-none focus:border-none"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
          }}
          value={search}
        />
        <Button
          className="search-repo__button h-[34px] rounded-none bg-primary-normal px-4 hover:bg-primary-normal active:bg-primary-normal"
          onClick={() => {
            if (search.trim() !== "") {
              setRepoSearchParam({ repoType, search });
            } else {
              setRepoSearchParam({ repoType, search: undefined });
            }
          }}
        >
          <Typography className="text__label__button !text-[11px] text-white">اعمال</Typography>
        </Button>
      </div>
    </div>
  );
};

export default RepoSearch;
