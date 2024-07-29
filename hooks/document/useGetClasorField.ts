import { useQuery } from "@tanstack/react-query";
import { getClasorFieldAction } from "@actions/document";
import { IClasorField } from "@interface/document.interface";

const useGetClasorField = () => {
  return useQuery({
    queryKey: ["clasor-field"],
    queryFn: async ({ signal }) => {
      const response = await getClasorFieldAction();
      return response?.data as IClasorField[];
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Number.POSITIVE_INFINITY,
  });
};

export default useGetClasorField;
