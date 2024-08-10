import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import CreateDialog, { IProps } from "./createDialog"; // Adjust the import path accordingly
import LoadingButton from "@components/molecules/loadingButton"; // Ensure you have the proper paths for these components
import CloseButton from "@components/atoms/button/closeButton";
import CancelButton from "@components/atoms/button/cancelButton";
import BackButton from "@components/atoms/button/backButton";
import { Typography } from "@material-tailwind/react";
import FormInput from "@components/atoms/input/formInput";

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
  const [open, setOpen] = useState(true); // Control dialog visibility

  return (
    <CreateDialog {...args} setOpen={setOpen} isPending={args.isPending}>
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
  onSubmit: async () => alert("Submit clicked!"), // Example submit handler
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
