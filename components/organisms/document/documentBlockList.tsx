import { Button, Spinner, Typography } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { UserIcon, XIcon } from "@components/atoms/icons";

import ChipMolecule from "@components/molecules/chip";
import ImageComponent from "@components/atoms/image";
import React, { useState } from "react";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import useBlockDocument from "@hooks/document/useBlockDocument";
import useGetDocumentBlocklist from "@hooks/document/useGetDocumentBlocklist";
import { useRecoilValue } from "recoil";

const DocumentBlockList = () => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);

  const [selectedUser, setSelectedUser] = useState("");

  const {
    data: getDocumentBlockList,
    isFetching,
    isLoading,
  } = useGetDocumentBlocklist(getRepo!.id, document!.id, 20);
  const blockDocument = useBlockDocument();

  const handleDelete = (username: string) => {
    if (!getRepo || !document) return;
    if (!username) return;
    blockDocument.mutate({
      repoId: getRepo.id,
      documentId: document.id,
      username,
      type: "unblock",
      callBack: () => {
        toast.success(
          `کاربر ${username}با موفقیت از لیست کاربران مسدود شده خارج شد.`
        );
      },
    });
  };

  return (
    <>
      <Typography className="title_t4 text-secondary ">
        لیست کاربران مسدودشده
      </Typography>
      <div className="flex flex-col">
        {isLoading || isFetching ? (
          <Spinner className="h-6 w-6" color="deep-purple" />
        ) : (
          <div className="flex flex-wrap gap-2">
            {getDocumentBlockList?.pages.map((page) => {
              return page.list.length ? (
                page.list.map((blockItem) => {
                  return (
                    <ChipMolecule
                      key={blockItem.userInfo.userName}
                      value={blockItem.userInfo.name}
                      className="w-auto border-[1px] border-normal pl-2 text-primary"
                      icon={
                        blockItem.userInfo.img ? (
                          <ImageComponent
                            className="w-full h-full rounded-full overflow-hidden"
                            src={blockItem.userInfo.img}
                            alt={blockItem.userInfo.userName}
                          />
                        ) : (
                          <UserIcon className="w-full h-full p-1 border-[1px] border-normal rounded-full overflow-hidden fill-icon-hover" />
                        )
                      }
                      actionIcon={
                        blockDocument.isPending &&
                        selectedUser === blockItem.userInfo.userName ? (
                          <Spinner className="h-4 w-4" color="deep-purple" />
                        ) : (
                          <Button
                            className="bg-transparent p-0"
                            onClick={() => {
                              setSelectedUser(blockItem.userInfo.userName);
                              handleDelete(blockItem.userInfo.userName);
                            }}
                          >
                            <XIcon className="h-4 w-4 fill-icon-active" />
                          </Button>
                        )
                      }
                    />
                  );
                })
              ) : (
                <EmptyList type={EEmptyList.BLOCKLIST} />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default DocumentBlockList;
