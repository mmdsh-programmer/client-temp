import { Alert, Typography } from "@material-tailwind/react";

import React from "react";
import { compareVersionAtom } from "@atom/version";
import { useRecoilState } from "recoil";

const DiffVersionAlert = () => {
  const [compareVersion, setCompareVersion] =
    useRecoilState(compareVersionAtom);

  return (
    <div className="fixed top-5 left-[10%] flex justify-center w-full z-[1000]">
      <Alert
        className=" shadow-lg w-auto "
        color="purple"
        open={!!compareVersion?.version}
        onClose={() => {
          return setCompareVersion(null);
        }}
      >
        <Typography>{`نسخه ${compareVersion?.version?.data.versionNumber} برای مقایسه انتخاب شده است`}</Typography>
      </Alert>
    </div>
  );
};

export default DiffVersionAlert;
