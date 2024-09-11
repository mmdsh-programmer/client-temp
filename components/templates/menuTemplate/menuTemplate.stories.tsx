import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import MenuTemplate, { IProps } from ".";

// Mock components for storybook, as the actual components may rely on specific contexts or states
const DesktopMenu = ({ menuList, icon, className }: any) => (
  <div className={`desktop-menu ${className}`}>
    <div>{icon}</div>
    <ul>
      {menuList.map((menuItem: any, index: number) => (
        <li key={index} onClick={menuItem.onClick}>
          {menuItem.icon} {menuItem.text}
        </li>
      ))}
    </ul>
  </div>
);

const MobileMenu = ({ setOpenDrawer, icon, className }: any) => (
  <button onClick={setOpenDrawer} className={`mobile-menu ${className}`}>
    {icon} Open Drawer
  </button>
);

export default {
  title: "Components/Templates/MenuTemplate",
  component: MenuTemplate,
  argTypes: {
    setOpenDrawer: { action: "open drawer" },
    icon: { control: "text" },
    className: { control: "text" },
    menuList: { control: "object" },
  },
} as Meta;

const Template: StoryFn<IProps> = (args) => <MenuTemplate {...args} />;

export const Default = Template.bind({});
Default.args = {
  menuList: [
    { text: "Home", onClick: () => alert("Home Clicked") },
    { text: "Profile", onClick: () => alert("Profile Clicked") },
    { text: "Settings", onClick: () => alert("Settings Clicked") },
  ],
  icon: "🔍",
  className: "",
  setOpenDrawer: () => console.log("Drawer opened"),
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  ...Default.args,
  className: "custom-class",
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  ...Default.args,
  menuList: [
    {
      text: "Home",
      icon: <span>🏠</span>,
      onClick: () => alert("Home Clicked"),
    },
    {
      text: "Profile",
      icon: <span>👤</span>,
      onClick: () => alert("Profile Clicked"),
    },
    {
      text: "Settings",
      icon: <span>⚙️</span>,
      onClick: () => alert("Settings Clicked"),
    },
  ],
  icon: "🛠️",
};
