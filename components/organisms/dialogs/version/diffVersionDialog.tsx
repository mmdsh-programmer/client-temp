import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import DiffViewerTable from "@components/organisms/version/diffViewerTable";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { Spinner } from "@components/atoms/spinner";
import { compareVersionAtom } from "@atom/version";
import useGetVersion from "@hooks/version/useGetVersion";
import { useRecoilValue } from "recoil";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DiffVersionDialog = ({ setOpen }: IProps) => {
  const currentPath = usePathname();
  const compareVersion = useRecoilValue(compareVersionAtom);
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();

  const getVersionHook = useGetVersion(
    compareVersion?.version?.repoId ?? 0,
    compareVersion?.version?.document?.id ?? 0,
    compareVersion?.version?.data?.id ?? 0,
    compareVersion?.version?.data?.state,
    true,
    true,
    sharedDocuments === "true" ||
      currentPath === "/admin/sharedDocuments" ||
      (currentPath === "/admin/dashboard" &&
        userInfo?.repository.id !== compareVersion?.version?.repoId),

    true,
  );

  const getCompareHook = useGetVersion(
    compareVersion?.compare?.repoId ?? 0,
    compareVersion?.compare?.document.id ?? 0,
    compareVersion?.compare?.data.id ?? 0,
    compareVersion?.compare?.data.state,
    true,
    true,
    sharedDocuments === "true" ||
      currentPath === "/admin/sharedDocuments" ||
      (currentPath === "/admin/dashboard" &&
        userInfo?.repository.id !== compareVersion?.version?.repoId),

    true,
  );

  return (
    <InfoDialog
      dialogHeader="مقایسه نسخه"
      setOpen={setOpen}
      className="version-compare-dialog !h-full !min-w-[80%] overflow-auto"
    >
      {getVersionHook.isFetching || getCompareHook.isFetching ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-10 w-10 text-primary" />
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
