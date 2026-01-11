import React from "react";
import TableCell, { ITableCell } from "@components/molecules/tableCell";
import { IRepo } from "@interface/repo.interface";
import RepoDefaultImage from "@components/molecules/repoDefaultImage";
import PublishRepoMenu from "./repoMenu";

interface IProps {
  repo: IRepo;
}

const RepoItem = ({ repo }: IProps) => {
  return (
    <TableCell
      key={`category-table-item-${repo.id}`}
      className="category-table-row"
      tableCell={
        [
          {
            data: repo?.domainPublishedRepoOrder || "--",
            title: "--",
            className: "text-center",
          },
          {
            data: (
              <div className="flex items-center gap-2">
                <RepoDefaultImage
                  className="h-8 max-h-8 w-8 max-w-8"
                  imageHash={repo.imageFileHash}
                />
                <span className="" title={repo.name}>
                  {repo.name}
                </span>
              </div>
            ),
            className: "!px-3 !min-w-[100px] !w-[200px]",
          },
          {
            data: repo.owner?.name || "--",
            title: repo.owner?.name || "--",
            className: "max-w-[70px]",
          },
          {
            data: <PublishRepoMenu repo={repo} />,
            stopPropagation: true,
            className: "!pl-4 !max-w-[50px] !w-[50px]",
          },
        ].filter(Boolean) as ITableCell[]
      }
    />
  );
};

export default RepoItem;
