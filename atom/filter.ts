import { IChildrenFilter, IReportFilter } from "@interface/app.interface";

import { atom } from "recoil";
import { logEffect } from "@utils/index";

export const filterChildrenAtom = atom<IChildrenFilter | null>({
  key: "filterChildrenAtom",
  default: null,
  effects: [logEffect("filterChildrenAtom")],
});

export const filterReportAtom = atom<IReportFilter | null>({
  key: "filterReportAtom",
  default: null,
  effects: [logEffect("filterReportAtom")],
});
