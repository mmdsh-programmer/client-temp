import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import InputLabel from ".";

const meta: Meta<typeof InputLabel> = {
  title: "components/Molecules/InputLabel",
  component: InputLabel,

  parameters: {
    backgrounds: {
      default: "dark",
    },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof InputLabel>;

export const TextInputLabel: Story = {
  args: {
    className:
      "text-right py-2 pr-2 w-[250px] rounded-lg focus:outline-none placeholder:text-hint text-black",
    classNameLabel: "text-hint mb-2",
  },
  render: function Render(args) {
    return (
      <InputLabel
        {...args}
        placeholder="نام موردنظر خود را وارد کنید"
        type="text"
        label=":عنوان"
      />
    );
  },
};
