import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ListMode from ".";
import { RecoilRoot } from "recoil";

const meta: Meta<typeof ListMode> = {
  title: "Components/Molecules/ListMode",
  component: ListMode,
  decorators: [
    (Story) => (
      <RecoilRoot>
        <div className="flex gap-2">
          <Story />
        </div>
      </RecoilRoot>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof ListMode> = {
  render: () => <ListMode />,
};
