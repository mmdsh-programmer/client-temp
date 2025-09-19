import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { UserIcon, XIcon } from "@components/atoms/icons";
import { Spinner } from "@components/atoms/spinner";
import ChipMolecule from "@components/molecules/chip";
import ImageComponent from "@components/atoms/image";
import { toast } from "react-toastify";
import { useRepositoryStore } from "@store/repository";
import useGetDocumentBlocklist from "@hooks/document/useGetDocumentBlocklist";
import { useDocumentStore } from "@store/document";
import useBlockDocument from "@hooks/document/useBlockDocument";

const DocumentBlockList = () => {
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const { selectedDocument } = useDocumentStore();

  const {
    data: getDocumentBlockList,
    isFetching,
    isLoading,
  } = useGetDocumentBlocklist(getRepo!.id, selectedDocument!.id, 20);
  const blockDocument = useBlockDocument();

  const handleDelete = (username: string) => {
    if (!getRepo || !selectedDocument) return;
    if (!username) return;
    blockDocument.mutate({
      repoId: getRepo.id,
      documentId: selectedDocument.id,
      username,
      type: "unblock",
      callBack: () => {
        toast.success(`کاربر ${username}با موفقیت از لیست کاربران مسدود شده خارج شد.`);
      },
    });
  };

  return (
    <>
      <Typography {...({} as React.ComponentProps<typeof Typography>)} className="title_t4 text-secondary">لیست کاربران مسدودشده</Typography>
      <div className="flex flex-col">
        {isLoading || isFetching ? (
          <Spinner className="h-6 w-6 text-primary" />
        ) : (
          <div className="document-block-list flex flex-wrap gap-2">
            {getDocumentBlockList?.pages.map((page) => {
              return page.list.length ? (
                page.list.map((blockItem) => {
                  return (
                    <ChipMolecule
                      key={blockItem.userInfo.userName}
                      value={blockItem.userInfo.name}
                      className="block-item w-auto border-[1px] border-normal pl-2 text-primary_normal"
                      icon={
                        blockItem.userInfo.img ? (
                          <ImageComponent
                            className="h-full w-full overflow-hidden rounded-full"
                            src={blockItem.userInfo.img}
                            alt={blockItem.userInfo.userName}
                          />
                        ) : (
                          <UserIcon className="h-full w-full overflow-hidden rounded-full border-[1px] border-normal fill-icon-hover p-1" />
                        )
                      }
                      actionIcon={
                        blockDocument.isPending ? (
                          <Spinner className="h-4 w-4 text-primary" />
                        ) : (
                          <Button
                            {...({} as React.ComponentProps<typeof Button>)}
                            className="delete-button bg-transparent p-0"
                            onClick={() => {
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
