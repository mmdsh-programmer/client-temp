import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@utils/cn";

export interface ITableCell {
  data: string | React.ReactNode;
  title?: string;
  className?: string;
  rowSpan?: number;
  colSpan?: number;
  onClick?: () => void;
  stopPropagation?: boolean;
}

interface IProps {
  tableCell: ITableCell[];
  navigateTo?: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

const TableCell = ({ tableCell, navigateTo, onClick, active, className }: IProps) => {
  const router = useRouter();
  return (
    <tr
      className={cn(
        "table-cell-track cursor-pointer border-b-[1px] border-normal text-[13px] font-normal text-primary_normal",
        active ? "bg-gray-300" : "",
        className || "",
      )}
      onClick={() => {
        onClick?.();
        if (navigateTo) {
          router.push(navigateTo);
        }
      }}
    >
      {tableCell.map((row) => {
        return (
          <td
            title={row.title}
            key={row.title}
            className={cn("truncate p-4 font-iranYekan", row.className || "")}
            onClick={(e) => {
              if (row.stopPropagation) {
                e.stopPropagation();
              }
            }}
            rowSpan={row.rowSpan}
            colSpan={row.colSpan}
          >
            {row.data}
          </td>
        );
      })}
    </tr>
  );
};

export default TableCell;
