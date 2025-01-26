import {
  AlertIcon,
  BackIcon,
  LogoMobileIcon,
  ThemeIcon,
  UserFillIcon,
} from "@components/atoms/icons";
import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Breadcrumb from "@components/molecules/breadcumb";
import FeedbackDialog from "../dialogs/feedback";
import ProfileMenu from "@components/molecules/profileMenu";
import UserJoinToRepoRequests from "../dialogs/requests/userJoinToRepoRequests";
import { repoAtom } from "@atom/repository";
import useGetUser from "@hooks/auth/useGetUser";
import { useSetRecoilState } from "recoil";

const Header = () => {
  const router = useRouter();
  const setRepo = useSetRecoilState(repoAtom);
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();

  const handleAdminPanelNavigation = () => {
    if (isNavigating) return;

    setIsNavigating(true);
    router.push("/panel-admin-clasor");
  };

  useEffect(() => {
    if (isNavigating && currentPath === "/panel-admin-clasor") {
      setRepo(null);
      setIsNavigating(false);
    }
  }, [currentPath, isNavigating, setRepo]);

  return (
    <>
      <div className="w-full h-auto xs:h-20 px-0 xs:px-8 bg-white xs:bg-secondary flex flex-col xs:flex-row items-center">
        <div className="order-2 xs:order-1 px-4 py-3 xs:p-0 w-full xs:w-[50%] flex items-center h-fit ">
          {currentPath.includes("/panel-admin-clasor") ? (
            <div className="flex items-center gap-2">
              <Button
                className="p-0 bg-transparent"
                onClick={() => {
                  return window.history.back();
                }}
              >
                <BackIcon className="h-5 w-5 fill-icon-active" />
              </Button>
              <Typography>پنل ادمین</Typography>
            </div>
          ) : (
            <Breadcrumb />
          )}
        </div>
        <div className="order-1 xs:order-2 w-full xs:w-[50%] h-[60px] px-4 py-3 xs:p-0 flex flex-grow justify-between items-center border-b-2 border-gray-200 xs:border-b-0">
          <div className="block h-8 w-20 xs:hidden">
            <LogoMobileIcon className="h-full w-full" />
          </div>
          <div className="flex items-center gap-4 mr-auto">
            {userInfo?.isClasorAdmin &&
            currentPath !== "/panel-admin-clasor" ? (
              <Button
                onClick={handleAdminPanelNavigation}
                className="panel-admin rounded-full bg-white p-1 shadow-lg flex justify-center items-center h-10 w-10 border-[1px] border-normal"
                title="پنل ادمین"
              >
                <UserFillIcon className=" h-4 w-4 fill-[#9AA6B1]" />
              </Button>
            ) : null}
            <Button
              onClick={() => {
                return setOpenRequestDialog(true);
              }}
              className="notice rounded-full bg-white p-1 shadow-lg flex justify-center items-center h-10 w-10 border-[1px] border-normal"
            >
              <AlertIcon className=" h-4 w-4" />
            </Button>
            <Button
              onClick={() => {
                return setOpenFeedbackDialog(true);
              }}
              className="rounded-full bg-white p-1 shadow-lg flex justify-center items-center h-10 w-10 border-[1px] border-normal"
            >
              <ThemeIcon className=" h-4 w-4" />
            </Button>
            <ProfileMenu />
          </div>
        </div>
      </div>
      <hr className="" />
      {openRequestDialog && (
        <UserJoinToRepoRequests
          setOpen={() => {
            return setOpenRequestDialog(false);
          }}
        />
      )}
      {openFeedbackDialog && (
        <FeedbackDialog
          setOpen={() => {
            return setOpenFeedbackDialog(false);
          }}
        />
      )}
    </>
  );
};

export default Header;
