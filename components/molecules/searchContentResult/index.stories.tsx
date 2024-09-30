import type {
 Meta,
 StoryObj
} from "@storybook/react";
import {
 QueryClient,
 QueryClientProvider
} from "@tanstack/react-query";

import React from "react";
import {RecoilRoot} from "recoil";
import SearchContentResult from ".";

const queryClient = new QueryClient();

const meta: Meta<typeof SearchContentResult> = {
  title: "components/Molecules/SearchContentResult",
  component: SearchContentResult,
  decorators: [
    (Story) => 
{return (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className="flex w-full items-center justify-center !font-iranYekan bg-gray-50 p-4">
            <Story />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    );},
  ],
  argTypes: {repoId: { control: "text" },},
};

export default meta;

type Story = StoryObj<typeof SearchContentResult>;

export const Default: Story = {
  args: { repoId: 0},
  render: (args) => {
    return <SearchContentResult {...args} />;
  },
};
