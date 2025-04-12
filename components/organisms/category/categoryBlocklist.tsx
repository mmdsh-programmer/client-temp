import React from "react";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import ImageComponent from "@components/atoms/image";
import { UserIcon, XIcon } from "@components/atoms/icons";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import ChipMolecule from "@components/molecules/chip";
import { categoryAtom } from "@atom/category";
import useGetCategoryBlocklist from "@hooks/category/useGetCategoryBlocklist";
import useBlockCategory from "@hooks/category/useBlockCategory";

const CategoryBlockList = () => {
  const getRepo = useRecoilValue(repoAtom);
  const category = useRecoilValue(categoryAtom);

  const {data: getDocumentBlockList,
    isFetching,
    isLoading,} = useGetCategoryBlocklist(getRepo!.id, category!.id, 20);
  const blockDocument = useBlockCategory();

  const handleDelete = (username: string) => {
    if (!getRepo || !category) return;
    if (!username) return;
    blockDocument.mutate({
      repoId: getRepo.id,
      categoryId: category.id,
      username,
      type: "unblock",
      callBack: () => {
        toast.success(
          `کاربر ${username}با موفقیت از لیست کاربران مسدود شده خارج شد.`,
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
          <div className="category-block-list flex flex-wrap gap-2">
            {getDocumentBlockList?.pages.map((page) => {
              return page.list.length ? (
                page.list.map((blockItem) => {
                  return (
                    <ChipMolecule
                      key={blockItem.userInfo.userName}
                      value={blockItem.userInfo.name}
                      className="block-item w-auto border-[1px] border-normal pl-2 text-primary"
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
                        blockDocument.isPending ? (
                          <Spinner className="h-4 w-4" color="deep-purple" />
                        ) : (
                          <Button
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

export default CategoryBlockList;
