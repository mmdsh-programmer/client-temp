import React from "react";
import ButtonAtom from "@components/atoms/button";
import {
  RepoBlueIcon,
  RepoPurpleIcon,
  RepoRedIcon,
  RepoYellowIcon,
} from "@components/atoms/icons";

interface IProps {
  onClick: (name: string) => void;
}

const RepoDefaultImage = ({ onClick }: IProps) => {
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
          <ButtonAtom
            className="flex focus:bg-secondary focus:outline-2 focus:outline-gray-200 justify-center items-center rounded-lg border-[1px] border-normal bg-primary w-[82px] h-[82px]"
            onClick={() => onClick(image.name)}
          >
            {image.icon}
          </ButtonAtom>
        );
      })}
    </div>
  );
};

export default RepoDefaultImage;
