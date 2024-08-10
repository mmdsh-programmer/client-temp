import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import MenuComponent from ".";

const meta: Meta<typeof MenuComponent> = {
  title: "Components/Molecules/MenuComponent",
  component: MenuComponent,
  argTypes: {
    variant: {
      control: { type: 'radio', options: ['small', 'medium', 'large'] },
    },
    menuList: { 
      control: 'object',
    },
    menuClick: { action: 'menuClick' },
  },
};

export default meta;

const Template: StoryObj<typeof MenuComponent> = {
  render: (args) => <MenuComponent {...args} />,
};

export const SmallVariant: StoryObj<typeof MenuComponent> = {
  ...Template,
  args: {
    variant: "small",
    children: <button>عملیات</button>,
    menuList: [
      {
        text: "جستجو",
        icon: <span>🔍</span>,
        onClick: () => alert("Small Item 1 clicked"),
      },
      {
        text: "تنظیمات",
        icon: <span>⚙️</span>,
        onClick: () => alert("Small Item 2 clicked"),
      },
    ],
  },
};

export const MediumVariant: StoryObj<typeof MenuComponent> = {
  ...Template,
  args: {
    variant: "medium",
    children: <button>عملیات</button>,
    menuList: [
      {
        text: "جستجو",
        icon: <span>🔍</span>,
        onClick: () => alert("Medium Item 1 clicked"),
      },
      {
        text: "تنطیمات",
        icon: <span>⚙️</span>,
        onClick: () => alert("Medium Item 2 clicked"),
      },
    ],
  },
};

export const LargeVariant: StoryObj<typeof MenuComponent> = {
  ...Template,
  args: {
    variant: "large",
    children: <button>عملیات</button>,
    menuList: [
      {
        text: "جستجو",
        icon: <span>🔍</span>,
        onClick: () => alert("Large Item 1 clicked"),
      },
      {
        text: "تنطیمات",
        icon: <span>⚙️</span>,
        onClick: () => alert("Large Item 2 clicked"),
      },
    ],
  },
};
