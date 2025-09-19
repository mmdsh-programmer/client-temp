import React, { useEffect, useState } from "react";
import { Button, List, ListItem, Typography } from "@material-tailwind/react";
import { MyDocumentsIcon, SharedDocumentsIcon } from "@components/atoms/icons";
import { usePathname, useRouter } from "next/navigation";
import { ESidebarSection, useSidebarStore } from "@store/sidebar";
import { useRepositoryStore } from "@store/repository";
import { useCategoryStore } from "@store/category";
import { useDocumentStore } from "@store/document";

const SidebarDocuments = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const { setRepo } = useRepositoryStore();
  const { setRepoGrouping } = useRepositoryStore();
  const { setCategory } = useCategoryStore();
  const { setSelectedDocument } = useDocumentStore();
  const { sidebarSection, setSidebarSection } = useSidebarStore();
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
      (currentPath === "/admin/myDocuments" || currentPath === "/admin/sharedDocuments")
    ) {
      setRepo(null);
      setRepoGrouping(null);
      setCategory(null);
      setSelectedDocument(null);
      setIsNavigating(false);
    }
  }, [currentPath, isNavigating, setRepo, setRepoGrouping, setCategory, setSelectedDocument]);

  return (
    <List placeholder="sidebar-list" className="min-w-[200px] gap-1 p-0" {...({} as  Omit<React.ComponentProps<typeof List>, "placeholder">)}>
      <ListItem key="سندهای من" placeholder="sidebar-item" className="myDocuments p-0" {...({} as  Omit<React.ComponentProps<typeof ListItem>, "placeholder">)}>
        <Button
          placeholder="sidebar-button"
          className={`h-[44px] w-full justify-start gap-1 bg-transparent px-3 text-link ${sidebarSection === ESidebarSection.MY_DOCUMENTS ? "bg-gray-100 !stroke-icon-active text-primary_normal hover:!fill-icon-active" : "!stroke-icon-hover"} !stroke-icon-hover hover:bg-gray-100 hover:!fill-icon-active hover:!stroke-icon-active hover:text-primary_normal active:bg-gray-100 active:!stroke-icon-active active:text-primary_normal`}
          onClick={() => {
            return handleNavigation("/admin/myDocuments", ESidebarSection.MY_DOCUMENTS);
          }}
          {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
        >
          <MyDocumentsIcon className="h-6 w-6 stroke-icon-hover" />
          <Typography placeholder="sidebar-text" className="title_t3" {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}>
            {ESidebarSection.MY_DOCUMENTS}
          </Typography>
        </Button>
      </ListItem>
      <ListItem key="سندهای اشتراکی" placeholder="sidebar-item" className="sharedDocuments p-0" {...({} as  Omit<React.ComponentProps<typeof ListItem>, "placeholder">)}>
        <Button
          placeholder="sidebar-button"
          className={`h-[44px] w-full justify-start gap-1 bg-transparent px-3 text-link ${sidebarSection === ESidebarSection.SHARED_DOCUMENTS ? "bg-gray-100 !stroke-icon-active text-primary_normal hover:!fill-icon-active" : "!stroke-icon-hover"} !stroke-icon-hover hover:bg-gray-100 hover:!fill-icon-active hover:!stroke-icon-active hover:text-primary_normal active:bg-gray-100 active:!stroke-icon-active active:text-primary_normal`}
          onClick={() => {
            return handleNavigation("/admin/sharedDocuments", ESidebarSection.SHARED_DOCUMENTS);
          }}
          {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
        >
          <SharedDocumentsIcon className="h-6 w-6 stroke-icon-hover" />
          <Typography placeholder="sidebar-text" className="title_t3" {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}>
            {ESidebarSection.SHARED_DOCUMENTS}
          </Typography>
        </Button>
      </ListItem>
    </List>
  );
};

export default SidebarDocuments;
