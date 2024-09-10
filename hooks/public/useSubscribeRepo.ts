import { repoAtom, repoGroupingAtom } from "@atom/repository";

import { ERepoGrouping } from "@interface/enums";
import { subscribeRepoAction } from "@actions/public";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

const useSubscribeRepo = () => {
  const setRepo = useSetRecoilState(repoAtom);
  const setRepoGroup = useSetRecoilState(repoGroupingAtom);

  return useMutation({
    mutationKey: [`subscribe-repo`],
    mutationFn: async (values: {
      hash: string;
      password?: string;
      callBack?: () => void;
    }) => {
      const { hash, password } = values;
      const response = await subscribeRepoAction(hash, password);
      if (response?.repository) {
        setRepo(response?.repository);
      }
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      setRepoGroup(ERepoGrouping.ACCESS_REPO);
      callBack?.();
    },
    onError: (error) => {
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
    retry: false,
  });
};

export default useSubscribeRepo;

