import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ChipMolecule from ".";
import { FolderIcon } from "@components/atoms/icons";

const meta: Meta<typeof ChipMolecule> = {
  title: "components/Molecules/ChipMolecule",
  component: ChipMolecule,
  parameters: {
    backgrounds: {
      default: "light",
    },
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ChipMolecule>;

export const Default: Story = {
  render: (args) => {
    return <ChipMolecule {...args} />;
  },
};

Default.args = {
  value: "Default Chip",
  className: "bg-gray-100 px-4 py-1",
};

export const WithIcon: Story = {
  render: (args) => {
    return <ChipMolecule {...args} />;
  },
};

WithIcon.args = {
  value: "Chip with Icon",
  className: "bg-blue-100 px-4 py-1",
  icon: <FolderIcon className="h-4 w-4 mr-2 fill-icon-active" />,
};
