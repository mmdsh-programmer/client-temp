"use client";

import React from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { ShareIcon } from "@components/atoms/icons";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import useCreateTinyLink from "@hooks/tinyLink/useCreateTinyLink";

const PublishTinyLink = () => {
  const createTinyLinkHook = useCreateTinyLink();

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      createTinyLinkHook.mutate({
        url: `${window.location.href}`,
        callBack: (result) => {
          toast.success("لینک مورد نظر با موفقیت کپی شد.");
          copy(`${process.env.NEXT_PUBLIC_TINY_BASE_URL}/${result.hash}`);
        },
      });
    }
  };

  if (createTinyLinkHook.isPending) {
    return (
      <div className="flex w-fit items-center">
        <Spinner
          {...({} as React.ComponentProps<typeof Spinner>)}
          className="h-5 w-5 text-primary"
        />
      </div>
    );
  }

  return (
    <Button
      {...({} as React.ComponentProps<typeof Button>)}
      className="w-fit min-w-fit border-none p-1.5"
      onClick={handleCopyLink}
      variant="outlined"
    >
      <ShareIcon className="block h-5 w-5 stroke-white" />
    </Button>
  );
};

export default PublishTinyLink;
