import { ERoles } from "@interface/enums";
import LinkWrapper from "./linkWrapper";
import React from "react";
import useGetRoles from "@hooks/user/useGetRoles";
import { Spinner } from "@components/atoms/spinner";

const PublicLink = () => {
  const { data: getRoles, isLoading } = useGetRoles();

  const roleOptions = getRoles?.filter((role) => {
    return role.name !== ERoles.owner && role.name !== ERoles.default;
  });

  return (
    <div className="repo-public-link flex flex-wrap items-center">
      <div className="min-h-[300px] mt-4 w-full overflow-auto bg-white">
        <div className="border-b-[1px] bg-gray-200 w-full" />
        {isLoading ? (
          <div className="flex justify-center mt-4 items-center  w-full">
            <Spinner className="text-primary h-6 w-6" />
          </div>
        ) : (
          <div className="repo-public-link__list flex flex-col pt-5 gap-y-5">
            {roleOptions?.map((role) => {
              return <LinkWrapper key={role.id} role={role} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLink;
