import React from "react";
import {
  RepoBlueIcon,
  RepoPurpleIcon,
  RepoRedIcon,
  RepoYellowIcon,
} from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";

interface IProps {
  onClick: (name: string) => void;
  disabled?: boolean;
}

const RepoDefaultImage = ({ onClick, disabled }: IProps) => {
  const imageGroup = [
    { icon: <RepoPurpleIcon />, name: "purple" },
    { icon: <RepoRedIcon />, name: "red" },
    { icon: <RepoBlueIcon />, name: "blue" },
    { icon: <RepoYellowIcon />, name: "yellow" },
  ];
  return (
    <div className="flex w-full gap-2">
      {imageGroup.map((image) => {
        return (
          <Button
            placeholder="button"
            key={image.name}
            className="flex focus:bg-secondary focus:outline-2 focus:outline-gray-200 justify-center items-center rounded-lg border-[1px] border-normal bg-primary w-[82px] h-[82px]"
            onClick={() => onClick(image.name)}
            disabled={disabled}
          >
            {image.icon}
          </Button>
        );
      })}
    </div>
  );
};

export default RepoDefaultImage;
