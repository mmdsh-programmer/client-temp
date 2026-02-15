import React from "react";
import { RepoBlueIcon, RepoPurpleIcon, RepoRedIcon, RepoYellowIcon } from "@components/atoms/icons";
import useGetUser from "@hooks/auth/useGetUser";
import ImageComponent from "@components/atoms/image";
import { Spinner } from "@components/ui/spinner";

interface IProps {
  imageHash?: string;
  className?: string;
}

const RepoDefaultImage = ({ imageHash, className }: IProps) => {
  const { data: getUserInfo, isFetching } = useGetUser();

  if (isFetching) {
    return <Spinner className="size-5 text-primary" />;
  }

  if (!imageHash) {
    return <RepoYellowIcon className={`repo-yellow-icon h-full w-full ${className}`} />;
  }

  const generateImage = () => {
    switch (imageHash) {
      case "red":
        return <RepoRedIcon className={`repo-red-icon h-full w-full ${className}`} />;
      case "blue":
        return <RepoBlueIcon className={`repo-blue-icon h-full w-full ${className}`} />;
      case "purple":
        return <RepoPurpleIcon className={`repo-purple-icon h-full w-full ${className}`} />;
      case "yellow":
        return <RepoYellowIcon className={`repo-yellow-icon h-full w-full ${className}`} />;
      default:
        return (
          <ImageComponent
            className={`repo-image max-h-full object-cover ${className}`}
            alt="repo-image"
            src={`${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${imageHash}?&checkUserGroupAccess=true&Authorization=${getUserInfo?.access_token}&time=${Date.now()})`}
          />
        );
    }
  };

  return generateImage();
};

export default RepoDefaultImage;
