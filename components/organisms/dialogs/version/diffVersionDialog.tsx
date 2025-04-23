import { usePathname, useSearchParams } from "next/navigation";

import DiffViewerTable from "@components/organisms/version/diffViewerTable";
import InfoDialog from "@components/templates/dialog/infoDialog";
import React from "react";
import { Spinner } from "@material-tailwind/react";
import { compareVersionAtom } from "@atom/version";
import useGetVersion from "@hooks/version/useGetVersion";
import { useRecoilValue } from "recoil";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DiffVersionDialog = ({ setOpen }: IProps) => {
  const currentPath = usePathname();
  const compareVersion = useRecoilValue(compareVersionAtom);
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const getVersionHook = useGetVersion(
    compareVersion?.version?.repoId ?? 0,
    compareVersion?.version?.document?.id ?? 0,
    compareVersion?.version?.data?.id ?? 0,
    compareVersion?.version?.data?.state,
    true,
    true,
    sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
    true
  );

  const getCompareHook = useGetVersion(
    compareVersion?.compare?.repoId ?? 0,
    compareVersion?.compare?.document.id ?? 0,
    compareVersion?.compare?.data.id ?? 0,
    compareVersion?.compare?.data.state,
    true,
    true,
    sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
    true
  );

  return (
    <InfoDialog
      dialogHeader="مقایسه نسخه"
      setOpen={setOpen}
      className="version-compare-dialog !min-w-[80%] !h-full overflow-auto"
    >
      {getVersionHook.isFetching || getCompareHook.isFetching ? (
        <div className="flex w-full h-full justify-center items-center">
          <Spinner className="h-10 w-10" color="purple" />
        </div>
      ) : (
        <DiffViewerTable
          newValue={getCompareHook.data?.content || "_"}
          oldValue={getVersionHook.data?.content || "_"}
        />
      )}
    </InfoDialog>
  );
};

export default DiffVersionDialog;
