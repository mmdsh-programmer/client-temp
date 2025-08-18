import { create } from "zustand";

export enum ESidebarSection {
  MAIN = "منوی اصلی",
  DASHBOARD = "داشبورد",
  MY_DOCUMENTS = "سندهای من",
  SHARED_DOCUMENTS = "سندهای اشتراکی",
  REPOSITORY_MANAGEMENT = "مدیریت مخزن‌ها",
  MY_REPOS = "مخزن‌های من",
  SHARED_REPOS = "مخزن‌های اشتراکی",
  BOOKMARK_REPOS = "مخزن‌های نشان‌شده",
  PUBLISHED_REPOS = "مخزن های منتشر شده",
  ARCHIVE_REPOS = "‌‌مخزن‌های بایگانی‌شده",
  DOMAIN_MANAGEMENT = "مدیریت دامنه",
  BRANCH_MANAGEMENT = "مدیریت سازمانی",
  BRANCH_LIST = "لیست شعبات",
}

export enum ESidebarTab {
  MAIN = "main",
  DOCUMENT = "documents",
  REPOS = "repos",
  DOMAIN = "domain",
  BRANCH_LIST = "branchList",
}

interface SidebarState {
  sidebarSection: ESidebarSection | null;
  setSidebarSection: (section: ESidebarSection | null) => void;
}

export const useSidebarStore = create<SidebarState>((set) => {
  return {
    sidebarSection: null,
    setSidebarSection: (section) => {
      set({ sidebarSection: section });
    },
  };
});
