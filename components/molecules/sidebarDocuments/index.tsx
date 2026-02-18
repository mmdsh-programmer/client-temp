import React, { useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import { MyDocumentsIcon, SharedDocumentsIcon } from "@components/atoms/icons";
import { usePathname, useRouter } from "next/navigation";
import { ESidebarSection, useSidebarStore } from "@store/sidebar";
import { useRepositoryStore } from "@store/repository";
import { useCategoryStore } from "@store/category";
import { useDocumentStore } from "@store/document";
import { cn } from "@utils/cn";

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
    <ul className="min-w-[200px] flex flex-col gap-1 p-0 m-0 list-none">
      <li key="سندهای من" className="myDocuments p-0">
        <Button
          variant="ghost"
          className={cn(
            "h-[44px] w-full justify-start gap-1 bg-transparent px-3 text-link",
            sidebarSection === ESidebarSection.MY_DOCUMENTS
              ? "bg-gray-100 [&_svg]:stroke-icon-active text-primary_normal hover:[&_svg]:fill-icon-active"
              : "[&_svg]:stroke-icon-hover",
            "hover:bg-gray-100 hover:[&_svg]:fill-icon-active hover:[&_svg]:stroke-icon-active hover:text-primary_normal active:bg-gray-100 active:[&_svg]:stroke-icon-active active:text-primary_normal shadow-none hover:shadow-none"
          )}
          onClick={() => {
            return handleNavigation("/admin/myDocuments", ESidebarSection.MY_DOCUMENTS);
          }}
        >
          <MyDocumentsIcon className="h-6 w-6 stroke-icon-hover" />
          <span className="title_t3">
            {ESidebarSection.MY_DOCUMENTS}
          </span>
        </Button>
      </li>
      <li key="سندهای اشتراکی" className="sharedDocuments p-0">
        <Button
          variant="ghost"
          className={cn(
            "h-[44px] w-full justify-start gap-1 bg-transparent px-3 text-link",
            sidebarSection === ESidebarSection.SHARED_DOCUMENTS
              ? "bg-gray-100 [&_svg]:stroke-icon-active text-primary_normal hover:[&_svg]:fill-icon-active"
              : "[&_svg]:stroke-icon-hover",
            "hover:bg-gray-100 hover:[&_svg]:fill-icon-active hover:[&_svg]:stroke-icon-active hover:text-primary_normal active:bg-gray-100 active:[&_svg]:stroke-icon-active active:text-primary_normal shadow-none hover:shadow-none"
          )}
          onClick={() => {
            return handleNavigation("/admin/sharedDocuments", ESidebarSection.SHARED_DOCUMENTS);
          }}
        >
          <SharedDocumentsIcon className="h-6 w-6 stroke-icon-hover" />
          <span className="title_t3">
            {ESidebarSection.SHARED_DOCUMENTS}
          </span>
        </Button>
      </li>
    </ul>
  );
};

export default SidebarDocuments;