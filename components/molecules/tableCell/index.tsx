import React from "react";
import { useRouter } from "next/navigation";

interface IProps {
  tableCell: {
    data: string | React.ReactNode;
    title?: string;
    className?: string;
    onClick?: () => void;
  }[];
  navigateTo?: string;
  onClick?: () => void;
}
const TableCell = ({ tableCell, navigateTo, onClick }: IProps) => {
  const router = useRouter();
  return (
    <tr
      className="cursor-pointer text-[13px] font-normal text-primary border-b-2 border-gray-100"
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
            key={index}
            className={`p-4 truncate font-iranYekan ${row.className || ""}`}
            onClick={(e) => {
              if (index === tableCell.length - 1) {
                e.stopPropagation();
              }
            }}
          >
            {row.data}
          </td>
        );
      })}
    </tr>
  );
};

export default TableCell;
