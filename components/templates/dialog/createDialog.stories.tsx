import CreateDialog, { IProps } from "./createDialog"; // Adjust the import path accordingly
import {
 Meta,
 StoryFn
} from "@storybook/react/*";
import React, { useState } from "react";

import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";

export default {
  title: "Components/Templates/CreateDialog", // The folder structure in Storybook
  component: CreateDialog,
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
    <CreateDialog {...args} setOpen={setOpen} isPending={isPending}>
      <div>
        <form className="flex flex-col gap-2 ">
          <Typography className="label">نام تگ</Typography>
          <FormInput placeholder="نام تگ" />
        </form>
      </div>
    </CreateDialog>
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  dialogHeader: "ایجاد تگ",
  isPending: false,
  backToMain: true,
  onSubmit: async () => 
{return alert("Submit clicked!");}, // Example submit handler
};

// Story with loading state
export const LoadingState = Template.bind({});
LoadingState.args = {
  ...Default.args,
  isPending: true,
};

// Story with no back button
export const NoBackButton = Template.bind({});
NoBackButton.args = {
  ...Default.args,
  backToMain: false,
};
