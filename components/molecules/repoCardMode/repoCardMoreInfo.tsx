import React, { useEffect, useRef } from "react";
import { IRepo } from "@interface/repo.interface";
import ImageComponent from "@components/atoms/image";
import ProgressBar from "@components/molecules/progressBar";
import { UserIcon } from "@components/atoms/icons";
import useGetReport from "@hooks/report/useGetReport";
import useGetUsers from "@hooks/user/useGetRepoUsers";
import { Spinner } from "@components/atoms/spinner";

interface IProps {
  repo: IRepo;
  setRepoInfo: React.Dispatch<React.SetStateAction<IRepo | null>>;
}

const RepoCardMoreInfo = ({ repo, setRepoInfo }: IProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const accessRoles = repo.roleName === "admin" || repo.roleName === "owner";
  const { data: users, isFetching } = useGetUsers(repo.id, 3, accessRoles);
  const { data: getReport, isFetching: isFetchingReport } = useGetReport(repo.id);
  const userCount = users?.pages[0]?.total;

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setRepoInfo(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="absolute z-[99999] -mt-2 w-full min-w-max rounded-b-lg bg-gray-50 shadow-lg">
        {isFetching || isFetchingReport ? (
          <div className="flex h-12 w-full items-center justify-center">
            <Spinner className="h-4 w-4 text-primary" />
          </div>
        ) : (
          <div className="flex w-full items-center justify-between p-4">
            <div className="flex">
              {users?.pages.map((page) => {
                return page.list.map((user, index) => {
                  return (
                    <div
                      key={user.userInfo.ssoId || index}
                      title={user.userInfo.userName || ""}
                      className={`-!mr-${index * 4} relative h-8 w-8 cursor-pointer z-${index * 10} `}
                    >
                      {user.userInfo.img ? (
                        <ImageComponent
                          className="h-full w-full rounded-full border-[3px] border-white"
                          src={user.userInfo.img}
                          alt={user.userInfo.userName}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-full border-[3px] border-white bg-gray-50">
                          <UserIcon className="h-5 w-5 fill-gray-400" />
                        </div>
                      )}
                    </div>
                  );
                });
              })}
              {!!userCount && userCount > 3 ? (
                <div className="relative left-12 z-40 h-8 w-8 cursor-pointer">
                  <div className="flex h-full w-full items-center justify-center rounded-full border-[3px] border-white bg-gray-50 text-sm text-primary_normal">
                    {userCount - 3}+
                  </div>
                </div>
              ) : null}
            </div>
            <ProgressBar report={getReport} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoCardMoreInfo;
