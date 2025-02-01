import type {
 Meta,
 StoryObj
} from "@storybook/react";

import BackButton from "./backButton";
import CancelButton from "./cancelButton";
import CloseButton from "./closeButton";
import React from "react";

const meta: Meta = {
  title: "components/Atoms/Button",
  component: CancelButton,

  parameters: {
    backgrounds: {default: "dark",},
    layout: "centered",
  },
};

export default meta;

export const CancelButtonStory: StoryObj<typeof CancelButton> = {render: (args) => 
{return (
    <CancelButton
      {...args}
      onClick={() => {return console.log("Cancel button clicked");}}
    >
      انصراف
    </CancelButton>
  );},};

export const CloseButtonStory: StoryObj<typeof CloseButton> = {render: (args) => 
{return (
    <CloseButton
      {...args}
      onClose={() => 
{return console.log("Close button clicked");}}
    />
  );},};

export const BackButtonStory: StoryObj<typeof BackButton> = {render: (args) => 
{return (
    <BackButton {...args} onClick={() => 
{return console.log("Close button clicked");}} />
  );},};
