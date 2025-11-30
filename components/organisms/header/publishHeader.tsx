import ImageComponent from "@components/atoms/image";
import { InfoIcon } from "@components/atoms/icons";
import Link from "next/link";
import LoginPanelButton from "@components/molecules/loginPanelButton";
import ProfileMenu from "@components/molecules/profileMenu";
import PublicFeedsButton from "@components/molecules/publicFeedsButton";
import PublishSearchButton from "@components/molecules/publishSearchButton";
import React from "react";

interface IProps {
  projectName?: string;
  logo?: string;
  domain?: string;
}
const PublishHeader = ({ projectName, logo, domain }: IProps) => {
  return (
    <>
      <header className="w-full h-auto xs:h-20 px-0 xs:px-8 bg-white xs:bg-secondary flex flex-col xs:flex-row justify-between items-center">
        <div className="order-1 xs:order-2 min-w-full xs:w-auto h-[60px] px-4 xs:p-0 flex justify-between items-center border-b-2 border-gray-200 xs:border-b-0">
          <Link
            className="flex h-8 w-8 mr-7 ml-auto items-center md:mr-0 w-fit"
            href={`${process.env.SECURE === "TRUE" ? "https" : "http"}://${domain}`}
          >
            <div className="rounded-md">
              {logo ? (
                <ImageComponent
                  alt="repo-image"
                  src={`${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${logo}`}
                  className="w-8 h-8"
                />
              ) : (
                <div className="w-8 h-8 flex items-center justify-center">
                  <InfoIcon className="h-8 w-8" stroke="#000" />
                </div>
              )}
            </div>

            {projectName ? (
              <h1 className="font-bold mr-2 text-color-primary">{projectName}</h1>
            ) : null}
          </Link>
          <div className="flex items-center gap-1 xs:gap-4 xs:mr-auto">
            <PublicFeedsButton />
            <ProfileMenu
              renderLoginButton={
                <LoginPanelButton />
              }
              renderSearchButton={
                <PublishSearchButton />
              }
              redirect={false}
            />
          </div>
        </div>
      </header>
      <hr className="" />
    </>
  );
};

export default PublishHeader;
