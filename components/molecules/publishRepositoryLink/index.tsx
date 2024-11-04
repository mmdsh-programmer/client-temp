import Link from "next/link";
import React from "react";

interface IProps{
    link: string;
    title: string;
}
const PublishRepositoryLink = ({ link, title }: IProps) => {
  return (
    <Link href={link} className="text-purple-normal">
      <span className="text-sm">
      {title}
      </span>
    </Link>
  );
};

export default PublishRepositoryLink;