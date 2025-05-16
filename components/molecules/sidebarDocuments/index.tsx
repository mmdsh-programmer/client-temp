import { Button, List, ListItem, Typography } from "@material-tailwind/react";
import { MyDocumentsIcon, SharedDocumentsIcon } from "@components/atoms/icons";
import React, { useEffect, useState } from "react";
import { repoAtom, repoGroupingAtom } from "@atom/repository";
import { usePathname, useRouter } from "next/navigation";

import { categoryAtom } from "@atom/category";
import { ESidebarSection, sidebarSectionAtom } from "@atom/sidebar";
import { selectedDocumentAtom } from "@atom/document";
import { useRecoilState, useSetRecoilState } from "recoil";

const SidebarDocuments = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const setRepo = useSetRecoilState(repoAtom);
  const setRepoGroup = useSetRecoilState(repoGroupingAtom);
  const setCategory = useSetRecoilState(categoryAtom);
  const setDocument = useSetRecoilState(selectedDocumentAtom);
  const [sidebarSection, setSidebarSection] = useRecoilState(sidebarSectionAtom);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = async (path: string, section: ESidebarSection) => {
    if (isNavigating) return;

    setSidebarSection(section);
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
  }, [currentPath, isNavigating, setRepo, setRepoGroup, setCategory, setDocument]);

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
             ${sidebarSection === ESidebarSection.MY_DOCUMENTS ? "bg-gray-100 !stroke-icon-active hover:!fill-icon-active text-primary_normal" : "!stroke-icon-hover"}
            active:bg-gray-100 active:!stroke-icon-active active:text-primary_normal !stroke-icon-hover
            hover:bg-gray-100 hover:text-primary_normal hover:!stroke-icon-active hover:!fill-icon-active`}
          onClick={() => {
            return handleNavigation("/admin/myDocuments", ESidebarSection.MY_DOCUMENTS);
          }}
        >
          <MyDocumentsIcon className="h-6 w-6 stroke-icon-hover" />
          <Typography placeholder="sidebar-text" className="title_t3">
            {ESidebarSection.MY_DOCUMENTS}
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
             ${sidebarSection === ESidebarSection.SHARED_DOCUMENTS ? "bg-gray-100 !stroke-icon-active hover:!fill-icon-active text-primary_normal" : "!stroke-icon-hover"}
            active:bg-gray-100 active:!stroke-icon-active active:text-primary_normal !stroke-icon-hover
            hover:bg-gray-100 hover:text-primary_normal hover:!stroke-icon-active hover:!fill-icon-active`}
          onClick={() => {
            return handleNavigation("/admin/sharedDocuments", ESidebarSection.SHARED_DOCUMENTS);
          }}
        >
          <SharedDocumentsIcon className="h-6 w-6 stroke-icon-hover" />
          <Typography placeholder="sidebar-text" className="title_t3">
            {ESidebarSection.SHARED_DOCUMENTS}
          </Typography>
        </Button>
      </ListItem>
    </List>
  );
};

export default SidebarDocuments;
