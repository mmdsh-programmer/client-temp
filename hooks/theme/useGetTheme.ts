import { IActionError } from "@interface/app.interface";
import { getThemeAction } from "@actions/theme";
import { handleClientSideHookError } from "@utils/error";
import { useQuery } from "@tanstack/react-query";

const useGetTheme = () => {
  return useQuery({
    queryKey: ["theme-info"],
    queryFn: async ({ signal }) => {
      const data = await getThemeAction();
      handleClientSideHookError(data as IActionError);
      return data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetTheme;
