import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SearchFilter from ".";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta: Meta<typeof SearchFilter> = {
  title: "components/Molecules/SearchFilter",
  component: SearchFilter,
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

type Story = StoryObj<typeof SearchFilter>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return <SearchFilter open={isOpen} setOpen={setIsOpen} />;
  },
};
