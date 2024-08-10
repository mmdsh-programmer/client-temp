import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import CategoryMenu from "./categoryMenuStory";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { categoryDrawerAtom } from "@atom/category";
import { ICategoryMetadata } from "@interface/category.interface";

const mockCategory: ICategoryMetadata = {
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
    backgrounds: {
      default: "light",
    },
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot
        >
          <div className="flex w-full items-center justify-center !font-iranYekan">
            <Story />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CategoryMenu>;

export const Default: Story = {
  render: (args) => <CategoryMenu {...args} category={mockCategory} />,
};
