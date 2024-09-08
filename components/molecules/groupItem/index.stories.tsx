import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import GroupItem from ".";
import { IGetGroups } from "@interface/group.interface";
import { RecoilRoot } from "recoil";

const mockGroup: IGetGroups = {
  path: "123456",
  title: "Mock Group",
  description: "This is a description of the mock group.",
};

const meta: Meta<typeof GroupItem> = {
  title: "components/Molecules/GroupItem",
  component: GroupItem,
  decorators: [
    (Story) => (
      <RecoilRoot>
        <div className="w-full p-4">
          <Story />
        </div>
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof GroupItem>;

export const Default: Story = {
  render: () => <GroupItem group={mockGroup} />,
};
