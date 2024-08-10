import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Sort from ".";

const meta: Meta<typeof Sort> = {
  title: "Components/Molecules/Sort",
  component: Sort,
  argTypes: {
    onClick: {
      action: "clicked",
      description: "Callback function for button click",
    },
  },
};

export default meta;

type SortProps = React.ComponentProps<typeof Sort>;

export const Default: StoryObj<SortProps> = {
  args: {},
};
