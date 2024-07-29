import React from "react";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import { IRepo } from "@interface/repo.interface";
import RepoMenu from "@components/molecules/repoMenu";
import Image from "next/image";
import RepoCardBody from "../repoCardBody";
import CardModeFooter from "./cardModeFooter";

interface IProps {
  repo: IRepo;
  archived?: boolean;
}

const RepoCardMode = ({ repo, archived }: IProps) => {
  return (
    <Card placeholder="" className="shadow-none">
      <CardBody placeholder="repo-card-body" className="p-0">
        <RepoCardBody
          icon={
            repo.imageFileHash ? (
              <Image
                className="object-cover"
                src={`${process.env.NEXT_PUBLIC_PODSPACE_API}files/${repo.imageFileHash}`}
                alt="repo-image"
                width={100}
                height={100}
              />
            ) : null
          }
          title={repo.name}
        >
          <RepoMenu repo={repo} archived={archived} />
        </RepoCardBody>
      </CardBody>
      <CardFooter className="repo__card-footer" placeholder="card-footer">
        <CardModeFooter repo={repo} />
      </CardFooter>
    </Card>
  );
};

export default RepoCardMode;
