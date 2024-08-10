import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import DrawerComponent, { IProps } from "."; // Adjust the import path accordingly
import { FolderIcon, SettingIcon, UserIcon } from "@components/atoms/icons";

export default {
  title: "Components/Templates/DrawerComponent", // The folder structure in Storybook
  component: DrawerComponent,
  argTypes: {
    openDrawer: { control: "boolean" },
  },
} as Meta;

const Template: StoryFn<IProps> = (args) => {
  const [openDrawer, setOpenDrawer] = useState<boolean | null>(args.openDrawer);

  return (
    <DrawerComponent
      {...args}
      openDrawer={openDrawer}
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
      onClick: () => alert("Home clicked"),
    },
    {
      text: "پروفایل",
      icon: <UserIcon className="h-5 w-5 fill-icon-hover"  />, // Example icon
      onClick: () => alert("Profile clicked"),
    },
    {
      text: "تنظیمات",
      icon: <SettingIcon className="h-5 w-5 stroke-icon-hover"  />,
      onClick: () => alert("Settings clicked"),
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
      onClick: () => alert("Home clicked"),
    },
    {
      text: "ویرایش تگ",
      onClick: () => alert("Profile clicked"),
    },
    {
      text: "ساخت تگ",
      onClick: () => alert("Settings clicked"),
    },
  ],
};

