import { IChildrenFilter, IReportFilter } from "@interface/app.interface";

import { atom } from "recoil";
import { logger } from "@utils/index";

export const filterChildrenAtom = atom<IChildrenFilter | null>({
  key: "filterChildrenAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("filterChildrenAtom", newValue, oldValue);
      });
    },
  ],
});

export const filterReportAtom = atom<IReportFilter | null>({
  key: "filterReportAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("filterReportAtom", newValue, oldValue);
      });
    },
  ],
});
