import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import FormInput from "./formInput";
import InputAtom from ".";

const meta: Meta = {
  title: "components/Atoms/Input",
  component: FormInput,

  parameters: {
    backgrounds: {
      default: "dark",
    },
    layout: "centered",
  },
};

export default meta;

export const FormInputStory: StoryObj<typeof FormInput> = {
  render: (args) => <FormInput placeholder="نام مخزن" />,
};

export const InputAtomStory: StoryObj<typeof InputAtom> = {
  render: (args) => <FormInput placeholder="نام دسته بندی" />,
};
