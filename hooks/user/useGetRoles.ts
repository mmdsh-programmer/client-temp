import { getRolesAction } from "@actions/users";
import { useQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IRoles } from "@interface/users.interface";

const useGetRoles = () => {
  return useQuery({
    queryKey: ["getRoles"],
    queryFn: async ({ signal }) => {
      const response = await getRolesAction();
      handleClientSideHookError(response as IActionError);
      return response as IRoles[];
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetRoles;
