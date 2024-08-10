import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Textarea from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "components/Atoms/Textarea",
  component: Textarea,

  parameters: {
    backgrounds: {
      default: "dark",
    },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const TextareaPrimary: Story = {
  render: function Render(args) {
    return <Textarea {...args} placeholder="توضیحات خود را وارد کنید" />;
  },
};

