import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import TableHead from ".";

type TableHeadProps = React.ComponentProps<typeof TableHead>;

const meta: Meta<TableHeadProps> = {
  title: "Components/Molecules/TableHead",
  component: TableHead,
  argTypes: {
    tableHead: {
      control: {
        type: "object",
      },
      description:
        "Array of table head objects containing key, value, and optional sort indicators",
    },
    className: {
      control: {
        type: "text",
      },
      description: "Additional CSS classes for the TableHead component",
    },
  },
};

export default meta;

type Story = StoryObj<TableHeadProps>;

export const Default: Story = {
  args: {
    tableHead: [
      { key: "name", value: "Name", isSorted: false, className: "" },
      { key: "date", value: "Date", isSorted: true, className: "" },
      { key: "status", value: "Status", isSorted: false, className: "" },
    ],
  },
};

export const CustomClass: Story = {
  args: {
    tableHead: [
      {
        key: "name",
        value: "Name",
        isSorted: false,
        className: "text-blue-500",
      },
      { key: "date", value: "Date", isSorted: true, className: "text-red-500" },
      {
        key: "status",
        value: "Status",
        isSorted: false,
        className: "text-green-500",
      },
    ],
    className: "my-custom-class",
  },
};
