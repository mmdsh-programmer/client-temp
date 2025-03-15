import { getDomainTagByIdAction } from "@actions/domain";
import { useQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IDomainTag } from "@interface/domain.interface";

const useGetDomainTagById = (tagId: number, enabled = true) => {
  return useQuery({
    queryKey: ["domainTags", tagId],
    queryFn: async () => {
      const response = await getDomainTagByIdAction(tagId);
      handleClientSideHookError(response as IActionError);
      return response as IDomainTag;
    },
    enabled: enabled && !!tagId,
    refetchOnWindowFocus: false,
  });
};

export default useGetDomainTagById; 