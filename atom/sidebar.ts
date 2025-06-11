import { atom } from "recoil";
import { logEffect } from "@utils/index";

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

export const sidebarSectionAtom = atom<ESidebarSection | null>({
  key: "sidebarSectionAtom",
  default: ESidebarSection.DASHBOARD,
  effects: [logEffect("sidebarSectionAtom")],
});
