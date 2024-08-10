import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RepoCardBody from ".";
import { FolderIcon } from "@components/atoms/icons";
import CategoryMenuStory from "../categoryMenu/categoryMenuStory";
import { RecoilRoot } from "recoil";

export default {
  title: "Components/Molecules/RepoCardBody",
  component: RepoCardBody,

  decorators: [
    (Story) => (
      <RecoilRoot>
        <div className="flex w-full items-center justify-center !font-iranYekan">
          <Story />
        </div>
      </RecoilRoot>
    ),
  ],
} as Meta<typeof RepoCardBody>;

const Template: StoryFn<typeof RepoCardBody> = (args) => (
  <div className="flex flex-col">
    <RepoCardBody {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  icon: <FolderIcon className="w-8 h-8 fill-icon-hover" />,
  title: "Repository Title",
  children: <CategoryMenuStory />,
};
