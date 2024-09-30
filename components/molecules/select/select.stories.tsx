import type {
 Meta,
 StoryObj
} from "@storybook/react";
import React, { useState } from "react";
import SelectAtom, { IOption } from ".";

interface IProps {
  options: IOption[];
  selectedOption?: IOption;
  setSelectedOption: (option: IOption) => void;
  defaultOption?: IOption;
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
      {
        value: "option1",
        label: "Option 1",
      },
      {
        value: "option2",
        label: "Option 2",
      },
      {
        value: "option3",
        label: "Option 3",
      },
    ],
    defaultOption: {
      value: "option1",
      label: "Option 1",
    },
  },
  render: (args) => {
    const [selectedOption, setSelectedOption] = useState<IOption | undefined>(
      undefined
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
