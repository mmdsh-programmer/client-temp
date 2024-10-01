import {
 Button,
 Spinner,
 Typography
} from "@material-tailwind/react";
import {
 CopyIcon,
 SettingIcon
} from "@components/atoms/icons";
import {
 FaDateFromTimestamp,
 translateRoles
} from "@utils/index";
import React, { useState } from "react";
import {
 openShareAccessAtom,
 publicRoleAtom
} from "@atom/public";
import {
 useRecoilValue,
 useSetRecoilState
} from "recoil";

import { IPublicLink } from "@interface/repo.interface";
import { IRoles } from "@interface/users.interface";
import LinkWrapperMenu from "./linkWrapperMenu";
import copy from "copy-to-clipboard";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useCreateTinyLink from "@hooks/tinyLink/useCreateTinyLink";

interface IProps {
  role: IRoles;
}

const LinkWrapper = ({ role }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const setSelectedRole = useSetRecoilState(publicRoleAtom);
  const setOpenShareAccess = useSetRecoilState(openShareAccessAtom);
  const [tinyLink, setTinyLink] = useState<string | null>(null);

  const {
 mutate, isPending 
} = useCreateTinyLink();

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
        copy(`https://tilin.ir/${result.hash}`);
        toast.success("لینک کوتاه کپی شد");
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
                      }`,
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

        <div className="flex justify-between gap-2">
          {readLink() ? (
            <Button
              key={role.id}
              className="p-0 bg-transparent"
              onClick={() => {
                if (tinyLink) {
                  copy(tinyLink);
                  toast.success("لینک کوتاه کپی شد");
                } else {
                  CopyTinyLink(
                    `${subscribeLink}/${readLink()?.link}${
                      readLink()?.hasPassword ? "?hasPassword=true" : ""
                    }` || "",
                  );
                }
              }}
            >
              {isPending ? (
                <Spinner className="h-4 w-4" color="blue" />
              ) : (
                <Typography className="text__label__button !text-[10px] text-link">
                  کپی لینک کوتاه
                </Typography>
              )}
            </Button>
          ) : null}
          {readLink()?.expireTime && (
            <span className="block text-[10px] text-hint">
              انقضا :{FaDateFromTimestamp(readLink()!.expireTime)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkWrapper;
