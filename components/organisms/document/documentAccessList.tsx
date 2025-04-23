import { Button, Spinner, Typography } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import React, { useState } from "react";
import { UserIcon, XIcon } from "@components/atoms/icons";

import ChipMolecule from "@components/molecules/chip";
import { IResourceUser } from "@interface/access.interface";
import ImageComponent from "@components/atoms/image";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import { translateRoles } from "@utils/index";
import useDeleteAccessOfResource from "@hooks/accessManagement/useDeleteAccessOfResource";
import useGetResourceUsers from "@hooks/accessManagement/useGetResourceUsers";
import { useRecoilValue } from "recoil";

const DocumentAccessList = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const document = useRecoilValue(selectedDocumentAtom);

  const {
    data: getAccessList,
    isFetching,
    isLoading,
  } = useGetResourceUsers(document!.id, 30);

  const deleteAccess = useDeleteAccessOfResource();

  const handleDelete = (user: IResourceUser) => {
    if (!document) return;
    if (!user) return;
    deleteAccess.mutate({
      resourceId: document.id,
      username: user.userName,
      accessNames: [user.userRole],
      validate: false,
      callBack: () => {
        toast.success(`دسترسی کاربر ${user.userName} .از سند حذف شد`);
      },
    });
  };

  return (
    <>
      <Typography className="title_t4 text-secondary ">
        لیست کاربران مجاز در سند
      </Typography>
      <div className="flex flex-col w-full">
        {isLoading || isFetching ? (
          <div className="flex justify-center items-center w-full">
            <Spinner className="h-6 w-6" color="purple" />
          </div>
        ) : (
          <div className="docuemnt-direct-access-list flex flex-wrap gap-2">
            {getAccessList?.pages.map((page) => {
              return page.list.length ? (
                page.list.map((accessItem) => {
                  return (
                    accessItem.userRole !== "owner" && (
                      <ChipMolecule
                        key={accessItem.userName}
                        value={`${accessItem.userName} _ ${translateRoles(accessItem.userRole)}`}
                        className="direct-access-item w-auto border-[1px] border-normal pl-2 text-primary_normal"
                        icon={
                          accessItem.img ? (
                            <ImageComponent
                              className="w-full h-full rounded-full overflow-hidden"
                              src={accessItem.img}
                              alt={accessItem.userName}
                            />
                          ) : (
                            <UserIcon className="w-full h-full p-1 border-[1px] border-normal rounded-full overflow-hidden fill-icon-hover" />
                          )
                        }
                        actionIcon={
                          deleteAccess.isPending &&
                          selectedUser === accessItem.userName ? (
                            <Spinner className="h-4 w-4" color="purple" />
                          ) : (
                            <Button
                              className="delete-button bg-transparent p-0"
                              onClick={() => {
                                setSelectedUser(accessItem.userName);
                                handleDelete(accessItem);
                              }}
                            >
                              <XIcon className="h-4 w-4 fill-icon-active" />
                            </Button>
                          )
                        }
                      />
                    )
                  );
                })
              ) : (
                <EmptyList type={EEmptyList.ACCESS_LIST} />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default DocumentAccessList;
