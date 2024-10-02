import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SearchContent from ".";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const mockSetOpen: React.Dispatch<React.SetStateAction<boolean>> = (
  newState
) => {
  console.log("mockSetOpen", newState);
};

const meta: Meta<typeof SearchContent> = {
  title: "components/Molecules/SearchContent",
  component: SearchContent,
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
            <div className="w-full h-full bg-gray-50">
              <Story />
            </div>
          </RecoilRoot>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof SearchContent>;

export const Default: Story = {
  render: () => {
    return <SearchContent setOpen={mockSetOpen} />;
  },
};
