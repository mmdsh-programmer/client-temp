import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SiderbarHeader from "./index";

const meta: Meta<typeof SiderbarHeader> = {
  title: "components/Molecules/SiderbarHeader",
  component: SiderbarHeader,

  parameters: {
    backgrounds: {
      default: "dark",
    },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof SiderbarHeader>;

export const ArchiveFolder: Story = {
  args: {
    classNameCard: "flex justify-between items-center p-2 rounded-md bg-tertiary w-[215px] border-2 border-gray-200",
    classNameTitle: "text-primary font-medium text-sm",
  },
  render: function Render(args) {
    return (
      <div dir="rtl">
      <SiderbarHeader
        {...args}
        title="کلاسور"
      />
      </div>
    );
  },
};
