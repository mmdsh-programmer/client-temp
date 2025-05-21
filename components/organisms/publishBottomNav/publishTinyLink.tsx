import { Button, Spinner } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import { ShareIcon } from "@components/atoms/icons";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import useCreateTinyLink from "@hooks/tinyLink/useCreateTinyLink";

const PublishTinyLink = () => {
  const createTinyLinkHook = useCreateTinyLink();
  const [shortLink, setShortLink] = useState<string | null>(null);

  const handleCopyLink = () => {
    if (shortLink) {
      copy(shortLink);
      toast.success("لینک مورد نظر با موفقیت کپی شد.");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      createTinyLinkHook.mutate({
        url: `${window.location.href}`,
        callBack: (result) => {
          setShortLink(
            `${process.env.NEXT_PUBLIC_TINY_BASE_URL}/${result.hash}`
          );
        },
      });
    }
  }, []);

  if (createTinyLinkHook.isPending) {
    return (
      <div className="flex items-center w-fit">
        <Spinner className="h-5 w-5" color="deep-purple" />
      </div>
    );
  }

  return (
    <Button
      className="w-fit min-w-fit p-3 border-none"
      onClick={handleCopyLink}
      variant="outlined"
    >
      <ShareIcon className="stroke-white w-6 h-6 block" />
    </Button>
  );
};

export default PublishTinyLink;
