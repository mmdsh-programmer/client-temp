import { Button, Card, CardBody, CardFooter } from "@material-tailwind/react";

import { ChevronLeftIcon } from "../../atoms/icons";
import React from "react";
import RepoCardBody from "../repoCardBody";
import RepoTypeCardFooter from "../repoTypeCardFooter";

interface IProps {
  cardTitle: string;
  icon: React.ReactNode;
  repoNumber: number;
  onClick: () => void;
  className: string;
}

const RepoTypeCard = ({ cardTitle, icon, repoNumber, onClick, className }: IProps) => {
  return (
    <Card
      placeholder="repo-type-card"
      className="repo-type-card flex flex-col flex-grow flex-shrink cursor-pointer w-[40%] lg:w-[20%] rounded-lg bg-white border-2 border-gray-200 shadow-none"
      onClick={onClick}
      {...({} as  Omit<React.ComponentProps<typeof Card>, "placeholder">)}
    >
      <CardBody placeholder="repo-card-body" className="p-0" {...({} as  Omit<React.ComponentProps<typeof CardBody>, "placeholder">)}>
        <RepoCardBody icon={icon} title={cardTitle}>
          <Button
            placeholder=""
            className={`repo-type-button-${className} bg-transparent p-1 shadow-none hover:shadow-none`}
            {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
          >
            <ChevronLeftIcon className="h-3 w-3 stroke-icon-active" />
          </Button>
        </RepoCardBody>
      </CardBody>
      <CardFooter className="repo__card-footer" placeholder="card-footer" {...({} as  Omit<React.ComponentProps<typeof CardFooter>, "placeholder">)}>
        <RepoTypeCardFooter
          repoNumber={repoNumber}
          icon={icon}
          tooltipContent={cardTitle}
        />
      </CardFooter>
    </Card>
  );
};

export default RepoTypeCard;
