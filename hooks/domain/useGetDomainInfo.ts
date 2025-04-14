import { getCustomPostByDomainAction } from "@actions/domain";
import { useQuery } from "@tanstack/react-query";
import { IActionError, IDomainMetadata } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetDomainInfo = () => {
  return useQuery({
    queryKey: ["getDomainInfo"],
    queryFn: async () => {
      const response = await getCustomPostByDomainAction();
      handleClientSideHookError(response as IActionError);
      return response as IDomainMetadata;
    },
    refetchOnWindowFocus: false,
  });
};

export default useGetDomainInfo;
