import React, { useState } from "react";
import { AlertIcon, LogoMobileIcon, ThemeIcon } from "@components/atoms/icons";
import Breadcrumb from "@components/molecules/breadcumb";
import ProfileMenu from "@components/molecules/profileMenu";
import { Button, Typography } from "@material-tailwind/react";
import UserJoinToRepoRequests from "../dialogs/requests/userJoinToRepoRequests";
import FeedbackDialog from "../dialogs/feedback";
import useGetUser from "@hooks/auth/useGetUser";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);

  const { data: userInfo } = useGetUser();

  return (
    <>
      <div className="w-auto h-auto xs:h-20 px-0 xs:px-8 bg-white xs:bg-secondary flex flex-col xs:flex-row justify-between items-center">
        <div className="order-2 xs:order-1 px-4 py-3 xs:p-0 w-full flex items-center h-fit ">
          {window.location.pathname === "/panel-admin-clasor" ? (
            <Typography>پنل ادمین</Typography>
          ) : (
            <Breadcrumb />
          )}
        </div>
        <div className="order-1 xs:order-2 w-full xs:w-auto h-[60px] px-4 xs:p-0 flex justify-between items-center border-b-2 border-gray-200 xs:border-b-0">
          <div className="block h-8 w-20 xs:hidden">
            <LogoMobileIcon className="h-full w-full" />
          </div>
          <div className="flex items-center gap-4 mr-auto">
            {userInfo?.isClasorAdmin &&
            window.location.pathname !== "/panel-admin-clasor" ? (
              <Button
                onClick={() => {
                  return router.push("/panel-admin-clasor");
                }}
                className="w-max rounded-lg bg-white py-1 px-2 shadow-lg h-10 border-[1px] border-normal"
              >
                <Typography className="text-secondary title_t4">
                  پنل ادمین
                </Typography>
              </Button>
            ) : null}
            <Button
              onClick={() => {
                return setOpenRequestDialog(true);
              }}
              className="rounded-full bg-white p-1 shadow-lg flex justify-center items-center h-10 w-10 border-[1px] border-normal"
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
        <UserJoinToRepoRequests setOpen={() => setOpenRequestDialog(false)} />
      )}
      {openFeedbackDialog && (
        <FeedbackDialog setOpen={() => setOpenFeedbackDialog(false)} />
      )}
    </>
  );
};

export default Header;
