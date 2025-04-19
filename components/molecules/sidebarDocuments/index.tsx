import { Button, List, ListItem, Typography } from "@material-tailwind/react";
import { MyDocumentsIcon, SharedDocumentsIcon } from "@components/atoms/icons";
import React, { useEffect, useState } from "react";
import { repoAtom, repoGroupingAtom } from "@atom/repository";
import { usePathname, useRouter } from "next/navigation";

import { categoryAtom } from "@atom/category";
import { selectedDocumentAtom } from "@atom/document";
import { useSetRecoilState } from "recoil";

const SidebarDocuments = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const setRepo = useSetRecoilState(repoAtom);
  const setRepoGroup = useSetRecoilState(repoGroupingAtom);
  const setCategory = useSetRecoilState(categoryAtom);
  const setDocument = useSetRecoilState(selectedDocumentAtom);
  const [isNavigating, setIsNavigating] = useState(false);
  const [documentType, setDocumentType] = useState("");

  const handleNavigation = async (path: string) => {
    if (isNavigating) return;

    setIsNavigating(true);
    router.push(path);
  };

  useEffect(() => {
    if (
      isNavigating &&
      (currentPath === "/admin/myDocuments" ||
        currentPath === "/admin/sharedDocuments")
    ) {
      setRepo(null);
      setRepoGroup(null);
      setCategory(null);
      setDocument(null);
      setIsNavigating(false);
    }
  }, [currentPath, isNavigating, setRepo]);

  return (
    <List placeholder="sidebar-list" className="min-w-[200px] p-0 gap-1">
      <ListItem
        key="سندهای من"
        placeholder="sidebar-item"
        className="p-0 myDocuments"
      >
        <Button
          placeholder="sidebar-button"
          className={`bg-transparent justify-start w-full 
            text-link gap-1 px-3 h-[44px]
             ${documentType === "سندهای من" ? "bg-gray-100 !stroke-icon-active hover:!fill-icon-active text-primary_normal" : "!stroke-icon-hover"}
            active:bg-gray-100 active:!stroke-icon-active active:text-primary_normal !stroke-icon-hover
            hover:bg-gray-100 hover:text-primary_normal hover:!stroke-icon-active hover:!fill-icon-active`}
          onClick={() => {
            setDocumentType("سندهای من");
            return handleNavigation("/admin/myDocuments");
          }}
        >
          <MyDocumentsIcon className="h-6 w-6 stroke-icon-hover" />
          <Typography placeholder="sidebar-text" className="title_t3">
            سندهای من
          </Typography>
        </Button>
      </ListItem>
      <ListItem
        key="سندهای اشتراکی"
        placeholder="sidebar-item"
        className="p-0 sharedDocuments"
      >
        <Button
          placeholder="sidebar-button"
          className={`bg-transparent justify-start w-full 
            text-link gap-1 px-3 h-[44px]
             ${documentType === "سندهای اشتراکی" ? "bg-gray-100 !stroke-icon-active hover:!fill-icon-active text-primary_normal" : "!stroke-icon-hover"}
            active:bg-gray-100 active:!stroke-icon-active active:text-primary_normal !stroke-icon-hover
            hover:bg-gray-100 hover:text-primary_normal hover:!stroke-icon-active hover:!fill-icon-active`}
          onClick={() => {
            setDocumentType("سندهای اشتراکی");

            return handleNavigation("/admin/sharedDocuments");
          }}
        >
          <SharedDocumentsIcon className="h-6 w-6 stroke-icon-hover" />
          <Typography placeholder="sidebar-text" className="title_t3">
            سندهای اشتراکی
          </Typography>
        </Button>
      </ListItem>
    </List>
  );
};

export default SidebarDocuments;
