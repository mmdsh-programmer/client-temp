import React, { useEffect } from "react";
import { Button, List, ListItem, Typography } from "@material-tailwind/react";
import { usePathname, useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { repoAtom, repoGroupingAtom } from "@atom/repository";
import { categoryAtom } from "@atom/category";
import { DocumentIcon } from "@components/atoms/icons";
import { selectedDocumentAtom } from "@atom/document";

const SidebarDocuments = () => {
  const router = useRouter();
  const pathname = usePathname();
  const setRepo = useSetRecoilState(repoAtom);
  const setRepoGroup = useSetRecoilState(repoGroupingAtom);
  const setCategory = useSetRecoilState(categoryAtom);
  const setDocument = useSetRecoilState(selectedDocumentAtom);

  const resetAtoms = () => {
    setRepo(null);
    setRepoGroup(null);
    setCategory(null);
    setDocument(null);
  };

  useEffect(() => {
    if (
      pathname === "/admin/myDocuments" ||
      pathname === "/admin/sharedDocuments"
    ) {
      resetAtoms();
    }
  }, [pathname]);

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
            text-secondary gap-1 px-3 h-[44px]
            active:bg-gray-100 active:!stroke-icon-active active:text-primary !stroke-icon-hover
            hover:bg-gray-100 hover:text-primary hover:!stroke-icon-active hover:!fill-icon-active`}
          onClick={() => {
            return router.push("/admin/myDocuments");
          }}
        >
          <DocumentIcon className="h-6 w-6 stroke-icon-hover" />
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
            text-secondary gap-1 px-3 h-[44px]
            active:bg-gray-100 active:!stroke-icon-active active:text-primary !stroke-icon-hover
            hover:bg-gray-100 hover:text-primary hover:!stroke-icon-active hover:!fill-icon-active`}
          onClick={() => {
            return router.push("/admin/sharedDocuments");
          }}
        >
          <DocumentIcon className="h-6 w-6 stroke-icon-hover" />
          <Typography placeholder="sidebar-text" className="title_t3">
            سندهای اشتراکی
          </Typography>
        </Button>
      </ListItem>
    </List>
  );
};

export default SidebarDocuments;
