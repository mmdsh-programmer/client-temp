import React from "react";
import ImageComponent from "@components/atoms/image";
import Text from "@components/atoms/typograghy/text";
import { ERoles } from "@interface/enums";
import { translateRoles } from "@utils/index";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import { Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { IAccessRequest } from "@interface/accessRequest.interface";
import useDeleteInviteRequest from "@hooks/user/useDeleteInviteRequest";
import SelectAtom from "@components/molecules/select";

interface IProps {
  user: IAccessRequest;
}

const InviteRequestByOwner = ({ user }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const deleteInviteRequest = useDeleteInviteRequest();

  const name = `${user.user.given_name} ${user.user.family_name} `;
  const rolesOption = [
    { label: "حذف کاربر", value: "delete" },
  ];

  const handleChange = (role: string) => {
    if (!getRepo) return;
    deleteInviteRequest.mutate({
      repoId: getRepo.id,
      userId: user.userSSOID,
      callBack: () => {
        toast.success(`کاربر ${name} با موفقیت حذف شد.`);
      },
    });
  };

  return (
    <div
      className="flex items-center gap-x-[10px] h-[50px] min-h-[50px] cursor-pointer"
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
      <Text className="flex-grow text-hint text-[13px] font-medium leading-[19.5px] -tracking-[0.13px]">
        {name}
      </Text>
      {user.role === ERoles.owner ? (
        <div className="w-[120px] flex items-center justify-between pr-3 pl-2 rounded-lg h-9 border-[1px] border-normal">
          <Text className="text-primary text-[13px] leading-[18.2px] -tracking-[0.13px]">
            {translateRoles(user.role)}
          </Text>
        </div>
      ) : deleteInviteRequest.isPending ? (
        <div className="w-5">
          <Spinner className="h-4 w-4" color="deep-purple" />
        </div>
      ) : (
        <SelectAtom
          className="w-[120px] flex items-center justify-between pr-3 pl-2 rounded-lg h-9 border-[1px] border-normal"
          defaultOption={translateRoles(user.role)}
          options={rolesOption}
          selectedOption={user.role}
          setSelectedOption={handleChange}
        />
      )}
    </div>
  );
};

export default InviteRequestByOwner;
