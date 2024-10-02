import React from "react";
import { compareVersionAtom } from "@atom/version";
import { useRecoilValue } from "recoil";
import useGetVersion from "@hooks/version/useGetVersion";
import InfoDialog from "@components/templates/dialog/infoDialog";
import DiffViewerTable from "@components/organisms/version/diffViewerTable";
import { Spinner } from "@material-tailwind/react";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DiffVersionDialog = ({ setOpen }: IProps) => {
  const compareVersion = useRecoilValue(compareVersionAtom);

  const getVersionHook = useGetVersion(
    compareVersion?.version?.repo?.id ?? 0,
    compareVersion?.version?.document?.id ?? 0,
    compareVersion?.version?.data?.id ?? 0,
    compareVersion?.version?.data?.state,
    true
  );

  const getCompareHook = useGetVersion(
    compareVersion?.compare?.repo.id ?? 0,
    compareVersion?.compare?.document.id ?? 0,
    compareVersion?.compare?.data.id ?? 0,
    compareVersion?.compare?.data.state,
    true
  );

  return (
    <InfoDialog
      dialogHeader="مقایسه نسخه"
      setOpen={setOpen}
      className="!min-w-[80%] !min-h-[80%]"
    >
      {getVersionHook.isFetching || getCompareHook.isFetching ? (
        <Spinner className="h-10 w-10" color="deep-purple" />
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
