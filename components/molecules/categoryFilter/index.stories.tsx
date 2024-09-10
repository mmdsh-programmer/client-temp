import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CategoryFilter from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { mockTagsResponse, useGetTagsMock } from "@mock/mockData";

const queryClient = new QueryClient();

queryClient.setQueryData([`getTags-412478`, 5], {
  pages: mockTagsResponse,
  pageParams: 1,
});

await queryClient.fetchInfiniteQuery({
  queryKey: [`getTags-412478`, 5],
  queryFn: async () => mockTagsResponse,
  initialPageParam: 1
});

const meta: Meta<typeof CategoryFilter> = {
  title: "components/Molecules/CategoryFilter",
  component: CategoryFilter,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
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

type Story = StoryObj<typeof CategoryFilter>;

export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "components/molecules/categoryFilter/index.tsx",
      },
    },
  },

  args: {
    repoId: 422717,
    size: 30,
  },

  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
};
