import { Typography } from "@material-tailwind/react";
import { Spinner } from "@components/atoms/spinner";
import { ERoles } from "@interface/enums";
import { IAccessRequest } from "@interface/accessRequest.interface";
import ImageComponent from "@components/atoms/image";
import React from "react";
import { useRepositoryStore } from "@store/repository";
import { toast } from "react-toastify";
import { translateRoles } from "@utils/index";
import useDeleteInviteRequest from "@hooks/user/useDeleteInviteRequest";

interface IProps {
  user: IAccessRequest;
}

const InviteRequestByOwner = ({ user }: IProps) => {
  const { repo: getRepo } = useRepositoryStore();
  const deleteInviteRequest = useDeleteInviteRequest();

  const name = `${user.user.given_name} ${user.user.family_name} `;

  const handleChange = () => {
    if (!getRepo) return;
    deleteInviteRequest.mutate({
      repoId: getRepo.id,
      userId: user.userSSOID,
      callBack: () => {
        toast.success(`کاربر ${name} با موفقیت حذف شد.`);
      },
    });
  };

  const renderUserRoleSection = () => {
    if (user.role === ERoles.owner) {
      return (
        <div className="repo-invite-request-by-owner__role flex h-9 w-[120px] items-center justify-between rounded-lg border-[1px] border-normal pl-2 pr-3">
          <Typography
            {...({} as React.ComponentProps<typeof Typography>)}
            className="select_option__text text-primary_normal"
          >
            {translateRoles(user.role)}
          </Typography>
        </div>
      );
    }
    if (deleteInviteRequest.isPending) {
      return (
        <div className="w-5">
          <Spinner
            {...({} as React.ComponentProps<typeof Spinner>)}
            className="h-4 w-4 text-primary"
          />
        </div>
      );
    }
    return (
      <div className="flex gap-2">
        <div
          className="repo-invite-request-by-owner__delete-user flex h-9 w-[100px] items-center justify-between rounded-lg border-[1px] border-normal pl-2 pr-3"
          onClick={handleChange}
        >
          <Typography
            {...({} as React.ComponentProps<typeof Typography>)}
            className="select_option__text text-primary_normal"
          >
            حذف کاربر
          </Typography>
        </div>
        <div className="h-6 w-6" />
      </div>
    );
  };

  return (
    <div
      className="repo-invite-request-by-owner flex h-[50px] min-h-[50px] cursor-pointer items-center gap-x-[10px]"
      title={user.user.preferred_username}
    >
      <div className="h-8 w-8">
        {user.user.picture ? (
          <ImageComponent
            className="h-full w-full overflow-hidden rounded-[64px] opacity-30"
            src={user.user.picture}
            alt={user.user.preferred_username}
          />
        ) : (
          <div className="h-full w-full overflow-hidden rounded-[64px] border-[2px] border-dashed border-normal fill-icon-hover p-1" />
        )}
      </div>
      <Typography
        {...({} as React.ComponentProps<typeof Typography>)}
        className="title_t3 flex-grow text-hint"
      >
        {name}
      </Typography>
      {renderUserRoleSection()}
    </div>
  );
};

export default InviteRequestByOwner;
