import {
  FolderEmptyIcon,
  RepoBlueIcon,
  RepoPurpleIcon,
  RepoRedIcon,
  RepoYellowIcon,
} from "@components/atoms/icons";

import { IRepo } from "@interface/repo.interface";
import ImageComponent from "@components/atoms/image";
import React from "react";

// import PublishRepoSubscribe from "../publishRepoSubscribe";


const RepositoryInfo = async ({ repository }: { repository: IRepo }) => {
  const getImage = async () => {
    if (
      ["purple", "red", "blue", "yellow"].includes(repository.imageFileHash)
    ) {
      const component = {
        purple: <RepoPurpleIcon className="h-64 w-64 mx-auto" />,
        red: <RepoRedIcon className="h-64 w-64 mx-auto" />,
        blue: <RepoBlueIcon className="h-64 w-64 mx-auto" />,
        yellow: <RepoYellowIcon className="h-64 w-64 mx-auto" />,
      };
      return component[repository.imageFileHash];
    }
    return (
      <ImageComponent
        className="h-64 w-64 rounded-md border-[3px] border-gray-200 mx-auto shadow-md bg-card-background"
        src={`${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${repository.imageFileHash}`}
        alt={repository.name}
      />
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full p-5">
      {repository.imageFileHash ? (
        getImage()
      ) : (
        <div className="w-full flex justify-center">
          <FolderEmptyIcon />
        </div>
      )}
      <h1 className="text-xl font-bold text-center">{repository.name}</h1>
      <p className="text-center">{repository.description}</p>
      {/* <PublishRepoSubscribe repository={repository} /> */}
    </div>
  );
};

export default RepositoryInfo;
