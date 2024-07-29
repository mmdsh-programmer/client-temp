import { getRolesAction } from "@actions/users";
import { IRoles } from "@interface/users.interface";
import { useQuery } from "@tanstack/react-query";

const useGetRoles = () => {
  return useQuery({
    queryKey: [`getRoles`],
    queryFn: async ({ signal }) => {
      const response = await getRolesAction();
      return response?.data as IRoles[];
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetRoles;
