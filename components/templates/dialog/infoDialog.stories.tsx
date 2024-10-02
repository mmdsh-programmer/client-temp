import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react";
import InfoDialog, { IProps } from "./infoDialog";

export default {
  title: "Components/Templates/InfoDialog",
  component: InfoDialog,
  argTypes: {
    dialogHeader: { control: "text" },
    isPending: { control: "boolean" },
    backToMain: { control: "boolean" },
  },
} as Meta;

const Template: StoryFn<IProps> = (args) => {
  const [, setOpen] = useState(true);

  return (
    <InfoDialog {...args} setOpen={setOpen}>
      <div className="flex justify-center items-center h-[200px]">
        لیست تگ ها:{" "}
      </div>
    </InfoDialog>
  );
};

export const Default = Template.bind({});
Default.args = {
  dialogHeader: "لیست تگ ها",
};
