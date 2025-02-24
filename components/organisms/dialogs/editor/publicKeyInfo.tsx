import React, { useEffect } from "react";
import useGetKey from "@hooks/repository/useGetKey";
import { Spinner, Typography } from "@material-tailwind/react";
import { useSetRecoilState } from "recoil";
import { editorPublicKeyAtom } from "@atom/editor";
import Error from "@components/organisms/error";

interface IProps {
  repoId: number;
  publicKeyId?: number;
  children: JSX.Element;
}

const PublicKeyInfo = ({ children, repoId, publicKeyId }: IProps) => {
  const setPublicKey = useSetRecoilState(editorPublicKeyAtom);

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
      <div className="w-full h-full flex items-center justify-center">
        <Typography className="font-bold ml-2">لطفا صبر کنید</Typography>
        <Spinner className="h-5 w-5 " color="deep-purple" />
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
