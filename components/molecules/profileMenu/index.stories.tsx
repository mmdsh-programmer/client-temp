import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ProfileMenu from ".";
import { RecoilRoot } from "recoil";
import { IUser } from "@interface/users.interface";
import { ERoles } from "@interface/enums";
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
    (Story) => (
      <RecoilRoot>
        <div className="w-full p-4">
          <Story />
        </div>
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProfileMenu>;

export const WithMockUser: Story = {
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
