import type {
 Meta,
 StoryObj
} from "@storybook/react";

import FormInput from "./formInput";
import InputAtom from ".";
import React from "react";

const meta: Meta = {
  title: "components/Atoms/Input",
  component: FormInput,

  parameters: {
    backgrounds: {default: "dark",},
    layout: "centered",
  },
};

export default meta;

export const FormInputStory: StoryObj<typeof FormInput> = {render: () => 
{return <FormInput placeholder="نام مخزن" />;},};

export const InputAtomStory: StoryObj<typeof InputAtom> = {render: () => 
{return <FormInput placeholder="نام دسته بندی" />;},};
