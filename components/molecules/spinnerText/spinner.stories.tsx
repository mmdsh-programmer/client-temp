import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import SpinnerText from ".";

const meta: Meta<typeof SpinnerText> = {
  title: "Components/Molecules/SpinnerText",
  component: SpinnerText,
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: { type: 'text' },
      description: 'Text to display next to the spinner',
    },
  },
};

export default meta;

type SpinnerTextProps = React.ComponentProps<typeof SpinnerText>;

export const Default: StoryObj<SpinnerTextProps> = {
  args: {
    text: "Loading...",
  },
};

export const CustomText: StoryObj<SpinnerTextProps> = {
  args: {
    text: "در حال دریافت اطلاعات",
  },
};
