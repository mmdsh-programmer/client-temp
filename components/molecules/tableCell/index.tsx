import React from "react";
import { useRouter } from "next/navigation";

interface IProps {
  tableCell: {
    data: string | React.ReactNode;
    title?: string;
    className?: string;
    rowSpan?: number;
    colSpan?: number;
    onClick?: () => void;
    stopPropagation?: boolean;
  }[];
  navigateTo?: string;
  onClick?: () => void;
  active?: boolean;
}
const TableCell = ({
 tableCell, navigateTo, onClick, active
}: IProps) => {
  const router = useRouter();
  return (
    <tr
      className={`table-cell-track cursor-pointer text-[13px] font-normal text-primary border-b-[1px] border-normal ${active ? "bg-gray-300" : ""}`}
      onClick={() => {
        onClick?.();
        if (navigateTo) {
          router.push(navigateTo);
        }
      }}
    >
      {tableCell.map((row, index) => {
        return (
          <td
            title={row.title}
            // eslint-disable-next-line react/no-array-index-key
            key={`${row.title}-${index}`}
            className={`p-4 truncate font-iranYekan ${row.className || ""}
              `}
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
