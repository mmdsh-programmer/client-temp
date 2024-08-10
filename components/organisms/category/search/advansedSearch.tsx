import React, { useState } from "react";
import { Radio } from "@material-tailwind/react";
import RepoFilter from "./repoFilter";
import CategoryFilter from "./categoryFilter";

const AdvancedSearch = () => {
  const [type, setType] = useState<string>("");

  return type === "category" ? (
    <CategoryFilter />
  ) : type === "repo" ? (
    <div>
      <RepoFilter />
    </div>
  ) : (
    <div className="flex flex-wrap justify-between mb-4">
      <div className="flex gap-5">
        <Radio
          labelProps={{
            className: "text-[13px]",
          }}
          className="radio !hover:shadow-none "
          color="deep-purple"
          name="type"
          label="جستجو در همین دسته‌بندی"
          crossOrigin=""
          onChange={() => setType("category")}
          value="category"
        />
        <Radio
          labelProps={{
            className: "text-[13px]",
          }}
          className="!hover:shadow-none"
          color="deep-purple"
          name="type"
          label="جستجو در کل مخزن"
          crossOrigin=""
          value="repo"
          onChange={() => setType("repo")}
        />
      </div>
      <div className="flex-grow max-w-full mr-5"></div>
    </div>
  );
};

export default AdvancedSearch;
