import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { IRepo } from "@interface/repo.interface";
import { useEffect } from "react";
import { useRepositoryStore } from "@store/repository";

let lastRepo: IRepo | null = null;
const useHandleRepoChange = () => {
  const queryClient = useQueryClient();
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });

  useEffect(() => {
    if (lastRepo?.id !== getRepo?.id) {
      lastRepo = getRepo;
      const filterKeys = new Set([
        "allRepoList",
        "myRepoList-false",
        "myRepoList-true",
        "myRepoList-false-isPublished",
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
