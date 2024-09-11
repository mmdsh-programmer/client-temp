import React, { useState } from "react";
import SelectAtom from ".";
import type { Meta, StoryObj } from "@storybook/react";

interface IProps {
  options: { value: string; label: string }[];
  selectedOption?: string;
  setSelectedOption: (option: string) => void;
  defaultOption?: string;
  className?: string;
}

const meta: Meta<IProps> = {
  title: "Components/Molecules/SelectAtom",
  component: SelectAtom,
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: "object",
      description: "List of options for the select box",
    },
    selectedOption: {
      control: "text",
      description: "Currently selected option",
    },
    setSelectedOption: {
      action: "optionSelected",
      description: "Callback to update selected option",
    },
    defaultOption: {
      control: "text",
      description: "Default text when no option is selected",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;

type Story = StoryObj<IProps>;

export const Default: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
    defaultOption: "Select an option...",
  },
  render: (args) => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>(
      undefined,
    );
    return (
      <SelectAtom
        {...args}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    );
  },
};
