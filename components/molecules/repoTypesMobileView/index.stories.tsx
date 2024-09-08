import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RepoTypesMobileView from ".";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta: Meta<typeof RepoTypesMobileView> = {
  title: "components/Molecules/RepoTypesMobileView",
  component: RepoTypesMobileView,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className="flex w-full h-full bg-gray-50">
            <Story />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof RepoTypesMobileView>;

export const Default: Story = {
  args: {},
};
