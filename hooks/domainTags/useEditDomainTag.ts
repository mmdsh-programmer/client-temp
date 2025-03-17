import { updateDomainTagAction } from "@actions/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useEditDomainTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateDomainTag"],
    mutationFn: async (values: {
      tagId: number;
      name: string;
      description: string;
      order: number;
      callBack?: () => void;
    }) => {
      const { tagId, name, description } = values;
      const response = await updateDomainTagAction(tagId, name, description);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack, tagId } = values;
      queryClient.invalidateQueries({
        queryKey: ["domainTags"],
      });
      queryClient.invalidateQueries({
        queryKey: ["domainTags", tagId],
      });
      callBack?.();
      toast.success("تگ دامنه با موفقیت ویرایش شد");
    },
    onError: (error) => {
      toast.error(error.message || "خطا در ویرایش تگ دامنه");
    },
  });
};

export default useEditDomainTag;
