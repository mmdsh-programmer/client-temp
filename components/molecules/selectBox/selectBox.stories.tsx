import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SelectBox from ".";

const meta: Meta<typeof SelectBox> = {
  title: "Components/Molecules/SelectBox",
  component: SelectBox,
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: "object",
      description: "List of options for the select box",
    },
    selectedOptions: {
      control: "object",
      description: "List of currently selected options",
    },
    setSelectedOptions: {
      action: "optionSelected",
      description: "Callback to update selected options",
    },
    defaultOption: {
      control: "text",
      description: "Default text when no options are selected",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
  decorators: [
    (Story) => {
      return (
        <div className="flex w-full items-center justify-center !font-iranYekan">
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

type SelectBoxProps = React.ComponentProps<typeof SelectBox>;

const Template: StoryObj<SelectBoxProps> = {
  render: (args) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    return (
      <SelectBox
        {...args}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    );
  },
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
    defaultOption: "Select an option...",
  },
};

export const Default = Template;
