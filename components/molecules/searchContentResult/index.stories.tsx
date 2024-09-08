import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RecoilRoot, atom, useRecoilState } from "recoil";
import SearchContentResult from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const repoAtom = atom({
  key: "repoAtom",
  default: { id: "repo1", name: "Repo Name" },
});

const categorySearchContentParam = atom({
  key: "categorySearchContentParam",
  default: "",
});

const useSearchContent = (
  repoId: string,
  searchParam: string,
  limit: number
) => {
  return {
    isLoading: false,
    data: {
      pages: [
        {
          total: 2,
          list: [
            {
              repoId: "repo1",
              documentId: "doc1",
              repoName: "Repo 1",
              documentName: "Document 1",
            },
            {
              repoId: "repo1",
              documentId: "doc2",
              repoName: "Repo 1",
              documentName: "Document 2",
            },
          ],
        },
      ],
    },
    isFetchingNextPage: false,
    fetchNextPage: () => {},
  };
};

const meta: Meta<typeof SearchContentResult> = {
  title: "components/Molecules/SearchContentResult",
  component: SearchContentResult,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className="flex w-full items-center justify-center !font-iranYekan bg-gray-50 p-4">
            <Story />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SearchContentResult>;

export const Default: Story = {
  render: () => {
    const [searchParam, setSearchParam] = useRecoilState(
      categorySearchContentParam
    );
    const [repo, setRepo] = useRecoilState(repoAtom);

    const mockedSearchContent = useSearchContent(repo.id, searchParam, 15);

    return <SearchContentResult />;
  },
};
