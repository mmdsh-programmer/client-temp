import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Breadcrumb from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const meta: Meta<typeof Breadcrumb> = {
  title: "components/Molecules/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className="flex w-full items-center justify-center !font-iranYekan">
            <Story />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "components/molecules/breadcumb/index.tsx",
      },
    },
  },
};
