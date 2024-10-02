import { ERoles } from "@interface/enums";
import LinkWrapper from "./linkWrapper";
import React from "react";
import { Spinner } from "@material-tailwind/react";
import useGetRoles from "@hooks/user/useGetRoles";

const PublicLink = () => {
  const { data: getRoles, isLoading } = useGetRoles();

  const roleOptions = getRoles?.filter((role) => {
    return role.name !== ERoles.owner && role.name !== ERoles.default;
  });

  return (
    <div className="flex flex-wrap items-center">
      <div className="share-link-content min-h-[300px] mt-4 w-full overflow-auto bg-white">
        <div className="border-b-[1px] bg-gray-200 w-full" />
        {isLoading ? (
          <div className="flex justify-center mt-4 items-center  w-full">
            <Spinner color="deep-purple" />
          </div>
        ) : (
          <div className="flex flex-col pt-5 gap-y-5">
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
