import React from "react";
import { UserIcon } from "@components/atoms/icons";
import { Spinner } from "@material-tailwind/react";
import ProgressBar from "@components/molecules/progressBar";
import useGetUsers from "@hooks/user/useGetRepoUsers";
import { IRepo } from "@interface/repo.interface";
import useGetReport from "@hooks/report/useGetReport";
import Image from "next/image";

interface IProps {
  repo: IRepo;
}

const CardModeFooter = ({ repo }: IProps) => {
  const accessRoles = repo.roleName === "admin" || repo.roleName === "owner";
  const { data: users, isFetching } = useGetUsers(repo.id, 3, accessRoles);
  const { data: getReport, isFetching: isFetchingReport } = useGetReport(
    repo.id
  );
  const userCount = users?.pages[0]?.total;

  return (
    <>
      {isFetching || isFetchingReport ? (
        <Spinner className="h-4 w-4" color="purple" />
      ) : (
        <div className="flex items-center h-8 justify-between w-full">
          <div className="flex">
            {users?.pages.map((page) => {
              return page.list.map((user, index) => {
                return (
                  <div
                    key={user.userInfo.ssoId || index}
                    title={user.userInfo.userName || ""}
                    className={`-!mr-${index * 4} relative w-8 h-8 cursor-pointer
                    z-${index * 10} `}
                  >
                    {user.userInfo.img ? (
                      <Image
                        className="h-full w-full rounded-full border-[3px] border-white"
                        src={user.userInfo.img}
                        alt={user.userInfo.userName}
                        width={100}
                        height={100}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-full border-[3px] border-white">
                        <UserIcon className="h-5 w-5 fill-gray-400" />
                      </div>
                    )}
                  </div>
                );
              });
            })}
            {!!userCount && userCount > 3 ? (
              <div className="relative w-8 h-8 cursor-pointer z-40 left-12">
                <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-full border-[3px] border-white text-sm text-primary_normal">
                  {userCount - 3}+
                </div>
              </div>
            ) : null}
          </div>
          <ProgressBar report={getReport} />
        </div>
      )}
    </>
  );
};

export default CardModeFooter;
