import { IChildrenFilter, IReportFilter } from "@interface/app.interface";
import { logger } from "@utils/index";
import { atom } from "recoil";

export const filterChildren = atom<IChildrenFilter | null>({
  key: "filterChildren",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("filterChildren", newValue, oldValue);
      });
    },
  ],
});

export const filterReport = atom<IReportFilter | null>({
  key: "filterReport",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("filterReport", newValue, oldValue);
      });
    },
  ],
});
