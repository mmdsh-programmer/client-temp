import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import InfoDialog, { IProps } from "./infoDialog"; // Adjust the import path accordingly

export default {
  title: "Components/Templates/InfoDialog", // The folder structure in Storybook
  component: InfoDialog,
  argTypes: {
    dialogHeader: { control: "text" },
    isPending: { control: "boolean" },
    backToMain: { control: "boolean" },
  },
} as Meta;

const Template: StoryFn<IProps> = (args) => {
  const [open, setOpen] = useState(true); // Control dialog visibility

  return (
    <InfoDialog {...args} setOpen={setOpen}>
      <div className="flex justify-center items-center h-[200px]">
        لیست تگ ها:{" "}
      </div>
    </InfoDialog>
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  dialogHeader: "لیست تگ ها",
};
