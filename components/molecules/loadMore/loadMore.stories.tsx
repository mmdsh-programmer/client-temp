import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import LoadMore from ".";

const meta: Meta<typeof LoadMore> = {
  title: "Components/Molecules/LoadMore",
  component: LoadMore,
  argTypes: {
    fetchNextPage: { action: 'fetchNextPage' },
    isFetchingNextPage: { control: 'boolean' },
    className: { control: 'text' },
  },
};

export default meta;

const Template: StoryObj<typeof LoadMore> = {
  render: (args) => <LoadMore {...args} />,
};

export const Default: StoryObj<typeof LoadMore> = {
  ...Template,
  args: {
    isFetchingNextPage: false,
    fetchNextPage: async () => new Promise((resolve) => setTimeout(resolve, 1000)),
  },
};

export const Loading: StoryObj<typeof LoadMore> = {
  ...Template,
  args: {
    isFetchingNextPage: true,
    fetchNextPage: async () => new Promise((resolve) => setTimeout(resolve, 1000)),
  },
};

export const Disabled: StoryObj<typeof LoadMore> = {
  ...Template,
  args: {
    isFetchingNextPage: false,
    fetchNextPage: async () => new Promise((resolve) => setTimeout(resolve, 1000)),
    className: "opacity-50",
  },
};
