import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { IRepo } from "@interface/repo.interface";
import { repoAtom } from "@atom/repository";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

let lastRepo: IRepo | null = null;
const useHandleRepoChange = () => {
  const queryClient = useQueryClient();
  const getRepo = useRecoilValue(repoAtom);

  useEffect(() => {
    if (lastRepo?.id !== getRepo?.id) {
      lastRepo = getRepo;
      const filterKeys = new Set([
        "allRepoList",
        "myRepoList-false",
        "myRepoList-true",
        "myAccessRepoList",
        "user-info",
        "roles",
      ]);

      const queries = queryClient.getQueriesData({});
      for (const query of queries) {
        const [key] = query;

        const stringKey = Array.isArray(key) ? key.join("-") : String(key);

        if (!getRepo) {
          if (!filterKeys.has(stringKey)) {
            queryClient.removeQueries({ queryKey: key as QueryKey });
          }
        }
      }
    }
  }, [getRepo]);
};

export default useHandleRepoChange;
