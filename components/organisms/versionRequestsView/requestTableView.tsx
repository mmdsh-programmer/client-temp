import React from "react";
import TableHead from "@components/molecules/tableHead";

interface IProps {
  children: React.ReactNode;
}

const RequestTableView = ({ children }: IProps) => {
  return (
    <div className="w-full overflow-auto border-[0.5px] border-normal rounded-lg">
      <table className="w-full overflow-hidden min-w-max ">
        <TableHead
          tableHead={[
            { key: "versionName", value: "نام نسخه", className: "" },
            { key: "documentName", value: "نام سند" },
            {
              key: "createDate",
              value: "تاریخ ایجاد",
              className: "hidden md:table-cell",
            },
            {
              key: "updateDate",
              value: "تاریخ ویرایش",
              className: "hidden xl:table-cell",
            },
            {
              key: "creator",
              value: "نام سازنده",
              className: "hidden sm:table-cell",
            },
            {
              key: "action",
              value: "عملیات",
              className: "versionReq-action flex justify-end",
            },
          ]}
        />
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default RequestTableView;
