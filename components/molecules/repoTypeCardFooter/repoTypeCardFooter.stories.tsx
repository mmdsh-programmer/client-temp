import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RepoTypeCardFooter from ".";
import { QuestionIcon } from "@components/atoms/icons";

export default {
  title: "Components/Molecules/RepoTypeCardFooter",
  component: RepoTypeCardFooter,
  argTypes: {
    repoNumber: { control: { type: "number" }, defaultValue: 3 },
    tooltipContent: {
      control: { type: "text" },
      defaultValue: "Tooltip content goes here",
    },
    icon: { control: { type: "object" } },
  },
  decorators: [
    (Story) => (
      <div className="flex w-full items-center !justify-center !font-iranYekan">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof RepoTypeCardFooter>;

export const Default: StoryObj<typeof RepoTypeCardFooter> = {
  args: {
    repoNumber: 3,
    tooltipContent: "tooltip ",
    icon: <QuestionIcon />,
  },
};

export const NoRepositories: StoryObj<typeof RepoTypeCardFooter> = {
  args: {
    repoNumber: 0,
    tooltipContent: "0",
    icon: <QuestionIcon />,
  },
};
