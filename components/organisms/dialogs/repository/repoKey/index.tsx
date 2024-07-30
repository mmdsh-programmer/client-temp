import React from "react";
import { IRepo } from "@interface/repo.interface";
import InfoDialog from "@components/templates/dialog/infoDialog";
import TableHead from "@components/molecules/tableHead";
import useGetRepoPublicKeys from "@hooks/repository/useGetRepoPublicKeys";
import TableCell from "@components/molecules/tableCell";
import RenderIf from "@components/renderIf";
import LoadMore from "@components/molecules/loadMore";
import { Button, Spinner } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { AddIcon } from "@components/atoms/icons";
import Text from "@components/atoms/typograghy/text";
import RepoKeyMenu from "@components/molecules/repoKeyMenu";

interface IProps {
  repo: IRepo;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoKeyDialog = ({ repo, setOpen }: IProps) => {
  const {
    data: publicKeyList,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetRepoPublicKeys(repo.id, 10);
  const handleClose = () => {
    setOpen(false);
  };

  const itemCount = publicKeyList?.pages[0]?.list.length;

  return (
    <InfoDialog dialogHeader="لیست کلید های مخزن" setOpen={handleClose}>
      <div className="p-4">
        <Button
          placeholder="create group"
          className="flex justify-between items-center shadow-none hover:shadow-none px-1 h-8 bg-white hover:bg-transparent border-[1px] border-normal mr-auto"
          // onClick={() => {
          //   setCreateGroupModal(true);
          // }}
        >
          <AddIcon className="h-5 w-5 stroke-icon-active" />
          <Text className="text-primary px-2 text-[12px] font-medium leading-[18px] -tracking-[0.12px]">
            ایجاد کلید
          </Text>
        </Button>

        <div className="w-full overflow-auto max-h-[calc(100dvh-200px)] border-[0.5px] border-normal rounded-lg mt-4">
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center my-2">
              <Spinner className="h-8 w-8" color="deep-purple" />
            </div>
          ) : itemCount ? (
            <table className="w-full min-w-max ">
              <TableHead
                tableHead={[
                  { key: "keyName", value: "نام کلید" },
                  { key: "keyValue", value: "کلید" },
                  { key: "action", value: "عملیات" },
                ]}
              />

              <tbody>
                {publicKeyList?.pages.map((page) => {
                  return page.list.map((key) => {
                    return (
                      <TableCell
                        key={`publick-key-table-item-${key.id}`}
                        tableCell={[
                          { data: key.name, className: "block" },
                          { data: key.key, className: "max-w-28" },
                          { data: <RepoKeyMenu keyItem={key} /> },
                        ]}
                      />
                    );
                  });
                })}

                <RenderIf isTrue={hasNextPage}>
                  <TableCell
                    tableCell={[
                      {
                        data: (
                          <LoadMore
                            className="self-center !shadow-none underline text-[10px] text-primary !font-normal"
                            isFetchingNextPage={isFetchingNextPage}
                            fetchNextPage={fetchNextPage}
                          />
                        ),
                        colSpan: 3,
                        className: "text-center",
                      },
                    ]}
                  />
                </RenderIf>
              </tbody>
            </table>
          ) : (
            <EmptyList type={EEmptyList.REPO_KEYS} />
          )}
        </div>
      </div>
    </InfoDialog>
  );
};

export default RepoKeyDialog;
