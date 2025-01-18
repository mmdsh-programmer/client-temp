import type { Meta, StoryObj } from "@storybook/react";

import React from "react";
import { RecoilRoot } from "recoil";
import RepoDefaultImage from "../repoAttachImage/repoAttachDefaultImage";

const meta: Meta<typeof RepoDefaultImage> = {
  title: "components/Molecules/RepoDefaultImage",
  component: RepoDefaultImage,
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <div className="w-full p-4">
            <Story />
          </div>
        </RecoilRoot>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof RepoDefaultImage>;

export const Default: Story = {
  args: {
    onClick: (name: string) => {
      return console.log(`Clicked on ${name}`);
    },
  },
};

export const Disabled: Story = {
  args: {
    onClick: (name: string) => {
      return console.log(`Clicked on ${name}`);
    },
    disabled: true,
  },
};
