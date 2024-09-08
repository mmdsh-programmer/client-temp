"use client";

import React from "react";
import { UserIcon } from "@components/atoms/icons";
import useGetUser from "@hooks/auth/useGetUser";
import { Button } from "@material-tailwind/react";
import MenuComponent from "../menu";
import ImageComponent from "@components/atoms/image";

const ProfileMenu: React.FC  = () => {
  const { data: userData } = useGetUser();

  return (
    <MenuComponent
      variant="medium"
      menuList={[
        {
          text: `${userData?.firstName} ${userData?.lastName}`,
          onClick: () => {
            console.log(" user data clicked");
          },
        },
        {
          text: "ویرایش اطلاعات کاربری",
          onClick: () => {
            console.log(" user info edit");
          },
        },
        {
          text: "پوسته تیره",
          onClick: () => {
            console.log(" theme changed");
          },
        },
        {
          text: " تاریخچه بروزرسانی",
          onClick: () => {
            console.log(" app upadate history");
          },
        },
        {
          text: " خروج از حساب",
          onClick: () => {
            console.log(" user logout clicked");
          },
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
