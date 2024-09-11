import HeaderListTemplate, { IProps } from ".";
import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import { RecoilRoot } from "recoil";

const ListMode = () => <div>List Mode</div>;

export default {
  title: "Components/Templates/HeaderListTemplate",
  component: HeaderListTemplate,
  argTypes: {
    header: { control: "text" },
    buttonText: { control: "text" },
    renderList: { control: "boolean" },
  },

  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
} as Meta;

const Template: StoryFn<IProps> = (args) => <HeaderListTemplate {...args} />;

export const Default = Template.bind({});
Default.args = {
  header: "لیست مخزن ها",
  buttonText: "ایجاد مخزن جدید",
  renderList: () => <ListMode />,
};

export const WithoutListMode = Template.bind({});
WithoutListMode.args = {
  ...Default.args,
  renderList: undefined,
};
