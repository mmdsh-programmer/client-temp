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
import useGetUser from "@hooks/auth/useGetUser";
import { useRepositoryStore } from "@store/repository";

const Header = () => {
  const router = useRouter();
  const { setRepo } = useRepositoryStore();
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
      <div className="flex h-auto w-auto flex-col items-center justify-between bg-white px-0 xs:h-20 xs:flex-row xs:bg-primary xs:px-8">
        <div className="order-2 flex h-fit w-full items-center px-4 py-3 xs:order-1 xs:p-0">
          {currentPath?.includes("/panel-admin-clasor") ? (
            <div className="flex items-center gap-2">
              <Button
                {...({} as React.ComponentProps<typeof Button>)}
                className="back-button bg-transparent p-0"
                onClick={() => {
                  return window.history.back();
                }}
              >
                <BackIcon className="h-5 w-5 fill-icon-active" />
              </Button>
              <Typography {...({} as React.ComponentProps<typeof Typography>)}>
                پنل ادمین
              </Typography>
            </div>
          ) : (
            <Breadcrumb />
          )}
        </div>
        <div className="order-1 flex h-[60px] w-full flex-grow items-center justify-between border-b-2 border-gray-200 px-4 py-3 xs:order-2 xs:w-[50%] xs:border-b-0 xs:p-0">
          <div className="block h-8 w-20 xs:hidden">
            <LogoMobileIcon className="h-full w-full" />
          </div>
          <div className="mr-auto flex items-center gap-4">
            {userInfo?.isClasorAdmin && currentPath !== "/panel-admin-clasor" ? (
              <Button
                {...({} as React.ComponentProps<typeof Button>)}
                onClick={handleAdminPanelNavigation}
                className="panel-admin__button flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-normal bg-white p-1 shadow-lg"
                title="پنل ادمین"
              >
                <UserFillIcon className="h-4 w-4 fill-[#9AA6B1]" />
              </Button>
            ) : null}
            <Button
              {...({} as React.ComponentProps<typeof Button>)}
              onClick={() => {
                return setOpenRequestDialog(true);
              }}
              className="join-to-repo-requests__button notice flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-normal bg-white p-1 shadow-lg"
            >
              <AlertIcon className="h-4 w-4" />
            </Button>
            <Button
              {...({} as React.ComponentProps<typeof Button>)}
              onClick={() => {
                return setOpenFeedbackDialog(true);
              }}
              className="feedback__button flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-normal bg-white p-1 shadow-lg"
            >
              <ThemeIcon className="h-4 w-4" />
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
