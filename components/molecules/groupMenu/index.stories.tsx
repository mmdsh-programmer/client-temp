import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import GroupMenu from ".";
import { IGetGroups } from "@interface/group.interface";
import { RecoilRoot } from "recoil";


const mockGroup: IGetGroups = {
    title: "Mock Group",
    description: "This is a description of the mock group.",
    path: "147"
};

const meta: Meta<typeof GroupMenu> = {
  title: "components/Molecules/GroupMenu",
  component: GroupMenu,
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

type Story = StoryObj<typeof GroupMenu>;

export const Default: Story = {
  args: {
    group: mockGroup,
    showDrawer: false,
  },
};

export const WithDrawer: Story = {
  args: {
    group: mockGroup,
    showDrawer: true,
  },
};
