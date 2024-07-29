import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./button";

const meta: Meta<typeof Button> = {
  title: "components/Atoms/Button",
  component: Button,

  parameters: {
    backgrounds: {
      default: "dark",
    },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    className:
      "primary-button flex justify-center items-center rounded-lg h-12 w-48 bg-purple-normal text-white text-sm font-yekan-medium font-medium",
  },
  render: function Render(args) {
    function onClick() {
      console.log("=============== clicked ================");
    }
    return (
      <Button {...args} onClick={onClick}>
        <p className="text-white">primary button</p>
      </Button>
    );
  },
};

export const Secondary: Story = {
  args: {
    className:
      "secodary-button rounded-lg h-12 w-48 bg-gray-100 text-purple-normal text-sm font-medium",
  },
  render: function Render(args) {
    function onClick() {
      console.log("=============== clicked ================");
    }
    return (
      <Button {...args} onClick={onClick}>
        <p className="text-primary">secondary button</p>
      </Button>
    );
  },
};

export const Icon: Story = {
  args: {
    className:
      "icon-button flex justify-center items-center rounded-full h-12 w-12 !bg-white",
  },
  render: function Render(args) {
    function onClick() {
      console.log("=============== clicked ================");
    }
    return (
      <Button {...args} onClick={onClick}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 14 18"
          fill="gray"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.00115 18.0039C8.01697 18.0039 8.8481 17.1728 8.8481 16.157H5.15419C5.15419 17.1728 5.97609 18.0039 7.00115 18.0039ZM12.5419 12.463V7.84565C12.5419 5.01058 11.0274 2.63724 8.38628 2.00927V1.38131C8.38628 0.614824 7.76755 -0.00390625 7.00106 -0.00390625C6.23457 -0.00390625 5.61584 0.614824 5.61584 1.38131V2.00927C2.96546 2.63724 1.46019 5.00134 1.46019 7.84565V12.463L0.268907 13.6543C-0.312884 14.2361 0.0934465 15.2335 0.915341 15.2335H13.0775C13.8994 15.2335 14.315 14.2361 13.7332 13.6543L12.5419 12.463Z"
            fill="gray"
          />
        </svg>
      </Button>
    );
  },
};
