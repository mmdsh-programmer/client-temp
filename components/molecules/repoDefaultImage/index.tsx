import {
  RepoBlueIcon,
  RepoPurpleIcon,
  RepoRedIcon,
  RepoYellowIcon,
} from "@components/atoms/icons";
import ImageComponent from "@components/atoms/image";
import React from "react";
import useGetUser from "@hooks/auth/useGetUser";
import { Spinner } from "@components/atoms/spinner";

interface IProps {
  imageHash?: string;
  className?: string;
}

const RepoDefaultImage = ({ imageHash, className }: IProps) => {
  const { data: getUserInfo, isFetching } = useGetUser();

  if (isFetching) {
    return <Spinner className="h-5 w-5 text-primary" />;
  }

  if (!imageHash) {
    return <RepoYellowIcon className={`repo-yellow-icon w-full h-full ${className}`} />;
  }

  const generateImage = () => {
    switch (imageHash) {
      case "red":
        return <RepoRedIcon className={`repo-red-icon w-full h-full ${className}`} />;
      case "blue":
        return <RepoBlueIcon className={`repo-blue-icon w-full h-full ${className}`} />;
      case "purple":
        return <RepoPurpleIcon className={`repo-purple-icon w-full h-full ${className}`} />;
      case "yellow":
        return <RepoYellowIcon className={`repo-yellow-icon w-full h-full ${className}`} />;
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
