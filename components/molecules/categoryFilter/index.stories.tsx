import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CategoryFilter from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

const mockTags = {
  pages: [
    {
      list: [
        { id: 1, name: "Tag1" },
        { id: 2, name: "Tag2" },
        { id: 3, name: "Tag3" },
      ],
    },
  ],
};

const queryClient = new QueryClient();

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

  decorators: [
    (Story) => {
      queryClient.setQueryData(["getTags-422717", 2], mockTags);
      return <Story />;
    },
  ],
};
