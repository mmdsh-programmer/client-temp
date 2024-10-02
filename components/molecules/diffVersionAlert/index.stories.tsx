import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DiffVersionAlert from ".";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

const meta: Meta<typeof DiffVersionAlert> = {
  title: "components/Molecules/DiffVersionAlert",
  component: DiffVersionAlert,
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
            <div className="flex w-full items-center justify-center !font-iranYekan bg-gray-50 p-4">
              <Story />
            </div>
          </RecoilRoot>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof DiffVersionAlert>;

export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "components/atoms/diffVersionAlert/index.tsx",
      },
    },
  },
};
