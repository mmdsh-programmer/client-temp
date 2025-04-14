import { deleteDomainTagAction } from "@actions/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

interface IUseDeleteDomainTagProps {
  tagId: number;
  callBack?: () => void;
}

const useDeleteDomainTag = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ["deleteDomainTag"],
    mutationFn: async (values: IUseDeleteDomainTagProps) => {
      const { tagId } = values;
      const response = await deleteDomainTagAction(tagId);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({
        queryKey: ["domainTags"],
      });
      callBack?.();
      toast.success("تگ دامنه با موفقیت حذف شد");
    },
    onError: (error) => {
      toast.error(error.message || "خطا در حذف تگ دامنه");
    },
  });
};

export default useDeleteDomainTag;
