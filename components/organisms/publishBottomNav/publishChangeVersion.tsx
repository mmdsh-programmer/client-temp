"use client";

import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Spinner,
} from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import { publishVersionAtom } from "@atom/publish";
import { ChevronLeftIcon } from "@components/atoms/icons";
import useGetPublishDocumentVersions from "@hooks/publish/useGetPublishDocumentVersions";
import { IVersion } from "@interface/version.interface";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
  repoId: number;
  documentId: number;
  selectedVersionId: number;
}

const PublishChangeVersion = ({
  repoId,
  documentId,
  selectedVersionId,
}: IProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const getPublishVersion = useRecoilValue(publishVersionAtom);

  const { data: publicVersions, isLoading } = useGetPublishDocumentVersions(
    repoId,
    documentId,
    30,
    true
  );

  const handleSelectVersion = (versionItem: IVersion) => {
    if (versionItem.id !== selectedVersionId) {
      const pathArray = pathname.split("/");

      if (pathArray[pathArray.length - 1].startsWith("v-")) {
        pathArray.pop();
        pathArray.pop();
      }
      pathArray.push(versionItem.versionNumber, `v-${versionItem.id}`);
      router.push(pathArray.join("/").replace(/\s+/g, "-").toLowerCase());
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center w-fit">
        <Spinner className="h-5 w-5" color="deep-purple" />
      </div>
    );
  }

  return (
    <Menu placement="top" open={openMenu} handler={setOpenMenu}>
      <MenuHandler>
        <Button className="flex py-2 text-sm justify-between bg-transparent border border-gray-400 text-primary font-light px-1.5 sm:px-2.5 w-20 sm:w-[180px]">
          <span className="text-ellipsis overflow-hidden whitespace-nowrap">
            {getPublishVersion?.versionNumber}
          </span>
          <ChevronLeftIcon
            className={`transition-all duration-150 stroke-gray-400 w-2.5 h-2.5 ${openMenu ? "-rotate-90" : "rotate-90"}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1.5 w-20 sm:w-[180px] min-w-[unset]">
        {publicVersions?.pages.map((publicVersionPage, index) => {
          return publicVersionPage.list.map((publishVersion) => {
            return (
              <MenuItem
                className={`text-ellipsis overflow-hidden whitespace-nowrap ${publishVersion.id === selectedVersionId ? "bg-blue-gray-50" : ""}`}
                // eslint-disable-next-line react/no-array-index-key
                key={`publish-version-${index}`}
                onClick={() => {
                  return handleSelectVersion(publishVersion);
                }}
                aria-selected
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
