import React, { useEffect, useState } from "react";
import {
  AlertIcon,
  BackIcon,
  LogoMobileIcon,
  ThemeIcon,
  UserFillIcon,
} from "@components/atoms/icons";
import Breadcrumb from "@components/molecules/breadcumb";
import FeedbackDialog from "@components/organisms/dialogs/feedback";
import UserJoinToRepoRequestsDialog from "@components/organisms/dialogs/requests/userJoinToRepoRequests";
import ProfileMenu from "@components/molecules/profileMenu";
import useGetUser from "@hooks/auth/useGetUser";
import { Button } from "@components/ui/button";
import { useRepositoryStore } from "@store/repository";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@utils/cn";

const Header = () => {
  const router = useRouter();
  const { setRepo } = useRepositoryStore();
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
                variant="ghost"
                size="icon"
                className="back-button h-auto w-auto bg-transparent p-0 hover:bg-transparent"
                onClick={() => window.history.back()}
              >
                <BackIcon className="h-5 w-5 fill-icon-active" />
              </Button>
              <span className="text-base font-medium text-foreground">پنل ادمین</span>
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
                variant="outline"
                size="icon"
                onClick={handleAdminPanelNavigation}
                className={cn(
                  "panel-admin__button flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-normal bg-white p-1 shadow-lg hover:bg-gray-50",
                )}
                title="پنل ادمین"
              >
                <UserFillIcon className="h-4 w-4 fill-[#9AA6B1]" />
              </Button>
            ) : null}
            <UserJoinToRepoRequestsDialog
              trigger={
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "join-to-repo-requests__button notice flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-normal bg-white p-1 shadow-lg hover:bg-gray-50",
                  )}
                >
                  <AlertIcon className="h-4 w-4" />
                </Button>
              }
            />
            <FeedbackDialog
              trigger={
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "feedback__button flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-normal bg-white p-1 shadow-lg hover:bg-gray-50",
                  )}
                >
                  <ThemeIcon className="h-4 w-4" />
                </Button>
              }
            />
            <ProfileMenu />
          </div>
        </div>
      </div>
      <hr className="" />
    </>
  );
};

export default Header;
