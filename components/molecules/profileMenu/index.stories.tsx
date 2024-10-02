import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ProfileMenu from ".";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta: Meta<typeof ProfileMenu> = {
  title: "components/Molecules/ProfileMenu",
  component: ProfileMenu,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <div className="w-full p-4">
            <Story />
          </div>
        </RecoilRoot>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof ProfileMenu>;

export const WithMockUser: Story = {
  decorators: [
    (Story) => {
      return (
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <div className="w-full p-4">
              <Story />
            </div>
          </RecoilRoot>
        </QueryClientProvider>
      );
    },
  ],
};
