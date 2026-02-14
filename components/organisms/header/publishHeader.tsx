import React from "react";
import ImageComponent from "@components/atoms/image";
import Link from "next/link";
import LoginPanelButton from "@components/molecules/loginPanelButton";
import ProfileMenu from "@components/molecules/profileMenu";
import PublishSearchDialog from "@components/organisms/dialogs/publish";
import FeedsDialog from "@components/organisms/dialogs/feeds";
import { InfoIcon } from "@components/atoms/icons";
import { Button } from "@components/ui/button";
import { RssIcon } from "lucide-react";

interface IProps {
  projectName?: string;
  logo?: string;
  domain?: string;
}
const PublishHeader = ({ projectName, logo, domain }: IProps) => {
  return (
    <>
      <header className="flex h-auto w-full flex-col items-center justify-between bg-white px-0 xs:h-20 xs:flex-row xs:bg-secondary xs:px-8">
        <div className="order-1 flex h-[60px] min-w-full items-center justify-between border-b-2 border-gray-200 px-4 xs:order-2 xs:w-auto xs:border-b-0 xs:p-0">
          <Link
            className="ml-auto mr-7 flex h-8 w-8 items-center md:mr-0"
            href={`${process.env.SECURE === "TRUE" ? "https" : "http"}://${domain}`}
          >
            <div className="rounded-md">
              {logo ? (
                <ImageComponent
                  alt="repo-image"
                  src={`${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${logo}`}
                  className="h-8 w-8"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center">
                  <InfoIcon className="h-8 w-8" stroke="#000" />
                </div>
              )}
            </div>

            {projectName ? (
              <h1 className="text-color-primary mr-2 font-bold">{projectName}</h1>
            ) : null}
          </Link>
          <div className="flex items-center gap-1 xs:mr-auto xs:gap-4">
            <FeedsDialog>
              <Button
                variant="clasorPrimary"
                size="icon"
              >
                <RssIcon className="size-5" />
              </Button>
            </FeedsDialog>
            <ProfileMenu
              renderLoginButton={<LoginPanelButton />}
              renderSearchButton={<PublishSearchDialog />}
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
