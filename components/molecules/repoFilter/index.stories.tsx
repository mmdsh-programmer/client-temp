import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";
import { RecoilRoot } from "recoil";
import RepoFilter from ".";

const queryClient = new QueryClient();

const meta: Meta<typeof RepoFilter> = {
  title: "components/Molecules/RepoFilter",
  component: RepoFilter,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className="w-full p-4">
            <Story />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof RepoFilter>;

export const Default: Story = {
  args: {},
};
