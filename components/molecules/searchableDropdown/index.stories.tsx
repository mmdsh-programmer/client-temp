import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SearchableDropdown from ".";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta: Meta<typeof SearchableDropdown> = {
  title: "components/Molecules/SearchableDropdown",
  component: SearchableDropdown,
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

type Story = StoryObj<typeof SearchableDropdown>;

// Default story
export const Default: Story = {
  args: {
    options: [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 },
    ],
    handleChange: (value) => console.log("Selected value:", value),
    background: "white",
  },
};
