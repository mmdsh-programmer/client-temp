import DrawerComponent, { IProps } from "."; // Adjust the import path accordingly
import {
 FolderIcon,
 SettingIcon,
 UserIcon
} from "@components/atoms/icons";
import {
 Meta,
 StoryFn
} from "@storybook/react/*";
import React, { useState } from "react";

export default {
  title: "Components/Templates/DrawerComponent", // The folder structure in Storybook
  component: DrawerComponent,
  argTypes: {openDrawer: { control: "boolean" },},
} as Meta;
const Template: StoryFn<IProps> = (args) => {
  const { openDrawer } = args;
  const [open, setOpenDrawer] = useState<boolean | null>(openDrawer);

  return (
    <DrawerComponent
      {...args}
      openDrawer={open}
      setOpenDrawer={setOpenDrawer}
    />
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  openDrawer: true,
  menuList: [
    {
      text: "داشبورد",
      icon: <FolderIcon className="h-5 w-5 fill-icon-hover" />, // Example icon
      onClick: () => 
{return alert("Home clicked");},
    },
    {
      text: "پروفایل",
      icon: <UserIcon className="h-5 w-5 fill-icon-hover" />, // Example icon
      onClick: () => 
{return alert("Profile clicked");},
    },
    {
      text: "تنظیمات",
      icon: <SettingIcon className="h-5 w-5 stroke-icon-hover" />,
      onClick: () => 
{return alert("Settings clicked");},
    },
  ],
};

// Story with no icons
export const WithoutIcons = Template.bind({});
WithoutIcons.args = {
  openDrawer: true,
  menuList: [
    {
      text: "حذف تگ",
      onClick: () => 
{return alert("Home clicked");},
    },
    {
      text: "ویرایش تگ",
      onClick: () => 
{return alert("Profile clicked");},
    },
    {
      text: "ساخت تگ",
      onClick: () => 
{return alert("Settings clicked");},
    },
  ],
};
