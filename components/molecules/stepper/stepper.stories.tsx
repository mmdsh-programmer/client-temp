import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import StepperComponent from ".";

const meta: Meta<typeof StepperComponent> = {
  title: "Components/Molecules/StepperComponent",
  component: StepperComponent,
  tags: ["autodocs"],
  argTypes: {
    getActiveStep: {
      control: { type: 'number' },
      description: 'The current active step index',
    },
    stepList: {
      control: { type: 'object' },
      description: 'Array of step names or labels',
    },
  },
};

export default meta;

type StepperComponentProps = React.ComponentProps<typeof StepperComponent>;

export const Default: StoryObj<StepperComponentProps> = {
  args: {
    getActiveStep: 1,
    stepList: ["Step 1", "تگ", "Step 3"],
  },
};

export const AllStepsActive: StoryObj<StepperComponentProps> = {
  args: {
    getActiveStep: 2,
    stepList: ["Step 1", "Step 2", "نسخه"],
  },
};

export const NoStepsActive: StoryObj<StepperComponentProps> = {
  args: {
    getActiveStep: -1,
    stepList: ["Step 1", "Step 2", "Step 3"],
  },
};

export const CustomSteps: StoryObj<StepperComponentProps> = {
  args: {
    getActiveStep: 1,
    stepList: ["Introduction", "عنوان مخزن", "Review", "Finish"],
  },
};
