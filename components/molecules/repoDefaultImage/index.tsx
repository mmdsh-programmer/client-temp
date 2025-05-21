import {
  RepoBlueIcon,
  RepoPurpleIcon,
  RepoRedIcon,
  RepoYellowIcon,
} from "@components/atoms/icons";

import ImageComponent from "@components/atoms/image";
import React from "react";
import { Spinner } from "@material-tailwind/react";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  imageHash?: string;
  className?: string;
}

const RepoDefaultImage = ({ imageHash, className }: IProps) => {
  const { data: getUserInfo, isFetching } = useGetUser();

  if (isFetching) {
    return <Spinner className="h-5 w-5" color="deep-purple" />;
  }

  if (!imageHash) {
    return <RepoYellowIcon className="w-full h-full" />;
  }

  const generateImage = () => {
    switch (imageHash) {
      case "red":
        return <RepoRedIcon className="repo-red-icon w-full h-full" />;
      case "blue":
        return <RepoBlueIcon className="repo-blue-icon w-full h-full" />;
      case "purple":
        return <RepoPurpleIcon className="repo-purple-icon w-full h-full" />;
      case "yellow":
        return <RepoYellowIcon className="repo-yellow-icon w-full h-full" />;
      default:
        return (
          <ImageComponent
            className={`repo-image object-cover max-h-full ${className}`}
            alt="repo-image"
            src={`${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${imageHash}?&checkUserGroupAccess=true&Authorization=${getUserInfo?.access_token}&time=${Date.now()})`}
          />
        );
    }
  };

  return generateImage();
};

export default RepoDefaultImage;
