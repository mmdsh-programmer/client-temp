import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Text from "./text";

const meta: Meta<typeof Text> = {
  title: "components/Atoms/Text",
  component: Text,

  parameters: {
    backgrounds: {
      default: "dark",
    },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const TextXLarge: Story = {
  args: {
    className: "text-primary text-[40px]",
  },
  render: function Render(args) {
    return <Text {...args} text="Xlarge " />;
  },
};

export const TextLarge: Story = {
  args: {
    className: "text-primary text-[32px]",
  },
  render: function Render(args) {
    return <Text {...args} text="large " />;
  },
};

export const TextMedium: Story = {
  args: {
    className: "text-primary text-[24px]",
  },
  render: function Render(args) {
    return <Text {...args} text="medium " />;
  },
};

export const TextSmall: Story = {
  args: {
    className: "text-primary text-[16px]",
  },
  render: function Render(args) {
    return <Text {...args} text="small " />;
  },
};

export const TextXSmall: Story = {
  args: {
    className: "text-primary text-[8px]",
  },
  render: function Render(args) {
    return <Text {...args} text="xsmall " />;
  },
};

export const TextPlaceholder: Story = {
    args: {
      className:
        "text-placeholder text-[16px]",
    },
    render: function Render(args) {
      return (
        <Text {...args} text="placeholder "  />
      );
    },
  };
