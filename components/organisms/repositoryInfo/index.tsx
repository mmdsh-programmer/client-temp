import { FolderEmptyIcon } from "@components/atoms/icons";
import { IRepo } from "@interface/repo.interface";
import ImageComponent from "@components/atoms/image";
import React from "react";

const RepositoryInfo = ({ repository }: { repository: IRepo }) => {
  return (
    <div className="flex flex-col gap-4 w-full h-full p-5">
      {repository.imageFileHash ? (
        <ImageComponent
          className="h-64 w-64 rounded-md border-[3px] border-gray-200 mx-auto shadow-md"
          src={`${process.env.NEXT_PUBLIC_PODSPACE_API}files/${repository.imageFileHash}`}
          alt={repository.name}
        />
      ) : (
        <div className="w-full flex justify-center">
          <FolderEmptyIcon />
        </div>
      )}
      <h1 className="text-xl font-bold text-center">{repository.name}</h1>
      <p className="text-center">{repository.description}</p>
    </div>
  );
};

export default RepositoryInfo;
