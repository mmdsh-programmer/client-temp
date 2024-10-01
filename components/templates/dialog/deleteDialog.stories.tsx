import DeleteDialog, { IProps } from "./deleteDialog"; // Adjust the import path accordingly
import {
 Meta,
 StoryFn
} from "@storybook/react/*";
import React, { useState } from "react";

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
  const [, setOpen] = useState(true); // Control dialog visibility

  const { isPending } = args;
  return (
    <DeleteDialog {...args} setOpen={setOpen} isPending={isPending}>
      <div>تگ</div>
    </DeleteDialog>
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  dialogHeader: "حذف تگ",
  isPending: false,
  onSubmit: async () => 
{return alert("Submit clicked!");}, // Example submit handler
};

// Story with loading state
export const LoadingState = Template.bind({});
LoadingState.args = {
  ...Default.args,
  isPending: true,
};
