import {
 Meta, StoryObj 
} from "@storybook/react/*";

import React from "react";
import TableCell from ".";

const meta: Meta<typeof TableCell> = {
  title: "Components/Molecules/TableCell",
  component: TableCell,
  tags: ["autodocs"],
  argTypes: {
    tableCell: {
      control: { type: "object" },
      description: "Array of table cell data and properties",
    },
    navigateTo: {
      control: { type: "text" },
      description: "Optional route to navigate to on row click",
    },
    onClick: {
      action: "clicked",
      description: "Function to execute on row click",
    },
  },
  parameters: {nextjs: {appDirectory: true,},},
};

export default meta;

type TableCellProps = React.ComponentProps<typeof TableCell>;

export const Default: StoryObj<TableCellProps> = {args: {tableCell: [
      {
 data: "Cell 1", title: "Title 1" 
},
      {
 data: "Cell 2", title: "Title 2", className: "text-red-500" 
},
    ],},};

export const WithNavigation: StoryObj<TableCellProps> = {args: {
    tableCell: [
      {
 data: "Cell 1", title: "Title 1" 
},
      {
 data: "Cell 2", title: "Title 2" 
},
    ],
    navigateTo: "/repo?45781",
  },};

export const WithClickHandler: StoryObj<TableCellProps> = {args: {
    tableCell: [
      {
 data: "Cell 1", title: "Title 1" 
},
      {
 data: "Cell 2", title: "Title 2" 
},
    ],
    onClick: () => 
{return console.log("Row clicked");},
  },};
