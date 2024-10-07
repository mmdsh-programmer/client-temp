"use client";

import React from "react";
import {
  LogoutIcon,
  ThemeDarkIcon,
  UpdateIcon,
  UserEditIcon,
  UserIcon,
} from "@components/atoms/icons";
import useGetUser from "@hooks/auth/useGetUser";
import { Button } from "@material-tailwind/react";
import MenuComponent from "../menu";
import ImageComponent from "@components/atoms/image";
import useLogout from "@hooks/auth/useLogout";

const ProfileMenu: React.FC = () => {
  const { data: userData } = useGetUser();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate({
      callBack: () => {
        window.localStorage.clear();
        setTimeout(() => {
          return window.location.assign("/signin");
        }, 1500);
      },
    });
  };

  return (
    <MenuComponent
      variant="medium"
      menuList={[
        {
          text: `${userData?.firstName} ${userData?.lastName}`,
          className: "title_t1",
          onClick: () => {
            console.log(" user data clicked");
          },
        },
        {
          text: "ویرایش اطلاعات کاربری",
          icon: <UserEditIcon className="h-[18px] w-[18px]" />,
          className: "body_b3",
          onClick: () => {
            console.log(" user info edit");
          },
        },
        {
          text: "پوسته تیره",
          icon: <ThemeDarkIcon className="h-[18px] w-[18px]" />,
          className: "body_b3",
          onClick: () => {
            console.log(" theme changed");
          },
        },
        {
          text: " تاریخچه بروزرسانی",
          icon: <UpdateIcon className="h-[18px] w-[18px]" />,
          className: "body_b3",
          onClick: () => {
            console.log(" app upadate history");
          },
        },
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
        className="rounded-full bg-white p-1 shadow-lg flex justify-center items-center h-10 w-10 border-[1px] border-normal"
      >
        {userData?.profileImage ? (
          <ImageComponent
            className="rounded-full h-6 w-6 "
            src={userData?.profileImage}
            alt={userData?.username}
          />
        ) : (
          <UserIcon className="h-4 w-4 fill-gray-400" />
        )}
      </Button>
    </MenuComponent>
  );
};

export default ProfileMenu;
