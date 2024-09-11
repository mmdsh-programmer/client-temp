import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CategoryTableRow from ".";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ICategoryMetadata } from "@interface/category.interface";

const mockCategory: ICategoryMetadata = {
  id: 148957,
  name: "category ssss",
  order: 1,
  createdAt: "1633024800000",
  updatedAt: "1633024800000",
  isHidden: false,
  description: "",
  repoId: 875422,
  type: "category",
  extraDetails: null,
  creator: null,
  deletedAt: null,
  parentId: null,
  active: false,
  isTemplate: false,
  userGroupHash: null,
};

const queryClient = new QueryClient();

const meta: Meta<typeof CategoryTableRow> = {
  title: "components/Molecules/CategoryTableRow",
  component: CategoryTableRow,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className="flex w-full items-center justify-center bg-gray-50">
            <Story />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CategoryTableRow>;

export const Default: Story = {
  args: {
    category: mockCategory,
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "components/molecules/categoryTableRow/index.tsx",
      },
    },
  },
};
