import React, { useState } from "react";
import {
 filterChildrenAtom,
 filterReportAtom
} from "@atom/filter";
import {
 useRecoilValue, useSetRecoilState 
} from "recoil";

import CategoryFilter from "../categoryFilter";
import { Radio } from "@material-tailwind/react";
import RepoFilter from "../repoFilter";
import { repoAtom } from "@atom/repository";

const AdvancedFilter = () => {
  const getRepo = useRecoilValue(repoAtom);
  const [type, setType] = useState<string>("");
  const setFilterChildren = useSetRecoilState(filterChildrenAtom);
  const setFilterReport = useSetRecoilState(filterReportAtom);

  const renderFilter = () => {
    if (type === "category") {
      return <CategoryFilter />;
    } if (type === "repo" && getRepo) {
      return <RepoFilter repoId={getRepo.id} />;
    } 
      return null;
    
  };

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
      {renderFilter()}
    </div>
  );
};

export default AdvancedFilter;
