import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import Error from "@components/organisms/error";
import { IPublicKey } from "@interface/repo.interface";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import RepoKeyMenu from "@components/molecules/repoKeyMenu";
import { Spinner } from "@material-tailwind/react";
import TableCell from "@components/molecules/tableCell";
import TableHead from "@components/molecules/tableHead";
import { TickIcon } from "@components/atoms/icons";
import useGetRepoPublicKeys from "@hooks/repository/useGetRepoPublicKeys";

interface IProps {
  repoId: number;
  hasAction?: boolean;
  isSelectable?: boolean;
  selectedKeyId?: number;
  onSelect?: (keyItem: IPublicKey) => void;
}

const RepoKeyList = ({
  repoId,
  hasAction,
  isSelectable,
  onSelect,
  selectedKeyId,
}: IProps) => {
  const {
    data: publicKeyList,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    error,
    refetch,
  } = useGetRepoPublicKeys(repoId, 10);

  const tableHead = hasAction
    ? [
        {
          key: "keyName",
          value: "نام کلید",
        },
        {
          key: "keyValue",
          value: "کلید",
        },
        {
          key: "action",
          value: "عملیات",
        },
      ]
    : [
        {
          key: "keyName",
          value: "نام کلید",
        },
        {
          key: "keyValue",
          value: "کلید",
        },
      ];

  const itemCount = publicKeyList?.pages[0]?.list.length;

  const handleKeySelect = (keyItem: IPublicKey) => {
    if (!isSelectable) return;
    onSelect?.(keyItem);
  };

  if (isError) {
    return <Error error={error} retry={refetch} />;
  }

  // eslint-disable-next-line no-nested-ternary
  return isLoading ? (
    <div className="w-full h-full flex justify-center items-center my-2">
      <Spinner className="h-8 w-8" color="deep-purple" />
    </div>
  ) : itemCount ? (
    <table className="w-full min-w-max ">
      <TableHead tableHead={tableHead} />
      <tbody>
        {publicKeyList?.pages.map((page) => {
          return page.list.map((key) => {
            return (
              <TableCell
                key={`publick-key-table-item-${key.id}`}
                tableCell={
                  hasAction
                    ? [
                        { data: key.name },
                        {
                          data: key.key,
                          className: "max-w-28",
                        },
                        { data: <RepoKeyMenu keyItem={key} /> },
                      ]
                    : [
                        {
                          data: (
                            <span className="flex items-center">
                              {selectedKeyId === key.id ? (
                                <TickIcon className="h-4 w-4 ml-2" />
                              ) : null}
                              {key.name}
                            </span>
                          ),
                        },
                        {
                          data: key.key,
                          className: "max-w-28",
                        },
                      ]
                }
                onClick={() => {
                  return handleKeySelect(key);
                }}
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
                colSpan: hasAction ? 3 : 2,
                className: "text-center",
              },
            ]}
          />
        </RenderIf>
      </tbody>
    </table>
  ) : (
    <EmptyList type={EEmptyList.REPO_KEYS} />
  );
};

export default RepoKeyList;
