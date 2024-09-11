import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CancelButton from "./cancelButton";
import CloseButton from "./closeButton";
import BackButton from "./backButton";

const meta: Meta = {
  title: "components/Atoms/Button",
  component: CancelButton,

  parameters: {
    backgrounds: {
      default: "dark",
    },
    layout: "centered",
  },
};

export default meta;

export const CancelButtonStory: StoryObj<typeof CancelButton> = {
  render: (args) => (
    <CancelButton
      {...args}
      onClick={() => console.log("Cancel button clicked")}
    >
      انصراف
    </CancelButton>
  ),
};

export const CloseButtonStory: StoryObj<typeof CloseButton> = {
  render: (args) => (
    <CloseButton
      {...args}
      onClose={() => console.log("Close button clicked")}
    />
  ),
};

export const BackButtonStory: StoryObj<typeof BackButton> = {
  render: (args) => (
    <BackButton {...args} onClick={() => console.log("Close button clicked")} />
  ),
};
