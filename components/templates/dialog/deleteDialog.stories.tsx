import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import DeleteDialog, { IProps } from "./deleteDialog"; // Adjust the import path accordingly
import { Typography } from "@material-tailwind/react";
import FormInput from "@components/atoms/input/formInput";

export default {
  title: "Components/Templates/DeleteDialog", // The folder structure in Storybook
  component: DeleteDialog,
  argTypes: {
    dialogHeader: { control: "text" },
    isPending: { control: "boolean" },
    backToMain: { control: "boolean" },
  },
} as Meta;

const Template: StoryFn<IProps> = (args) => {
  const [open, setOpen] = useState(true); // Control dialog visibility

  return (
    <DeleteDialog {...args} setOpen={setOpen} isPending={args.isPending}>
      <div>
       تگ
      </div>
    </DeleteDialog>
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  dialogHeader: "حذف تگ",
  isPending: false,
  onSubmit: async () => alert("Submit clicked!"), // Example submit handler
};

// Story with loading state
export const LoadingState = Template.bind({});
LoadingState.args = {
  ...Default.args,
  isPending: true,
};

