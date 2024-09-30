import MenuTemplate, { IProps } from ".";
import {
 Meta,
 StoryFn
} from "@storybook/react/*";

import React from "react";

// Mock components for storybook, as the actual components may rely on specific contexts or states
type MenuItem = {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export const DesktopMenu = ({
 menuList, icon, className 
}: {
  menuList: MenuItem[], icon: string, className: string
}) => {
  return (
    <div className={`desktop-menu ${className}`}>
      <div>{icon}</div>
      <ul>
        {menuList.map((menuItem: MenuItem) => {
          return (
            <li key={menuItem.text} onClick={menuItem.onClick}>
              {menuItem.icon} {menuItem.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const MobileMenu = ({
 setOpenDrawer, icon, className 
}: {
  setOpenDrawer: () => void;
  icon: string;
  className: string;
}) => {
  return (
    <button onClick={setOpenDrawer} className={`mobile-menu ${className}`}>
      {icon} Open Drawer
    </button>
  );
};

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

const Template: StoryFn<IProps> = (args) => {
  return <MenuTemplate {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  menuList: [
    {
      text: "Home",
      onClick: () => {
        return alert("Home Clicked");
      },
    },
    {
      text: "Profile",
      onClick: () => {
        return alert("Profile Clicked");
      },
    },
    {
      text: "Settings",
      onClick: () => {
        return alert("Settings Clicked");
      },
    },
  ],
  icon: "🔍",
  className: "",
  setOpenDrawer: () => {
    return console.log("Drawer opened");
  },
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
      onClick: () => {
        return alert("Home Clicked");
      },
    },
    {
      text: "Profile",
      icon: <span>👤</span>,
      onClick: () => {
        return alert("Profile Clicked");
      },
    },
    {
      text: "Settings",
      icon: <span>⚙️</span>,
      onClick: () => {
        return alert("Settings Clicked");
      },
    },
  ],
  icon: "🛠️",
};
