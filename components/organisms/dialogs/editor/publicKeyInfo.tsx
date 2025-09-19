import React, { useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { Spinner } from "@components/atoms/spinner";
import Error from "@components/organisms/error";
import { useEditorStore } from "@store/editor";
import useGetKey from "@hooks/repository/useGetKey";

interface IProps {
  repoId: number;
  publicKeyId?: number;
  children: React.JSX.Element;
}

const PublicKeyInfo = ({ children, repoId, publicKeyId }: IProps) => {
  const setPublicKey = useEditorStore((s) => {
    return s.setEditorPublicKey;
  });

  const {
    data: publicKeyInfo,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetKey(repoId, publicKeyId);

  useEffect(() => {
    if (isSuccess && publicKeyInfo.key) {
      setPublicKey(publicKeyInfo.key);
    }
  }, [publicKeyInfo]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Typography {...({} as React.ComponentProps<typeof Typography>)} className="ml-2 font-bold">
          لطفا صبر کنید
        </Typography>
        <Spinner className="h-5 w-5 text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <Error
        error={error}
        retry={() => {
          refetch();
        }}
      />
    );
  }

  return children;
};

export default PublicKeyInfo;
