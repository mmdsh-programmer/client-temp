import { useMutation } from "@tanstack/react-query";
import { removeAllCookiesAction } from "@actions/cookies";

const useRemoveAllCookies = () => {
  return useMutation({
    mutationKey: ["remove-all-cookies"],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (values: { callBack?: () => void }) => {
      await removeAllCookiesAction();
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      callBack?.();
    },
  });
};

export default useRemoveAllCookies;
