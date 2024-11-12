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
    <Menu placement="top-end" open={openMenu} handler={setOpenMenu}>
      <MenuHandler>
        <Button className="flex-none flex gap-2.5 px-3 bg-white bg-opacity-15 rounded-[100px] w-32 justify-between leading-4">
          <span className="flex-none text-ellipsis text-sm overflow-hidden whitespace-nowrap text-white">
            {getPublishVersion?.versionNumber}
          </span>
          <ChevronLeftIcon
            className={`transition-all duration-150 stroke-white w-2.5 h-2.5 ${openMenu ? "-rotate-90" : "rotate-90"}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="bg-[#222] border-none p-1.5 w-32">
        {publicVersions?.pages.map((publicVersionPage, index) => {
          return publicVersionPage.list.map((publishVersion) => {
            return (
              <MenuItem
                className={`text-ellipsis text-white hover:!bg-white hover:!bg-opacity-15 hover:!text-white overflow-hidden whitespace-nowrap ${publishVersion.id === selectedVersionId ? "bg-white bg-opacity-15" : ""}`}
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
