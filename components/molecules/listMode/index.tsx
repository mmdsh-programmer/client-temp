import { CardIcon, MoreLineIcon } from "@components/atoms/icons";

import { Button } from "@material-tailwind/react";
import { EListMode } from "@interface/enums";
import React from "react";
import { listModeAtom } from "@atom/app";
import { useRecoilState } from "recoil";

const ListMode: React.FC  = () => {
  const [getListMode, setListMode] = useRecoilState(listModeAtom);
  return (
    <>
      <Button
        className={`rounded-lg p-1 flex justify-center items-center h-9 w-9
    ${getListMode === EListMode.table ? "bg-white !shadow-lg" : "bg-transparent"}`}
        onClick={() => {
          setListMode(EListMode.table);
        }}
      >
        <MoreLineIcon className="h-4 w-4" />
      </Button>
      <Button
        className={`rounded-lg p-1  flex justify-center items-center h-9 w-9
    ${getListMode === EListMode.card ? "bg-white !shadow-lg" : "bg-transparent"}`}
        onClick={() => {
          setListMode(EListMode.card);
        }}
      >
        <CardIcon className="h-4 w-4" />
      </Button>
    </>
  );
};

export default ListMode;
