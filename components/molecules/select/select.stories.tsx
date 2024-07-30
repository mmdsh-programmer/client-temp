import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Select from ".";

const meta: Meta<typeof Select> = {
  title: "components/Atoms/Select",
  component: Select,

  parameters: {
    backgrounds: {
      default: "dark",
    },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const SelectExample: Story = {
  args: {
    classNameSelect:
      "rounded-md !px-[15px] !py-[9px] focus:px-[15px] focus:outline-none text-[16px] font-normal text-primary placeholder:text-hint w-full text-right",
    classNameOption: "",
  },
  render: function Render(args) {
    return <Select {...args} options={["سند", "نمونه سند", "دسته بندی"]} />;
  },
};
