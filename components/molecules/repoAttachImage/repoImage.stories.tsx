import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RepoImage from "../repoDefaultImage";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta: Meta<typeof RepoImage> = {
  title: "components/Molecules/RepoImage",
  component: RepoImage,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => {
      return (
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <div className="flex w-[300px] items-center justify-center bg-gray-50">
              <Story />
            </div>
          </RecoilRoot>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof RepoImage>;

export const Default: Story = {
  args: {
    imageHash: "red",
  },
};

export const Fetching: Story = {
  args: {
    imageHash: "red",
  },
  decorators: [
    (Story) => {
      return (
        <div className="flex w-full items-center justify-center bg-gray-50">
          <Story />
        </div>
      );
    },
  ],
};

export const NoImageHash: Story = {
  args: {
    imageHash: "red",
  },
};
