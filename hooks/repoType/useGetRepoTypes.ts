import { useQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { getRepoTypesAction } from "@actions/repoType";
import { IRepoType } from "@interface/repoType";

const useGetRepoTypes = () => {
  return useQuery({
    queryKey: ["get-repo-types"],
    queryFn: async ({ signal }) => {
      const response = await getRepoTypesAction();
      handleClientSideHookError(response as IActionError);
      return response as IRepoType[];
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Number.POSITIVE_INFINITY,
  });
};

export default useGetRepoTypes;
