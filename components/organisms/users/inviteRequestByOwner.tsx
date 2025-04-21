import {
 Spinner,
 Typography
} from "@material-tailwind/react";

import { ERoles } from "@interface/enums";
import { IAccessRequest } from "@interface/accessRequest.interface";
import ImageComponent from "@components/atoms/image";
import React from "react";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import { translateRoles } from "@utils/index";
import useDeleteInviteRequest from "@hooks/user/useDeleteInviteRequest";
import { useRecoilValue } from "recoil";

interface IProps {
  user: IAccessRequest;
}



const InviteRequestByOwner = ({ user }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
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
        <div className="repo-invite-request-by-owner__role w-[120px] flex items-center justify-between pr-3 pl-2 rounded-lg h-9 border-[1px] border-normal">
          <Typography className="select_option__text text-primary_normal">
            {translateRoles(user.role)}
          </Typography>
        </div>
      );
    } if (deleteInviteRequest.isPending) {
      return (
        <div className="w-5">
          <Spinner className="h-4 w-4" color="purple" />
        </div>
      );
    } 
      return (
        <div
          className="repo-invite-request-by-owner__delete-user w-[120px] flex items-center justify-between pr-3 pl-2 rounded-lg h-9 border-[1px] border-normal"
          onClick={handleChange}
        >
          <Typography className="select_option__text text-primary_normal">
            حذف کاربر
          </Typography>
        </div>
      );
    
  };

  return (
    <div
      className="repo-invite-request-by-owner flex items-center gap-x-[10px] h-[50px] min-h-[50px] cursor-pointer"
      title={user.user.preferred_username}
    >
      <div className="h-8 w-8">
        {user.user.picture ? (
          <ImageComponent
            className="w-full h-full rounded-[64px] overflow-hidden opacity-30"
            src={user.user.picture}
            alt={user.user.preferred_username}
          />
        ) : (
          <div className="w-full h-full p-1 border-[2px] border-dashed border-normal rounded-[64px] overflow-hidden fill-icon-hover" />
        )}
      </div>
      <Typography className="title_t3 flex-grow text-hint">{name}</Typography>
      {renderUserRoleSection()}
    </div>
  );
};

export default InviteRequestByOwner;
