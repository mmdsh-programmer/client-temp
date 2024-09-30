import React, { useState } from "react";
import {
 filterChildrenAtom, filterReportAtom 
} from "@atom/filter";

import CategoryFilter from "../categoryFilter";
import { Radio } from "@material-tailwind/react";
import RepoFilter from "../repoFilter";
import { useSetRecoilState } from "recoil";

const AdvancedFilter = () => {
  const [type, setType] = useState<string>("");
  const setFilterChildren = useSetRecoilState(filterChildrenAtom);
  const setFilterReport = useSetRecoilState(filterReportAtom);

  return (
    <div className="flex flex-wrap h-full xs:h-auto justify-between bg-primary xs:bg-gray-50">
      <div className="flex flex-wrap gap-5 py-4 px-5 items-start">
        <Radio
          labelProps={{className: "text-[13px] truncate",}}
          containerProps={{className: "p-0 ml-2",}}
          className="radio !hover:shadow-none "
          color="deep-purple"
          name="type"
          label="جستجو در همین دسته‌بندی"
          crossOrigin=""
          onChange={() => {
            setType("category");
            setFilterReport(null);
          }}
          value="category"
          checked={type === "category"}
        />
        <Radio
          labelProps={{className: "text-[13px] truncate",}}
          containerProps={{className: "p-0 ml-2",}}
          className="!hover:shadow-none"
          color="deep-purple"
          name="type"
          label="جستجو در کل مخزن"
          crossOrigin=""
          value="repo"
          onChange={() => {
            setType("repo");
            setFilterChildren(null);
          }}
          checked={type === "repo"}
        />
      </div>
      {type === "category" ? (
        <CategoryFilter />
      ) : type === "repo" ? (
        <RepoFilter />
      ) : null}
    </div>
  );
};

export default AdvancedFilter;
