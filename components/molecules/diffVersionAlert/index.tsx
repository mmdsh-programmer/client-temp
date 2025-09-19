import React from "react";
import { Alert, Typography } from "@material-tailwind/react";
import { useVersionStore } from "@store/version";

const DiffVersionAlert = () => {
  const { compareVersion, setCompareVersion } = useVersionStore();

  return (
    <div className="fixed left-[10%] top-5 z-[1000] flex w-full justify-center">
      <Alert
        className="w-auto shadow-lg"
        color="deep-purple"
        open={!!compareVersion?.version}
        onClose={() => {
          return setCompareVersion(null);
        }}
        {...({} as  Omit<React.ComponentProps<typeof Alert>, "open" | "onClose">)}
      >
        <Typography
          placeholder=""
          {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
        >
          {`نسخه ${compareVersion?.version?.data.versionNumber} برای مقایسه انتخاب شده است`}
        </Typography>
      </Alert>
    </div>
  );
};

export default DiffVersionAlert;
