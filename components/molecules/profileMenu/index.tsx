"use client";

import { LogoutIcon, UserIcon } from "@components/atoms/icons";

import { Button } from "@material-tailwind/react";
import ImageComponent from "@components/atoms/image";
import LoadingButton from "../loadingButton";
import MenuComponent from "../menu";
import React from "react";
import { login } from "@actions/auth";
import useGetOptionalUser from "@hooks/auth/useGetOptionalUser";
import useLogout from "@hooks/auth/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface IProps {
  redirect?: boolean;
  renderSideButton?: React.ReactNode;
}
const ProfileMenu = ({ redirect = true, renderSideButton }: IProps) => {
  const { isFetching, data: userData } = useGetOptionalUser();
  const queryClient = useQueryClient();
  const logout = useLogout();
  const router = useRouter();

  const handleLogout = () => {
    logout.mutate({
      callBack: () => {
        window.localStorage.clear();
        if (redirect) {
          setTimeout(() => {
            return window.location.assign("/");
          }, 1500);
        } else {
          queryClient.invalidateQueries({
            queryKey: ["user-info"],
          });

          router.refresh();
        }
      },
    });
  };

  if (!isFetching && !userData) {
    return (
      <>
        {renderSideButton || null}
        <LoadingButton
          className="flex justify-center items-center !w-fit px-2 sm:!px-10 py-5 rounded-lg lg:mt-0 bg-tertiary text-white font-iranYekan !max-h-[unset]"
          onClick={() => {
            window.localStorage.setItem(
              "CLASOR:LAST_PAGE",
              window.location.pathname
            );
            return login();
          }}
        >
          <span className="hidden sm:block">ورود</span>
        </LoadingButton>
      </>
    );
  }

  return (
    <>
      {renderSideButton || null}
      <MenuComponent
        variant="medium"
        menuList={[
          {
            text: `${userData?.firstName} ${userData?.lastName}`,
            className: "title_t1",
            // onClick: () => {
            //   console.log(" user data clicked");
            // },
          },
          // {
          //   text: "ویرایش اطلاعات کاربری",
          //   icon: <UserEditIcon className="h-[18px] w-[18px]" />,
          //   className: "body_b3",
          //   onClick: () => {
          //     console.log(" user info edit");
          //   },
          // },
          // {
          //   text: "پوسته تیره",
          //   icon: <ThemeDarkIcon className="h-[18px] w-[18px]" />,
          //   className: "body_b3",
          //   onClick: () => {
          //     console.log(" theme changed");
          //   },
          // },
          // {
          //   text: " تاریخچه بروزرسانی",
          //   icon: <UpdateIcon className="h-[18px] w-[18px]" />,
          //   className: "body_b3",
          //   onClick: () => {
          //     console.log(" app upadate history");
          //   },
          // },
          {
            text: " خروج از حساب",
            icon: <LogoutIcon className="h-[18px] w-[18px]" />,
            className: "logout-button body_b3",
            onClick: handleLogout,
          },
        ]}
      >
        <Button
          placeholder=""
          className="userProfile rounded-full p-1 bg-white shadow-lg flex justify-center items-center h-10 w-10 border-[1px] border-normal"
        >
          {userData?.profileImage ? (
            <ImageComponent
              className="rounded-full h-full w-full"
              src={userData?.profileImage}
              alt={userData?.username}
            />
          ) : (
            <UserIcon className="h-4 w-4 fill-gray-400" />
          )}
        </Button>
      </MenuComponent>
    </>
  );
};

export default ProfileMenu;
