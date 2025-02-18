import React, { useRef, useEffect } from "react";
import { DownloadIcon, PrintIcon } from "@components/atoms/icons";
import { useReactToPrint } from "react-to-print";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import { editorDataAtom } from "@atom/editor";

const DownloadPDF = () => {
  const getVersionData = useRecoilValue(editorDataAtom);
  const contentRef = useRef<HTMLDivElement>();

  const handlePrint = useReactToPrint({
    bodyClass: "print-window",
    contentRef,
    onAfterPrint: () => {
      localStorage.setItem("CLASOR_PDF_FLAG", JSON.stringify(false));
      window.dispatchEvent(new Event("storage"));
    },
    pageStyle: "width:100%;height:auto;padding:25px;overflow-x:hidden;",
  });

  const setLocalStorage = () => {
    localStorage.setItem("CLASOR_PDF_FLAG", JSON.stringify(true));
    window.dispatchEvent(new Event("storage"));
    setTimeout(() => {
      handlePrint();
    });
  };

  useEffect(() => {
    const divEl = document.createElement("div");
    if (getVersionData) {
      divEl.innerHTML = getVersionData.content || "";
      contentRef.current = divEl;
    }
  }, [getVersionData]);

  return (
    <Menu>
      <MenuHandler>
        <Button className="bg-transparent p-0 mt-1">
          <DownloadIcon className="w-6 h-6 cursor-pointer" />
        </Button>
      </MenuHandler>
      <MenuList className="z-[999999] p-0">
        <MenuItem
        className="flex gap-2"
          onClick={() => {
            return setLocalStorage();
          }}
        >
          <PrintIcon className="w-5 h-5 stroke-blue-gray-400" />
          <Typography>دانلود به فرمت pdf</Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DownloadPDF;
