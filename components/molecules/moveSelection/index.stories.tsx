import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ICategoryMetadata } from "@interface/category.interface";
import MoveSelection from ".";
import { RecoilRoot } from "recoil";
import { categoryMoveDestAtom } from "@atom/category";

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
    (Story) => {
      return (
        <RecoilRoot
          initializeState={({ set }) => {
            set(categoryMoveDestAtom, mockCategory);
          }}
        >
          <div className="w-full p-4">
            <Story />
          </div>
        </RecoilRoot>
      );
    },
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
