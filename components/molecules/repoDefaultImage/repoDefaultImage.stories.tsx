import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RepoDefaultImage from "../repoAttachImage/repoAttachDefaultImage";
import { RecoilRoot } from "recoil";

const meta: Meta<typeof RepoDefaultImage> = {
  title: "components/Molecules/RepoDefaultImage",
  component: RepoDefaultImage,
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

type Story = StoryObj<typeof RepoDefaultImage>;

export const Default: Story = {
  args: {
    onClick: (name: string) => console.log(`Clicked on ${name}`),
  },
};

export const Disabled: Story = {
  args: {
    onClick: (name: string) => console.log(`Clicked on ${name}`),
    disabled: true,
  },
};
