import { Button, Typography } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { UserIcon, XIcon } from "@components/atoms/icons";
import { Spinner } from "@components/atoms/spinner";
import ChipMolecule from "@components/molecules/chip";
import ImageComponent from "@components/atoms/image";
import React from "react";
import { useCategoryStore } from "@store/category";
import { useRepositoryStore } from "@store/repository";
import { toast } from "react-toastify";
import useBlockCategory from "@hooks/category/useBlockCategory";
import useGetCategoryBlocklist from "@hooks/category/useGetCategoryBlocklist";

const CategoryBlockList = () => {
  const { repo: getRepo } = useRepositoryStore();
  const { category } = useCategoryStore();

  const {
    data: getCategoryBlockList,
    isFetching,
    isLoading,
  } = useGetCategoryBlocklist(getRepo!.id, category!.id, 20);
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
        toast.success(`کاربر ${username}با موفقیت از لیست کاربران مسدود شده خارج شد.`);
      },
    });
  };

  return (
    <>
      <Typography className="title_t4 text-secondary">لیست کاربران مسدودشده</Typography>
      <div className="flex flex-col">
        {isLoading || isFetching ? (
          <Spinner className="h-6 w-6 text-primary" />
        ) : (
          <div className="category-block-list flex flex-wrap gap-2">
            {getCategoryBlockList?.pages.map((page) => {
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
