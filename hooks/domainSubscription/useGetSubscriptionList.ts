import { useInfiniteQuery } from "@tanstack/react-query";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IDomainSubscriptionList } from "@interface/domain.interface";
import { getDomainSubscriptionAction } from "@actions/domainSubscription";

const useGetSubscriptionList = (size: number) => {
  return useInfiniteQuery({
    queryKey: ["domainSubscriptionList"],
    queryFn: async ({ pageParam }) => {
      const response = await getDomainSubscriptionAction(
        (pageParam - 1) * size,
        size
      );

      handleClientSideHookError(response as IActionError);
      return response as IDomainSubscriptionList;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetSubscriptionList;
