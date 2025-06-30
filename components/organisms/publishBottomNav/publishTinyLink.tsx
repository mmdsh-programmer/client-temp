"use client";

import { Button, Spinner } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import { ShareIcon } from "@components/atoms/icons";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import useCreateTinyLink from "@hooks/tinyLink/useCreateTinyLink";
import { useDebouncedCallback } from "use-debounce";

const PublishTinyLink = () => {
  const createTinyLinkHook = useCreateTinyLink();
  const [shortLink, setShortLink] = useState<string | null>(null);

  const handleCopyLink = () => {
    if (shortLink) {
      copy(shortLink);
      toast.success("لینک مورد نظر با موفقیت کپی شد.");
    }
  };

  const createTinyLink = useDebouncedCallback(() => {
    createTinyLinkHook.mutate({
      url: `${window.location.href}`,
      callBack: (result) => {
        setShortLink(`${process.env.NEXT_PUBLIC_TINY_BASE_URL}/${result.hash}`);
      },
    });
  }, 100);

  useEffect(() => {
    if (typeof window !== "undefined") {
      createTinyLink();
    }
  }, []);

  if (createTinyLinkHook.isPending) {
    return (
      <div className="flex w-fit items-center">
        <Spinner className="h-5 w-5 text-primary" />
      </div>
    );
  }

  return (
    <Button className="w-fit min-w-fit border-none p-3" onClick={handleCopyLink} variant="outlined">
      <ShareIcon className="block h-6 w-6 stroke-white" />
    </Button>
  );
};

export default PublishTinyLink;
