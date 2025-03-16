import { removePartyFromDomainParticipantsAction } from "@actions/domain";
import { IActionError } from "@interface/app.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";

const useRemovePartyFromDomain = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["removePartyFromDomain"],
    mutationFn: async (values: {
      userNameList: string[],
      callBack?: () => void;
    }) => {
      const { userNameList } = values;
      const response = await removePartyFromDomainParticipantsAction(userNameList);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;

      queryClient.invalidateQueries({
        queryKey: ["getDomainInfo"],
      });

      callBack?.();
      toast.success("کاربر با موفقیت از دامنه حذف شد");
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطا در حذف کاربر از دامنه");
    },
  });
};

export default useRemovePartyFromDomain; 