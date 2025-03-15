import { createDomainTagAction } from "@actions/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useCreateDomainTag = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ["createDomainTag"],
    mutationFn: async (values: {
      name: string;
      description: string;
      order: number;
      callBack?: () => void;
    }) => {
      const { name, description, order } = values;
      const response = await createDomainTagAction(name, description, order);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({
        queryKey: ["domainTags"],
      });
      callBack?.();
      toast.success("تگ دامنه با موفقیت ایجاد شد");
    },
    onError: (error) => {
      toast.error(error.message || "خطا در ایجاد تگ دامنه");
    },
  });
};

export default useCreateDomainTag;
