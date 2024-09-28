import { getAdminPanelFeedbackAction } from "@actions/admin";
import { IOfferResponse } from "@interface/offer.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetAdminFeedback = (size: number) => {
  return useInfiniteQuery({
    queryKey: ["GetAdminFeedback"],
    queryFn: async ({ pageParam }) => {
      const response = await getAdminPanelFeedbackAction(
        (pageParam - 1) * size,
        size
      );
      return response as IOfferResponse;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};

export default useGetAdminFeedback;
