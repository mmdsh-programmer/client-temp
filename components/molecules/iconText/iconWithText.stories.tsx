import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import IconText from "./iconText";

const meta: Meta<typeof IconText> = {
  title: "components/Molecules/IconText",
  component: IconText,

  parameters: {
    backgrounds: {
      default: "dark",
    },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof IconText>;

export const Example: Story = {
  args: {
    className: "text-white text-sm font-medium",
  },
  render: function Render(args) {
    return (
      <div className="flex justify-center items-center gap-x-2">
        <IconText
          {...args}
          text="ایجاد فایل جدید"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12H12M12 12H18M12 12V18M12 12V6"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
        />
      </div>
    );
  },
};
