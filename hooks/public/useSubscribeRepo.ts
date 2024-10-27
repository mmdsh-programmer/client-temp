import { repoAtom, repoGroupingAtom } from "@atom/repository";
import { ERepoGrouping } from "@interface/enums";
import { subscribeRepoAction } from "@actions/public";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { IActionError } from "@interface/app.interface";
import { handleClientSideHookError } from "@utils/error";
import { IRepo } from "@interface/repo.interface";

interface ISubscribeResult {
  repository: IRepo;
}

const useSubscribeRepo = () => {
  const setRepo = useSetRecoilState(repoAtom);
  const setRepoGroup = useSetRecoilState(repoGroupingAtom);

  return useMutation({
    mutationKey: ["subscribe-repo"],
    mutationFn: async (values: {
      hash: string;
      password?: string;
      callBack?: () => void;
      errorCallBack?: () => void;
    }) => {
      const { hash, password } = values;
      const response = await subscribeRepoAction(hash, password);
      handleClientSideHookError(response as IActionError);
      if ("repository" in response) {
        setRepo((response as ISubscribeResult).repository);
      }

      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;
      setRepoGroup(ERepoGrouping.ACCESS_REPO);
      callBack?.();
    },
    onError: (error, values) => {
      const { errorCallBack } = values;
      errorCallBack?.();
      toast.error(error.message || "خطای نامشخصی رخ داد");
    },
    retry: false,
  });
};

export default useSubscribeRepo;
