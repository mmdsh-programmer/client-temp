"use client";

import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon } from "@components/atoms/icons";
import { IVersion } from "@interface/version.interface";
import { toPersianDigit } from "@utils/index";
import useGetDocumentPublishLink from "@hooks/document/useGetDocumentPublishLink";
import useGetPublishDocumentVersions from "@hooks/publish/useGetPublishDocumentVersions";
import { Spinner } from "@components/atoms/spinner";
import { usePublishStore } from "@store/publish";

interface IProps {
  repoId: number;
  documentId: number;
  selectedVersionId: number;
}

const PublishChangeVersion = ({ repoId, documentId, selectedVersionId }: IProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const search = useSearchParams();
  const [openMenu, setOpenMenu] = useState(false);
  const getPublishVersion = usePublishStore((state) => {
    return state.publishVersion;
  });
  const isSharePath = pathname?.startsWith("/share");

  const { data: publicVersions, isLoading } = useGetPublishDocumentVersions(
    repoId,
    documentId,
    30,
    !isSharePath,
  );

  const { data: publishedDocumentVersions, isLoading: isLoadingPublishedDocumentVersions } =
    useGetDocumentPublishLink(documentId, true, 30, !!isSharePath);

  const publishVersions = isSharePath ? publishedDocumentVersions : publicVersions;

  const handleSelectVersion = (versionItem: IVersion) => {
    if (pathname && versionItem.id !== selectedVersionId) {
      const ids = search.get("ids");
      const pathArray = pathname.split("/");

      if (pathArray[pathArray.length - 1].startsWith("v-")) {
        pathArray.pop();
        pathArray.pop();
      }
      pathArray.push(
        toPersianDigit(versionItem.versionNumber),
        toPersianDigit(`v-${versionItem.id}`),
      );
      router.push(`${pathArray.join("/").replace(/\s+/g, "-")}${ids?.length ? `?ids=${ids}` : ""}`);
    }
  };

  if (isLoading || isLoadingPublishedDocumentVersions) {
    return (
      <div className="flex w-fit items-center">
        <Spinner className="h-5 w-5 text-primary" />
      </div>
    );
  }

  return (
    <Menu {...({} as React.ComponentProps<typeof Menu>)} placement="top-end" open={openMenu} handler={setOpenMenu}>
      <MenuHandler {...({} as React.ComponentProps<typeof MenuHandler>)}>
        <Button {...({} as React.ComponentProps<typeof Button>)} className="flex w-32 flex-none justify-between gap-2.5 rounded-[100px] bg-white bg-opacity-15 px-3 leading-4">
          <span className="flex-none overflow-hidden text-ellipsis whitespace-nowrap text-sm text-white">
            {getPublishVersion?.versionNumber}
          </span>
          <ChevronLeftIcon
            className={`h-2.5 w-2.5 stroke-white transition-all duration-150 ${openMenu ? "-rotate-90" : "rotate-90"}`}
          />
        </Button>
      </MenuHandler>
      <MenuList {...({} as React.ComponentProps<typeof MenuList>)} className="w-32 border-none bg-[#222] p-1.5">
        {publishVersions?.pages.map((publicVersionPage, index) => {
          return publicVersionPage?.list.map((publishVersion) => {
            return (
              <MenuItem
                {...({} as React.ComponentProps<typeof MenuItem>)}
                className={`overflow-hidden text-ellipsis whitespace-nowrap text-white hover:!bg-white hover:!bg-opacity-15 hover:!text-white ${publishVersion.id === selectedVersionId ? "bg-white bg-opacity-15" : ""}`}
                // eslint-disable-next-line react/no-array-index-key
                key={`publish-version-${publishVersion.id}-${index}`}
                onClick={() => {
                  return handleSelectVersion(publishVersion);
                }}
              >
                {publishVersion.versionNumber}
              </MenuItem>
            );
          });
        })}
      </MenuList>
    </Menu>
  );
};

export default PublishChangeVersion;
