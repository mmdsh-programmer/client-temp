/* eslint-disable no-promise-executor-return */
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LoadMore from ".";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";

const meta: Meta<typeof LoadMore> = {
  title: "Components/Molecules/LoadMore",
  component: LoadMore,
  argTypes: {
    fetchNextPage: { action: "fetchNextPage" },
    isFetchingNextPage: { control: "boolean" },
    className: { control: "text" },
  },
};

export default meta;

const Template: StoryObj<typeof LoadMore> = {
  render: (args) => {
    return <LoadMore {...args} />;
  },
};

export const Default: StoryObj<typeof LoadMore> = {
  ...Template,
  args: {
    isFetchingNextPage: false,
    fetchNextPage: async () => {
      const result = await new Promise<
        InfiniteQueryObserverResult<unknown, Error>
      >((resolve) => {
        return setTimeout(resolve, 1000);
      });
      return result;
    },
  },
};

export const Loading: StoryObj<typeof LoadMore> = {
  ...Template,
  args: {
    isFetchingNextPage: true,
    fetchNextPage: async () => {
      return new Promise((resolve) => {
        return setTimeout(resolve, 1000);
      });
    },
  },
};

export const Disabled: StoryObj<typeof LoadMore> = {
  ...Template,
  args: {
    isFetchingNextPage: false,
    fetchNextPage: async () => {
      return new Promise((resolve) => {
        return setTimeout(resolve, 1000);
      });
    },
    className: "opacity-50",
  },
};
