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
  args: {
    className:
      "text-right py-2 pr-2 w-[250px] h-[200px] rounded-lg focus:outline-none placeholder:text-hint placeholder:text-sm text-black",
  },
  render: function Render(args) {
    return <Textarea {...args} placeholder="توضیحات خود را وارد کنید" />;
  },
};

