import React, { useState } from "react";
import { SearchIcon } from "@components/atoms/icons";
import InputAtom from "@components/atoms/input";

const SearchInput = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div
      className="flex gap-2 items-center h-10 px-3 border-[1px] border-normal bg-primary rounded-lg "
      onKeyDown={(event) => {
        if (event.code === "Enter") {
          event.preventDefault();
        }
      }}
    >
      <SearchIcon className="h-5 w-5 stroke-icon-hover" />
      <InputAtom
        placeholder="جستجو ..."
        className="bg-white flex-grow !h-8 pr-0 outline-none !overflow-hidden border-none focus:border-none !w-full"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        value={search}
      />
    </div>
  );
};

export default SearchInput;
