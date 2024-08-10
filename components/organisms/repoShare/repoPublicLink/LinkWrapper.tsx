import React, { useState } from "react";
import { IRoles } from "@interface/users.interface";
import { FaDateFromTimestamp, translateRoles } from "@utils/index";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
import { IPublicLink } from "@interface/repo.interface";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";
import { CopyIcon, SettingIcon } from "@components/atoms/icons";
import { openShareAccess, publicRole } from "@atom/public";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import LinkWrapperMenu from "./linkWrapperMenu";
import useCreateTinyLink from "@hooks/tinyLink/useCreateTinyLink";

interface IProps {
  role: IRoles;
}

const LinkWrapper = ({ role }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const setSelectedRole = useSetRecoilState(publicRole);
  const setOpenShareAccess = useSetRecoilState(openShareAccess);
  const [tinyLink, setTinyLink] = useState<string | null>(null);

  const { mutate, isPending } = useCreateTinyLink();

  const subscribeLink = `${window.location.origin}/subscribe`;

  const handleOpenShareAccess = () => {
    setOpenShareAccess(true);
    setSelectedRole(role.id);
  };

  const CopyTinyLink = (link: string) => {
    mutate({
      url: link,
      callBack: (result) => {
        setTinyLink(`https://tilin.ir/${result.hash}`);
        toast.success("لینک مخزن کپی شد");
      },
    });
  };

  const readLink = (): IPublicLink | null => {
    switch (role.name) {
      case "admin":
        return getRepo?.adminPublicLink || null;
      case "editor":
        return getRepo?.editorPublicLink || null;
      case "viewer":
        return getRepo?.viewerPublicLink || null;
      case "writer":
        return getRepo?.writerPublicLink || null;
      default:
        return null;
    }
  };

  return (
    <div className="link-wrapper">
      <div className="flex flex-col gap-2">
        <Typography className="label">{translateRoles(role.name)}</Typography>
        <div className="flex items-center justify-between gap-2 w-full">
          <div
            className="flex justify-between overflow-hidden flex-grow rounded-lg pr-3 pl-2 gap-2 items-center h-10 border-[1px] border-normal bg-gray-50"
            key={role.id}
          >
            <Typography
              className={`truncate   ${
                readLink() ? " text-primary" : "text-placeholder w-full"
              } text-sm font-300 cursor-pointer `}
              dir={readLink() ? "ltr" : "rtl"}
            >
              {readLink()
                ? `${subscribeLink}/${readLink()?.link}${
                    readLink()?.hasPassword ? "?hasPassword=true" : ""
                  }`
                : "ایجاد نشده"}
            </Typography>
            <div className="flex items-center">
              {readLink() ? (
                <Button
                  className="bg-white p-0 h-7 w-8 rounded-none"
                  onClick={() => {
                    copy(
                      `${subscribeLink}/${readLink()?.link}${
                        readLink()?.hasPassword ? "?hasPassword=true" : ""
                      }`
                    );
                    toast.success("لینک مخزن کپی شد");
                  }}
                >
                  <CopyIcon className="w-4 h-4 fill-icon-active" />
                </Button>
              ) : null}
            </div>
          </div>
          {readLink() ? (
            <LinkWrapperMenu role={role} />
          ) : (
            <Button
              onClick={handleOpenShareAccess}
              className="p-0 h-10 w-10 border-[1px] border-normal bg-white"
            >
              <SettingIcon className="w-5 h-5 stroke-icon-active" />
            </Button>
          )}
        </div>
      </div>
      {readLink() && tinyLink ? (
        <div
          className="flex justify-between flex-grow rounded-lg pr-3 pl-2 gap-2 items-center h-10 border-[1px] border-normal bg-gray-50"
          key={role.id}
        >
          <Typography
            className={`truncate text-primary max-w-[200px]
             text-sm font-normal cursor-pointer `}
            dir="ltr"
          >
            {tinyLink}
          </Typography>
          <Button
            className="bg-white p-0 h-7 w-8 rounded-none"
            onClick={() => {
              copy(tinyLink);
              toast.success("لینک کوتاه کپی شد");
            }}
          >
            <CopyIcon className="w-4 h-4 fill-icon-active" />
          </Button>
        </div>
      ) : readLink() ? (
        <div
          onClick={() => {
            CopyTinyLink(
              `${subscribeLink}/${readLink()?.link}${
                readLink()?.hasPassword ? "?hasPassword=true" : ""
              }` || ""
            );
          }}
        >
          {isPending ? (
            <Spinner className="w-4 h-4" color="deep-purple" />
          ) : (
            <Typography className="text__label__button mt-2 text-link">
              ساخت لینک کوتاه
            </Typography>
          )}
        </div>
      ) : null}
      {readLink()?.expireTime && (
        <span className="block mt-2 text-[12px] text-hint">
          انقضا :{FaDateFromTimestamp(readLink()!.expireTime)}
        </span>
      )}
    </div>
  );
};

export default LinkWrapper;
