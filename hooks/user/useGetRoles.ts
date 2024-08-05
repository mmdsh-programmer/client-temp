import { getRolesAction } from "@actions/users";
import { useQuery } from "@tanstack/react-query";

const useGetRoles = () => {
  return useQuery({
    queryKey: [`getRoles`],
    queryFn: async ({ signal }) => {
      const response = await getRolesAction();
      return response;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetRoles;
