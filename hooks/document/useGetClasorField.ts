import { useQuery } from "@tanstack/react-query";
import { getClasorFieldAction } from "@actions/document";
import { IClasorField } from "@interface/document.interface";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useGetClasorField = () => {
  return useQuery({
    queryKey: ["clasor-field"],
    queryFn: async ({ signal }) => {
      const response = await getClasorFieldAction();
      handleClientSideHookError(response as IActionError);
      return response as IClasorField[];
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Number.POSITIVE_INFINITY,
  });
};

export default useGetClasorField;
