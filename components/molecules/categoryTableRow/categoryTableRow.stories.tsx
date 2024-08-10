import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import CategoryTableRow from "./categoryTableRowStory";
import { RecoilRoot } from "recoil";
import {  categoryShow } from "@atom/category"; 
import { ICategoryMetadata } from "@interface/category.interface";
import { bulkItems } from "@atom/bulk";

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

const meta: Meta<typeof CategoryTableRow> = {
  title: "components/Molecules/CategoryTableRow",
  component: CategoryTableRow,
  parameters: {
    backgrounds: {
      default: "light",
    },
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CategoryTableRow>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(bulkItems, []);
          set(categoryShow, null);
        }}
      >
        <Story />
      </RecoilRoot>
    ),
  ],
  render: (args) => <CategoryTableRow {...args} category={mockCategory} />,
};
