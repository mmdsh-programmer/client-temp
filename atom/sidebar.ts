import { atom } from "recoil";
import { logEffect } from "@utils/index";

// Enum for different sections in the sidebar
export enum ESidebarSection {
  DASHBOARD = "داشبورد",
  MY_DOCUMENTS = "سندهای من",
  SHARED_DOCUMENTS = "سندهای اشتراکی",
  REPOSITORY_MANAGEMENT = "مدیریت مخزن‌ها",
  DOMAIN_MANAGEMENT = "مدیریت دامنه",
  BRANCH_MANAGEMENT = "مدیریت سازمانی"
}

// Atom to track the currently selected sidebar section
export const sidebarSectionAtom = atom<ESidebarSection | null>({
  key: "sidebarSectionAtom",
  default: ESidebarSection.DASHBOARD,
  effects: [logEffect("sidebarSectionAtom")],
}); 