import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { CopyIcon, SettingIcon } from "@components/atoms/icons";
import { FaDateFromTimestamp, translateRoles } from "@utils/index";
import { IPublicLink } from "@interface/repo.interface";
import { IRoles } from "@interface/users.interface";
import LinkWrapperMenu from "./linkWrapperMenu";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import useCreateTinyLink from "@hooks/tinyLink/useCreateTinyLink";
import { Spinner } from "@components/atoms/spinner";
import { usePublicStore } from "@store/public";
import { useRepositoryStore } from "@store/repository";

interface IProps {
  role: IRoles;
}

const LinkWrapper = ({ role }: IProps) => {
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const { setPublicRole, setOpenShareAccess } = usePublicStore();
  const [tinyLink, setTinyLink] = useState<string | null>(null);

  const { mutate, isPending } = useCreateTinyLink();

  const subscribeLink = `${window.location.origin}/subscribe`;

  const handleOpenShareAccess = () => {
    setOpenShareAccess(true);
    setPublicRole(role.id);
  };

  const CopyTinyLink = (link: string) => {
    mutate({
      url: link,
      callBack: (result) => {
        setTinyLink(`${process.env.NEXT_PUBLIC_TINY_BASE_URL}/${result.hash}`);
        copy(`${process.env.NEXT_PUBLIC_TINY_BASE_URL}/${result.hash}`);
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
        <Typography {...({} as React.ComponentProps<typeof Typography>)} className="label">{translateRoles(role.name)}</Typography>
        <div className="flex w-full items-center justify-between gap-2">
          <div
            className="flex h-10 flex-grow items-center justify-between gap-2 overflow-hidden rounded-lg border-[1px] border-normal bg-gray-50 pl-2 pr-3"
            key={role.id}
          >
            <Typography
              {...({} as React.ComponentProps<typeof Typography>)}
              className={`truncate ${
                readLink() ? "text-primary_normal" : "w-full text-placeholder"
              } font-300 cursor-pointer text-sm`}
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
                  {...({} as React.ComponentProps<typeof Button>)}
                  className="repo-link-wrapper__copy-link-button h-7 w-8 rounded-none bg-white p-0"
                  onClick={() => {
                    copy(
                      `${subscribeLink}/${readLink()?.link}${
                        readLink()?.hasPassword ? "?hasPassword=true" : ""
                      }`,
                    );
                    toast.success("لینک مخزن کپی شد");
                  }}
                >
                  <CopyIcon className="h-4 w-4 fill-icon-active" />
                </Button>
              ) : null}
            </div>
          </div>
          {readLink() ? (
            <LinkWrapperMenu role={role} />
          ) : (
            <Button
              {...({} as React.ComponentProps<typeof Button>)}
              onClick={handleOpenShareAccess}
              className="repo-link-wrapper__create-link-button h-10 w-10 border-[1px] border-normal bg-white p-0"
            >
              <SettingIcon className="h-5 w-5 stroke-icon-active" />
            </Button>
          )}
        </div>

        <div className="flex justify-between gap-2">
          {readLink() ? (
            <Button
              {...({} as React.ComponentProps<typeof Button>)}
              key={role.id}
              className="repo-public-link__copy-link-button bg-transparent p-0"
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
                <Spinner className="text-info h-4 w-4" />
              ) : (
                <Typography {...({} as React.ComponentProps<typeof Typography>)} className="text__label__button !text-[10px] text-link">
                  کپی لینک کوتاه
                </Typography>
              )}
            </Button>
          ) : null}
          {readLink()?.expireTime ? (
            <span className="repo-public-link__expire-time block text-[10px] text-hint">
              انقضا :{FaDateFromTimestamp(readLink()!.expireTime)}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LinkWrapper;
