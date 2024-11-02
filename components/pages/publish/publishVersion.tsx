"use client";

import { useEffect } from "react";
import { publishVersionAtom } from "@atom/publish";
import { useSetRecoilState } from "recoil";
import { IVersion } from "@interface/version.interface";

interface IProps {
  version: IVersion;
}

const PublishVersion = ({ version }: IProps) => {
  const setPublishVersion = useSetRecoilState(publishVersionAtom);

  useEffect(() => {
    setPublishVersion(version);

    return () => {
      setPublishVersion(null);
    };
  }, []);

  return null;
};

export default PublishVersion;
