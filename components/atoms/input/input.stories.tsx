import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Input from "./formInput";

const meta: Meta<typeof Input> = {
  title: "components/Atoms/Input",
  component: Input,

  parameters: {
    backgrounds: {
      default: "dark",
    },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
  args: {
    className:
      "text-right py-2 pr-2 w-[250px] rounded-lg focus:outline-none placeholder:text-hint text-black",
  },
  render: function Render(args) {
    return (
      <Input {...args} placeholder="نام موردنظر خود را وارد کنید" type="text" />
    );
  },
};

export const RadioInput: Story = {
  args: {
    className: "w-5 h-5 selected:bg-purple-normal",
  },
  render: function Render(args) {
    return <Input {...args} type="radio" />;
  },
};

