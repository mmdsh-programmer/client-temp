import type { Meta, StoryObj } from "@storybook/react";

import IconTextButton from "./iconTextButton";
import React from "react";

const meta: Meta<typeof IconTextButton> = {
  title: "components/Molecules/IconTextButton",
  component: IconTextButton,
  parameters: {
    backgrounds: {
      default: "dark",
    },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof IconTextButton>;

export const Example: Story = {
  args: {
    classNameButton:
      "primary-button flex justify-center items-center rounded-lg h-12 w-48 bg-secondary gap-x-4",
    classNameText: "text-white text-sm font-medium",
  },
  render: function Render(args) {
    return (
      <IconTextButton
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
    );
  },
};
