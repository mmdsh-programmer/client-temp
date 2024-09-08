import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TabComponent from ".";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Typography } from "@material-tailwind/react";

const queryClient = new QueryClient();

const meta: Meta<typeof TabComponent> = {
  title: "components/Molecules/TabComponent",
  component: TabComponent,
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

type Story = StoryObj<typeof TabComponent>;

export const Default: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<string>("Tab 1");

    const tabList = [
      {
        tabTitle: "Tab 1",
        tabContent: <Typography>This is content for Tab 1</Typography>,
      },
      {
        tabTitle: "Tab 2",
        tabContent: <Typography>This is content for Tab 2</Typography>,
      },
      {
        tabTitle: "Tab 3",
        tabContent: <Typography>This is content for Tab 3</Typography>,
      },
    ];

    return (
      <TabComponent
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    );
  },
};
