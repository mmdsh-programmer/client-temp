import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RepoCardBody from ".";
import { Typography } from "@material-tailwind/react";

const meta: Meta<typeof RepoCardBody> = {
  title: "components/Molecules/RepoCardBody",
  component: RepoCardBody,
  decorators: [
    (Story) => {
      return (
        <div className="">
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof RepoCardBody>;

export const Default: Story = {
  args: {
    title: "bookmark Repo",
    children: <Typography className="text-sm text-gray-600">هیچی.</Typography>,
  },
};
