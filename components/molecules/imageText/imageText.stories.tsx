import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ImageText from "./imageText";

const meta: Meta<typeof ImageText> = {
  title: "components/Molecules/ImageText",
  component: ImageText,

  parameters: {
    backgrounds: {
      default: "dark",
    },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ImageText>;

export const ImageTextDraft: Story = {
  args: {
    classNameImage:
      " rounded-full ",
      classNameText: "text-[16px]"
  },
  render: function Render(args) {
    return (
      <ImageText {...args} source="https://picsum.photos/30/30" alt="lorem ipsum" text="عکس"  />
    );
  },
};

