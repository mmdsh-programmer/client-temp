import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import AdvancedFilter from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const meta: Meta<typeof AdvancedFilter> = {
  title: "components/Molecules/AdvancedFilter",
  component: AdvancedFilter,
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

type Story = StoryObj<typeof AdvancedFilter>;

export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "components/molecules/advancedFilter/index.tsx",
      },
    },
  },
};
