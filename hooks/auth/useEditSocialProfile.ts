import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editSocialProfileAction } from "@actions/auth";

const useEditSocialProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["edit-social-profile"],
    mutationFn: async (values: {
      isPrivate: boolean;
      callBack?: () => void;
    }) => {
      const { isPrivate } = values;
      await editSocialProfileAction(isPrivate);

      queryClient.invalidateQueries({
        queryKey: ["user-info"],
      });
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      callBack?.();
    },
  });
};

export default useEditSocialProfile;
