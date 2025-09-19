import React from "react";
import { Typography } from "@material-tailwind/react";

interface IProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const RepoCardBody = ({ icon, children, title }: IProps) => {
  return (
    <div className="card-content px-3 py-5 w-full flex justify-between">
      <div className="flex items-center overflow-hidden">
        <div className="max-h-8 max-w-8 min-h-4 min-w-4">{icon}</div>
        <div className="max-w-[180px] overflow-hidden mr-2 ml-4">
          <Typography
            placeholder={title}
            title={title}
            className="ml-2 font-iranYekan font-medium text-lg truncate"
            {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            {title}
          </Typography>
        </div>
      </div>
      {children}
    </div>
  );
};

export default RepoCardBody;

