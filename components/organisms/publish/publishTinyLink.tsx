"use client";

import React, { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { Button, Spinner } from "@material-tailwind/react";
import { CopyIcon } from "@components/atoms/icons";
import { toast } from "react-toastify";
import useCreateTinyLink from "@hooks/tinyLink/useCreateTinyLink";

const PublishTinyLink = () => {
  const createTinyLinkHook = useCreateTinyLink();
  const [inputValue, setInputValue] = useState("");

  const handleCopyLink = () => {
    copy(inputValue);
    toast.success("لینک مورد نظر با موفقیت کپی شد.");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      createTinyLinkHook.mutate({
        url: `${window.location.href}`,
        callBack: (result) => {
          setInputValue(
            `${process.env.NEXT_PUBLIC_TINY_BASE_URL}/${result.hash}`
          );
        },
      });
    }
  }, []);

  if (createTinyLinkHook.isPending) {
    return (
      <div className="flex items-center gap-4 bg-white border-t border-blue-gray-200 py-8 px-12">
        <div className="w-full flex justify-center pt-4">
          <Spinner className="h-6 w-6" color="deep-purple" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 bg-white border-t border-blue-gray-200 py-8 px-12">
      <div className="w-full max-w-sm">
        <div className="mb-2 flex justify-between items-center">
          <label
            htmlFor="website-url"
            className="text-sm font-medium text-gray-900 dark:text-white"
          >
            لینک کوتاه صفحه
          </label>
        </div>
        <div className="flex items-center">
          <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:text-white dark:border-gray-600">
            لینک
          </span>
          <div className="relative w-full">
            <input
              id="website-url"
              type="text"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-e-0 border-gray-300 text-gray-500 dark:text-gray-400 text-sm border-s-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={inputValue}
              readOnly
              disabled
            />
          </div>
          <Button
            onClick={handleCopyLink}
            className="flex-shrink-0 z-10 inline-flex items-center border border-gray-300 border-t py-3 px-4 text-sm font-medium text-center text-white bg-transparent rounded-l-lg rounded-r-none"
            type="button"
          >
            <CopyIcon className="w-4 h-4 fill-inherit" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublishTinyLink;
