import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import MobileCard from ".";
import { MoreDotIcon, RepoIcon } from "@components/atoms/icons";

const meta: Meta<typeof MobileCard> = {
  title: "Components/Molecules/MobileCard",
  component: MobileCard,
  argTypes: {
    name: { control: "text" },
    createDate: { control: "text" },
    creator: { control: "text" },
    cardAction: { control: "object" },
    icon: { control: "text" },
  },
};

export default meta;

const Template: StoryObj<typeof MobileCard> = {
  render: (args) => {
    return <MobileCard {...args} />;
  },
};

export const Basic: StoryObj<typeof MobileCard> = {
  ...Template,
  args: {
    name: "Sample Card",
    createDate: "2024-08-05",
    creator: "aaaa bbbb",
    cardAction: (
      <button className=" px-2 py-1 rounded">
        <MoreDotIcon className="h-4 w-4" />
      </button>
    ),
    icon: <RepoIcon className="h-10 w-10" />,
  },
};

export const WithoutDetails: StoryObj<typeof MobileCard> = {
  ...Template,
  args: {
    name: "Another Card",
    cardAction: (
      <button className=" text-white px-2 py-1 rounded">
        {" "}
        <MoreDotIcon className="h-4 w-4" />
      </button>
    ),
    icon: "🚀",
  },
};

export const WithOnlyIcon: StoryObj<typeof MobileCard> = {
  ...Template,
  args: {
    name: "Card with Icon",
    icon: "🔔",
  },
};
