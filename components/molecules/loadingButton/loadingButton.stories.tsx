import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import LoadingButton from ".";

const meta: Meta<typeof LoadingButton> = {
  title: "Components/Molecules/LoadingButton",
  component: LoadingButton,
  argTypes: {
    onClick: { action: "clicked" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    className: { control: "text" },
  },
};

export default meta;

const Template: StoryObj<typeof LoadingButton> = {
  render: (args) => <LoadingButton {...args} />,
};

export const Default: StoryObj<typeof LoadingButton> = {
  ...Template,
  args: {
    loading: false,
    disabled: false,
    children: "ایجاد",
  },
};

export const LoadingState: StoryObj<typeof LoadingButton> = {
  ...Template,
  args: {
    loading: true,
    disabled: false,
    children: "Loading...",
  },
};

export const DisabledState: StoryObj<typeof LoadingButton> = {
  ...Template,
  args: {
    loading: false,
    disabled: true,
    children: "Disabled",
  },
};
