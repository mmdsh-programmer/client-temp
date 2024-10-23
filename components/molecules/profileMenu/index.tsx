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

interface IProps {
  redirect?: boolean;
  renderSideButton?: React.ReactNode;
}
const ProfileMenu = ({ redirect = true, renderSideButton }: IProps) => {
  const { isFetching, data: userData } = useGetOptionalUser();
  const queryClient = useQueryClient();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate({
      callBack: () => {
        window.localStorage.clear();
        if (redirect) {
          setTimeout(() => {
            return window.location.assign("/signin");
          }, 1500);
        } else {
          queryClient.invalidateQueries({
            queryKey: ["user-info"],
          });
        }
      },
    });
  };

  if (!isFetching && !userData) {
    return (
      <LoadingButton
        className="flex justify-center items-center mt-4 px-10 py-2 rounded-lg lg:mt-0 bg-purple-normal  text-white font-iranYekan"
        onClick={() => {
          window.localStorage.setItem(
            "CLASOR:LAST_PAGE",
            window.location.pathname
          );
          return login();
        }}
      >
        ورود
      </LoadingButton>
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
            className: "body_b3",
            onClick: handleLogout,
          },
        ]}
      >
        <Button
          placeholder=""
          className="userProfile rounded-full bg-white p-1 shadow-lg flex justify-center items-center h-10 w-10 border-[1px] border-normal"
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
