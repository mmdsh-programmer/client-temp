"use client";

import React from "react";
import { LogoutIcon, UserIcon } from "@components/atoms/icons";
import LoadingButton from "@components/molecules/loadingButton";
import ImageComponent from "@components/atoms/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import { login } from "@actions/auth";
import useGetOptionalUser from "@hooks/auth/useGetOptionalUser";
import useLogout from "@hooks/auth/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LogInIcon } from "lucide-react";

interface IProps {
  redirect?: boolean;
  renderSearchButton?: React.ReactNode;
  renderLoginButton?: React.ReactNode;
}

const ProfileMenu = ({ redirect = true, renderSearchButton, renderLoginButton }: IProps) => {
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
        {renderSearchButton ?? null}
        <LoadingButton
          variant="clasorPrimary"
          size="icon"
          className="sm:!px-10"
          onClick={() => {
            window.localStorage.setItem("CLASOR:LAST_PAGE", window.location.pathname);
            return login();
          }}
        >
          <LogInIcon className="size-5" />
          <span className="hidden sm:block">ورود</span>
        </LoadingButton>
      </>
    );
  }

  return (
    <>
      {renderSearchButton ?? null}
      {renderLoginButton ?? null}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="userProfile h-10 w-10 overflow-hidden rounded-full border border-normal bg-white p-0 shadow-lg"
          >
            {userData?.profileImage ? (
              <ImageComponent
                className="h-full w-full rounded-full"
                src={userData?.profileImage}
                alt={userData?.username}
              />
            ) : (
              <UserIcon className="h-4 w-4 fill-gray-400" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="z-[99999] ml-4 min-w-[12rem] font-iranYekan text-primary_normal"
        >
          <DropdownMenuLabel dir="rtl" className="title_t1 text-base font-medium">
            {userData?.firstName} {userData?.lastName}
          </DropdownMenuLabel>
          <DropdownMenuItem
            dir="rtl"
            className="logout-button body_b3 cursor-pointer focus:bg-accent"
            onSelect={handleLogout}
          >
            <LogoutIcon className="h-[18px] w-[18px]" />
            <span dir="rtl">خروج از حساب</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileMenu;
