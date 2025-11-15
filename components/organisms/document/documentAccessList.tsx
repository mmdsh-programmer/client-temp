import { Button, Typography } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import React, { Fragment, useEffect, useState } from "react";
import { UserIcon, XIcon } from "@components/atoms/icons";
import ChipMolecule from "@components/molecules/chip";
import { IResourceUser } from "@interface/access.interface";
import ImageComponent from "@components/atoms/image";
import { toast } from "react-toastify";
import { translateRoles } from "@utils/index";
import useDeleteAccessOfResource from "@hooks/accessManagement/useDeleteAccessOfResource";
import useGetResourceUsers from "@hooks/accessManagement/useGetResourceUsers";
import { Spinner } from "@components/atoms/spinner";
import { useDocumentStore } from "@store/document";

const DocumentAccessList = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const document = useDocumentStore((state) => {
    return state.selectedDocument;
  });

  const { data: getAccessList, isFetching, isLoading, error } = useGetResourceUsers(document!.id, 30);

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

  useEffect(() => {
    if(error){
       toast.error(error?.message ?? "خطا در دریافت لیست دسترسی");
    }
  }, [error]);

  return (
      <div className="flex w-full flex-col">
        {isLoading || isFetching ? (
          <div className="flex w-full items-center justify-center">
            <Spinner className="h-6 w-6 text-primary" />
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
                              className="h-full w-full overflow-hidden rounded-full"
                              src={accessItem.img}
                              alt={accessItem.userName}
                            />
                          ) : (
                            <UserIcon className="h-full w-full overflow-hidden rounded-full border-[1px] border-normal fill-icon-hover p-1" />
                          )
                        }
                        actionIcon={
                          deleteAccess.isPending && selectedUser === accessItem.userName ? (
                            <Spinner className="h-4 w-4 text-primary" />
                          ) : (
                            <Button
                              {...({} as React.ComponentProps<typeof Button>)}
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
                <Fragment key={page.offset}>
                  <EmptyList type={EEmptyList.ACCESS_LIST} />
                </Fragment>
              );
            })}
          </div>
        )}
      </div>
  );
};

export default DocumentAccessList;
