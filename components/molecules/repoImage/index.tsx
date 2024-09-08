import React from "react";
import { IRepo } from "@interface/repo.interface";
import {
  RepoBlueIcon,
  RepoIcon,
  RepoPurpleIcon,
  RepoRedIcon,
  RepoYellowIcon,
} from "@components/atoms/icons";
import useGetUser from "@hooks/auth/useGetUser";
import ImageComponent from "@components/atoms/image";
import { Spinner } from "@material-tailwind/react";

interface IProps {
  repo: IRepo | null;
}

const RepoImage = ({ repo }: IProps) => {
  const { data: getUserInfo, isFetching } = useGetUser();
  const imageHash = repo?.imageFileHash;

  if (isFetching) {
    return <Spinner className="h-5 w-5" color="deep-purple" />;
  }

  if (!imageHash) {
    return <RepoIcon className="w-full h-full" />;
  }

  const generateImage = () => {
    switch (imageHash) {
      case "red":
        return <RepoRedIcon className="w-full h-full" />;
      case "blue":
        return <RepoBlueIcon className="w-full h-full" />;
      case "purple":
        return <RepoPurpleIcon className="w-full h-full" />;
      case "yellow":
        return <RepoYellowIcon className="w-full h-full" />;
      default:
        return (
          <ImageComponent
            alt="repo-image"
            src={`${process.env.NEXT_PUBLIC_PODSPACE_API}files/${repo?.imageFileHash}?&checkUserGroupAccess=true&Authorization=${getUserInfo?.access_token}&time=${Date.now()})`}
          />
        );
    }
  };

  return imageHash ? generateImage() : <RepoIcon className="w-full h-full" />;
};

export default RepoImage;
