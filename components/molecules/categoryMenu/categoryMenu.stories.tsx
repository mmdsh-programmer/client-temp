import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CategoryMenu from "./categoryMenu";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockCategory = {
  id: 1,
  name: "دسته بندی تست",
  description: "توضیحات دسته بندی تست",
  isHidden: false,
  repoId: 147854,
  type: "category",
  extraDetails: null,
  creator: null,
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
  parentId: null,
  active: false,
  isTemplate: false,
  userGroupHash: null,
};

const queryClient = new QueryClient();

const meta: Meta<typeof CategoryMenu> = {
  title: "components/Molecules/CategoryMenu",
  component: CategoryMenu,
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
            <div className="flex w-full items-center justify-center !font-iranYekan">
              <Story />
            </div>
          </RecoilRoot>
        </QueryClientProvider>
      );
    },
  ],
  args: {
    category: {
      ...mockCategory,
      type: "category" as const
    },
    showDrawer: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <CategoryMenu {...args} category={{ ...mockCategory, type: "category" as const }} />;
  },
};
