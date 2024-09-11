import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import MoveSelection from ".";
import { RecoilRoot } from "recoil";
import { categoryMoveDest } from "@atom/category";
import { ICategoryMetadata } from "@interface/category.interface";

const mockCategory: ICategoryMetadata = {
  name: "Mock Category",
  id: 147562,
  description: "",
  repoId: 0,
  type: "category",
  extraDetails: null,
  isHidden: false,
  creator: null,
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
  parentId: null,
  active: false,
  isTemplate: false,
  userGroupHash: null,
};

const meta: Meta<typeof MoveSelection> = {
  title: "components/Molecules/MoveSelection",
  component: MoveSelection,
  decorators: [
    (Story) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(categoryMoveDest, mockCategory);
        }}
      >
        <div className="w-full p-4">
          <Story />
        </div>
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MoveSelection>;

export const Default: Story = {
  args: {
    target: "category",
  },
};

export const DocumentTarget: Story = {
  args: {
    target: "document",
  },
};
