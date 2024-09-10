// src/hooks/tag/__mocks__/useGetTags.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { ITag } from "@interface/tags.interface";
import { IListResponse } from "@interface/repo.interface";

export const mockTags: ITag[] = [
  {
    id: 1,
    name: "Tag 1",
    createDate: 0,
  },
  {
    id: 2,
    name: "Tag 2",
    createDate: 0,
  },
  {
    id: 3,
    name: "Tag 3",
    createDate: 0,
  },
];

export const mockTagsResponse: IListResponse<ITag> = {
  list: mockTags,
  total: mockTags.length,
  offset: 0,
  size: 3,
};

export const useGetTagsMock = (
  repoId: number,
  size: number,
  enabled?: boolean
) => {
  return useInfiniteQuery({
    queryKey: [`getTags-${repoId}`, size],
    queryFn: async () => mockTagsResponse,
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!enabled,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / size)) {
        return pages.length + 1;
      }
    },
  });
};
