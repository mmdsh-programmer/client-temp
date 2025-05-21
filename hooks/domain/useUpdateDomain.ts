import { updateCustomPostByDomainAction } from "@actions/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";

const useUpdateDoamin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateDomain"],
    mutationFn: async (values: {
      content?: string;
      useDomainTag?: boolean;
      hasLikes?: boolean;
      hasComments?: boolean;
      hasQuestions?: boolean;
      needsAdminApprovalForComments?: boolean;
      needsAdminApprovalForQuestions?: boolean;
      allowQuestionReplies?: boolean;
      accessToCreateRepo?: boolean;
      callBack?: () => void;
    }) => {
      const {
        content,
        useDomainTag,
        hasLikes,
        hasComments,
        hasQuestions,
        needsAdminApprovalForComments,
        needsAdminApprovalForQuestions,
        allowQuestionReplies,
        accessToCreateRepo,
      } = values;
      const response = await updateCustomPostByDomainAction(
        content,
        useDomainTag,
        hasLikes,
        hasComments,
        hasQuestions,
        needsAdminApprovalForComments,
        needsAdminApprovalForQuestions,
        allowQuestionReplies,
        accessToCreateRepo,
      );
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      queryClient.invalidateQueries({
        queryKey: ["getDomainInfo"],
      });
      callBack?.();
      toast.success(" دامنه با موفقیت ویرایش شد");
    },
    onError: (error) => {
      toast.error(error.message || "خطا در ویرایش دامنه");
    },
  });
};

export default useUpdateDoamin;
